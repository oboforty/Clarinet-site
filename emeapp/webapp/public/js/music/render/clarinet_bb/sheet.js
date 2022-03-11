

function render_song(ctx, R, notes, song) {
    ctx.font = (RAD*1.5)+"px Arial";

    // @TODO: @TEMPORAL: strip '-'
    notes = notes.filter(f=>f!='-'&&!f.includes('-'));

    // calc key & mark out-of-key notes
  

    // calc pagination

    // calc tempo -> animation speed

    ranimate((t, dt, telapsed)=>{

      draw(ctx, R, notes);
    });
}




function draw(ctx, R, _notes) {
  ctx.clearRect(0,0,width,height);

  // draw each note
  let ioff = 0;
  for(let [i, note] of enumerate(_notes)) {
    let x = 3.0 * R + (i-ioff) * 6*R;
    let y = 0.75 * R;

    // fingering
    try {
      y = draw_clarinet_fingering(x,y,R, note);
    } catch(e) {
      // lower register below E3 not found on clarinet
      ioff++;
      continue;
    }

    // note
    draw_note(x, y, 4.5*R, 3*R, note, true);
  }
}
