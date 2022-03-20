

function render_scale(ctx, R, scale_name, octave) {
    ctx.font = (RAD*1.5)+"px Arial";

    let notes = fetch_scale(scale_name, [octave]);
    // @TODO: @TEMPORAL: strip '-'
    notes = notes.filter(f=>f!='-'&&!f.includes('-'));

    draw(ctx, R, notes);
}

function draw(ctx, R, _notes) {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw each note
  let ioff = 0;
  for(let [i, note] of enumerate(_notes)) {
    let x = 3.0 * R + (i-ioff) * 6*R;
    let y = 24 + 0.75 * R;

    // note
    draw_note(x, y, 4.5*R, 3*R, note, true);
  }
}
