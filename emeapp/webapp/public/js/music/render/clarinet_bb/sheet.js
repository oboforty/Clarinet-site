
const ropts = {
    render_note_text: false,
    lines_per_page: 2,
    notes_per_line: 8,
    bpm: 200,

    note_time: 0.25, // how much time of bpm interval is spent on playing the note (vs silence)

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

  stop() {
    this.set_page(0)
    note_player.stop_all();
  },

  set_page(p) {
    this.is_playing = false;
    this.time_next_note = 1;
    this.i_note = p * ropts.notes_per_page;
    this.i_line = 0;
    this.i_page = p;
    this.on_notes = [];

    // render once
    animate(0, ropts.note_interval*2, 0);

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

        player_ctx.i_page++;

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

    // @TODO: @TEMPORAL: strip '-'
    player_ctx.notes = _notes//.filter(f=>f!='-'&&!f.includes('-'));
    player_ctx.bpm = song.tempo;
    player_ctx.scale = new Set(fetch_complete_scale(song.skey));
    player_ctx.on_note_func = cb;

    player_ctx.stop();

    note_player.load_notes(new Set(player_ctx.notes));
}

function draw_line(ctx, R, _lines, current_note, current_line) {
  ctx.clearRect(0,0,width,height);

  const x_start = 3.0 * R;
  const x_end = width - 3.0 * R;
  const h_note = 3*R;
  const R_clarinet = 0.7 * R;
  const h_clari = get_clarinet_height(R_clarinet);

  let y_clari = 0.75 * R;
  let y_line = h_clari;
  let ioff = 0; // erroreous renders

  for(let [l, _notes] of enumerate(_lines)) {
      // draw note music sheet bg
      ctx.fillStyle = ctx.fillStyle = ropts.col;
      draw_note_lines(ctx, x_start-1.5*R, x_end+1.5*R, y_line, h_note);

      // draw each note
      for(let [i, note] of enumerate(_notes)) {
        let x = x_start + (i-ioff) * 6*R;
        let y = y_line + 0.75 * R;
        const highlight = player_ctx.is_playing && i == current_note && l == current_line;
        const out_of_key = !player_ctx.scale.has(note);
        
        const color = highlight 
          ? (out_of_key
              ? ropts.theme.fill_out_active
              : ropts.theme.fill_active
            )
          : (out_of_key 
              ? ropts.theme.fill_out
              : ropts.theme.fill
            );
        ctx.fillStyle = color;
        ctx.strokeStyle = ropts.theme.stroke;

        // fingering
        if (note != '-') {
          try {
            draw_clarinet_fingering(x, y_clari, R_clarinet, note);
          } catch(e) {
            // lower register below E3 not found on clarinet
            ioff++;
            continue;
          }
        }

        // note
        //const w = 4.5*R;
        //const text_color = highlight && ropts.render_note_text ? (i == current_note ? "crimson" : "#4e4e4e") : null;
        draw_note(ctx, x, y_line, h_note, note, "red");
      }

      // next line
      y_line += h_note + h_clari + 20;
      y_clari += h_note + h_clari + 20;
  }
}

