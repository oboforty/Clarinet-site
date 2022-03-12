
let ropts = {
    render_note_text: false,
    lines_per_page: 2,
    notes_per_line: 8,
    bpm: 60,

    note_time: 0.25, // how much time of bpm interval is spent on playing the note (vs silence)

    get notes_per_page() {
        return this.lines_per_page * this.notes_per_line;
    }
};

function render_song(ctx, R, notes, song) {
    ctx.font = (RAD*1.5)+"px Arial";

    // @TODO: @TEMPORAL: strip '-'
    notes = notes.filter(f=>f!='-'&&!f.includes('-'));

    // calc key & mark out-of-key notes

    // calc pagination
    let i_page = 0, i_line = 0, i_note = 0, on_notes = [];

    // calc tempo -> animation speed
    let time_next_note = 0;
    const note_interval = (60*1000) / ropts.bpm;

    ranimate((t, dt, telapsed)=>{

      // time interval between notes played
      time_next_note += dt;
      if (time_next_note > note_interval) {
          // increment line?
          if (i_note % ropts.notes_per_line == 0) {

            // page to next page
            if (i_note % ropts.notes_per_page == 0) {
              on_notes = [];

              for (let l of range(ropts.lines_per_page)) {
                const note_offset = i_page * ropts.notes_per_page + l * ropts.notes_per_line;

                on_notes.push(notes.slice(note_offset, note_offset + ropts.notes_per_line));
              }

              i_page++;
            }
          }

          time_next_note = 0;
          i_note++;
      }

      // draw currently rendered pages
//      for (let l of range(ropts.lines_per_page)) {
//
//      }
      draw_line(ctx, R, on_notes, (i_note-1) % ropts.notes_per_page);
      //draw(ctx, R, notes);

      return true;
    });
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

