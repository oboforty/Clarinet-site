
const ropts = {
    lines_per_page: 2,
    notes_per_line: 8,
    bpm: 200,

    note_time: 0.25, // how much time of bpm interval is spent on playing the note (vs silence)

    play_sound: true,
    play_metronome: false,
    show_instrument: true,
    show_notes: false,

    theme: {
      fill: "#718093",
      fill_active: "#c23616",
      fill_out: "#7f8fa6",
      fill_out_active: "#e84118",

      stroke: "#2f3640",
    },

    get notes_per_page() {
        return this.lines_per_page * this.notes_per_line;
    },

    get note_interval() {
      return (60*1000) / this.bpm;
    },

    override(_opts) {
        this.lines_per_page = _opts.lines_per_page || this.lines_per_page;
        this.notes_per_line = _opts.notes_per_line || this.notes_per_line;
        this.bpm = _opts.bpm || this.bpm;
        this.note_time = _opts.note_time || this.note_time;
        this.play_sound = _opts.play_sound || this.play_sound;
        this.play_metronome = _opts.play_metronome || this.play_metronome;
        this.show_instrument = _opts.show_instrument || this.show_instrument;
        this.show_notes = _opts.show_notes || this.show_notes;
        this.theme = _opts.theme || this.theme;

        this.resize();
    },

    resize() {
        canvas.width = 100 * this.notes_per_line;
        //canvas.height =
    }
};

const player_ctx = {
  is_playing: false,

  // cyclic timers for note > line > page > song
  time_next_note: 0,
  i_note: 0,
  i_line: 0,
  i_page: 0,

  // notes on current page being rendered:
  on_notes: [],
  // all notes on song:
  notes: [],
  scale: [],

  on_play: ()=>{},
  on_note_func: ()=>{},

  get total_pages() {
    return Math.ceil(len(this.notes) / ropts.notes_per_page);
  },

  get current_note() {
    let note = this.notes[this.i_note];

    if (!note || note == '-')
        return null;
    return note;
  },

  start() {
    if (!this.is_playing) {
      this.is_playing = true;
      this.on_play();

      ranimate(animate);
    }

    return this.is_playing;
  },

  pause() {
    this.is_playing = false;
    this.time_next_note = 1;
    note_player.stop_all();
  },

  reset() {
    this.is_playing = false;
    this.time_next_note = 1;
    this.set_page(this.i_page-1);
    note_player.stop_all();
  },

  stop() {
    this.set_page(0);
    note_player.stop_all();
  },

  set_page(p) {
    if (p<0) p = 0;

    this.is_playing = false;
    this.time_next_note = 1;
    this.i_note = p * ropts.notes_per_page;
    this.i_line = 0;
    this.i_page = p;
    this.on_notes = [];

    // render once
    this.invalidate_canvas();
  },

  invalidate_canvas() {
    animate(0, ropts.note_interval*2, 0);

    const p = this.i_page;
    this.i_note = p * ropts.notes_per_page;
    this.i_line = 0;
    this.i_page = p;
  }
};

const note_player = new NotePlayer("clarinet_bb");

function animate(t, dt, telapsed) {
  // time interval between notes played
  player_ctx.time_next_note += dt;
  if (player_ctx.time_next_note > ropts.note_interval) {

    // increment line?
    if (player_ctx.i_note % ropts.notes_per_line == 0) {

      // page to next page
      if (player_ctx.i_note % ropts.notes_per_page == 0) {
        player_ctx.on_notes = [];

        for (let l of range(ropts.lines_per_page)) {
          const note_offset = player_ctx.i_page * ropts.notes_per_page + l * ropts.notes_per_line;

          player_ctx.on_notes.push(player_ctx.notes.slice(note_offset, note_offset + ropts.notes_per_line));
        }

        //player_ctx.i_page++;

        player_ctx.on_note_func();
      }
    }

    // play note
    if (player_ctx.is_playing) {
        const cnote_ = player_ctx.current_note;
        if (cnote_) {
            note_player.stop_current();
            note_player.play(cnote_);
        }
    }

    player_ctx.time_next_note = 0;
    player_ctx.i_note++;
  }

  const note_mod = (player_ctx.i_note-1) % ropts.notes_per_line;
  const line_mod = Math.floor((player_ctx.i_note-1) / ropts.notes_per_line) % ropts.lines_per_page;

  draw_line(ctx, ropts.R, player_ctx.on_notes, note_mod, line_mod);

  return player_ctx.is_playing;
}

function render_song(ctx, R, _notes, song, cb) {
    ctx.font = (RAD*1.5)+"px Arial";

    ropts.R = R;
    ropts.bpm = song.tempo;

    player_ctx.notes = _notes//.filter(f=>f!='-'&&!f.includes('-'));
    player_ctx.scale = new Set(fetch_complete_scale(song.skey));
    player_ctx.on_note_func = cb;
    player_ctx.stop();

    const notes_load = new Set(player_ctx.notes);
    notes_load.delete('-');

    note_player.load_notes(notes_load);
}
