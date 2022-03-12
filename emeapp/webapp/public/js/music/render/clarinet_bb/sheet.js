
const ropts = {
    render_note_text: false,
    lines_per_page: 2,
    notes_per_line: 8,
    bpm: 60,

    note_time: 0.25, // how much time of bpm interval is spent on playing the note (vs silence)

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

  on_play: ()=>{},

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
  },

  stop() {
    this.is_playing = false;
    this.time_next_note = 1;
    this.i_note = 0;
    this.i_line = 0;
    this.i_page = 0;
    this.on_notes = [];
  }
};

function animate(t, dt, telapsed) {
  // time interval between notes played
  player_ctx.time_next_note += dt;
  if (player_ctx.time_next_note > ropts.note_interval) {
    // increment line?
    if (player_ctx.i_note % ropts.notes_per_line == 0) {

      // page to next page
      if (player_ctx.i_note % ropts.notes_per_page == 0) {
        on_notes = [];

        for (let l of range(ropts.lines_per_page)) {
          const note_offset = player_ctx.i_page * ropts.notes_per_page + l * ropts.notes_per_line;

          on_notes.push(player_ctx.notes.slice(note_offset, note_offset + ropts.notes_per_line));
        }

        player_ctx.i_page++;
      }
    }

    player_ctx.time_next_note = 0;
    player_ctx.i_note++;
  }

  draw_line(ctx, R, on_notes, (player_ctx.i_note-1) % ropts.notes_per_page);

  return player_ctx.is_playing;
}


function render_song(ctx, R, _notes, song) {
    ctx.font = (RAD*1.5)+"px Arial";

    // @TODO: @TEMPORAL: strip '-'
    player_ctx.notes = _notes.filter(f=>f!='-'&&!f.includes('-'));

    // render song once
    player_ctx.is_playing = false;
    ranimate(animate);

    // setup player
    player_ctx.stop();
}

function draw_line(ctx, R, _lines, current_note) {
  ctx.clearRect(0,0,width,height);

  const x_start = 3.0 * R;
  const x_end = width - 3.0 * R;
  const y_clari = 0.75 * R;
  const y_note = y_clari;
  const h_note = 3*R;
  const R_clarinet = 0.6 * R;
  const h_clari = get_clarinet_height(R_clarinet);

  let y_line = 0;
  let ioff = 0; // erroreous renders

  for(let [l, _notes] of enumerate(_lines)) {
      // draw note music sheet bg
      draw_note_lines(ctx, x_start-1.5*R, x_end+1.5*R, y_line + h_clari, h_note);

      // draw each note
      for(let [i, note] of enumerate(_notes)) {
        let x = x_start + (i-ioff) * 6*R;
        let y = y_line + 0.75 * R;
        ctx.fillStyle = ctx.strokeStyle = i == current_note ? "red" : "black";

        // fingering
        try {
          draw_clarinet_fingering(x, y, R_clarinet, note);
        } catch(e) {
          // lower register below E3 not found on clarinet
          ioff++;
          continue;
        }

        // note
        //const w = 4.5*R;
        const text_color = ropts.render_note_text ? (i == current_note ? "crimson" : "#4e4e4e") : null;
        draw_note(ctx, x, y + h_clari, h_note, note, text_color);
      }

      // next line
      y_line += h_note + h_clari + 20;
  }
}

