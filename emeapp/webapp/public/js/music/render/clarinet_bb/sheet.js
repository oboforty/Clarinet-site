

function draw_line(ctx, R, _lines, current_note, current_line) {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,width,height);

  const x_start = 3.0 * R;
  const x_end = canvas.width - 3.0 * R;
  const h_note = 3*R;
  const R_clarinet = 0.7 * R;
  const h_clari = ropts.show_instrument ? get_clarinet_height(R_clarinet) : 0;

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
        if (note != '-' && ropts.show_instrument) {
          try {
            draw_clarinet_fingering(x, y_clari, R_clarinet, note);
          } catch(e) {
            // lower register below E3 not found on clarinet
            ioff++;
            continue;
          }
        }

        // note
        draw_note(ctx, x, y_line, h_note, note, ropts.show_notes);
      }

      // next line
      y_line += h_note + h_clari + 20;
      y_clari += h_note + h_clari + 20;
  }
}

