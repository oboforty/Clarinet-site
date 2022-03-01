
function draw_circ(x,y,r,fill) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
  
    if (fill) ctx.fill();
    else ctx.stroke();
}
  
function draw_drop(x,y,w,h,fill) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y+h, w, 0, Math.PI);
    ctx.lineTo(x, y);
  
    if (fill) ctx.fill();
    else ctx.stroke();
}
  
function draw_drop_left(x,y,w,h,fill) {
    ctx.beginPath();
    ctx.moveTo(x+w, y);
    ctx.arc(x, y, h, Math.PI*0.5, Math.PI*1.5);
    ctx.lineTo(x+w, y);
  
    if (fill) ctx.fill();
    else ctx.stroke();
}

// offset compared to base E
const clarinet_fingering = {
    "E3":   [".XXX|XXX", "⡀"],
    "F3":   [".XXX|XXX", "⢀"],
    "F#3":  [".XXX|XXX", "⠁"],
    "G3":   [".XXX|XXX", ""],
    "G#3":  [".XXX|XXX", "⠈"],
    "A3":   [".XXX|XXO", ""],
    "A#3":  [".XXX|XOO", ""],
    "B3":   [".XXX|OXO", ""],
    // ------------------------
    "C4":   [".XXX|OOO", ""],
    "C#4":  [" OOO|OOO", ""],
    "D4":   [".XXO|OOO", ""],
    "D#4":  [" OOO|OOO", ""],
    "E4":   [".XOO|OOO", ""],
    "F4":   [".OOO|OOO", ""],
    "F#4":  [" XOO|OOO", ""],
    "G4":   [" OOO|OOO", ""],
    "G#4":  [" OOO|OOO", ""],
    "A4":   [" OOO|OOO", "A"],
    "A#4":  [" OOO|OOO", ""],
    "B4":   ["!XXX|XXX", "⡀"],
    // ------------------------
    "C5":   ["!XXX|XXX", "⢀"],
    "C#5":  [" OOO|OOO", ""],
    "D5":   ["!XXX|XXX", ""],
    "D#5":  [" OOO|OOO", ""],
    "E5":   ["!XXX|XXO", ""],
    "F5":   ["!XXX|XOO", ""],
    "F#5":  ["!XXX|OXO", ""],
    "G5":   ["!XXX|OOO", ""],
    "G#5":  [" OOO|OOO", ""],
    "A5":   ["!XXO|OOO", ""],
    "A#5":  [" OOO|OOO", ""],
    "B5":   ["!XOO|OOO", ""],
    // ------------------------
    "C6":   ["!OOO|OOO", ""],
    // @TODO: banana keys
};
    
function draw_clarinet_fingering(x,y,R, note) {
    if (!clarinet_fingering[note]) {
        throw new Exception("Note not found: " + note);
        return 0;
    }

    const [fingering, mod] = clarinet_fingering[note];
    const mark = fingering[0];

    // Register keys (back)  
    draw_drop(x-2*R, y+R, R*0.3, R*1.2, mark =='!' || mark == "'");
    draw_circ(x-2*R, y+R + 2.12*R, R*0.3, mark =='!' || mark=='.');

    y += 1.25 * R;

    // A key
    draw_drop(x, y-1.25*R, R*0.5, R, mod.includes('A'));

    y += 1.7 * R;

    // 1,2,3
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+1] == 'X');

        y += 2.5*R;
    }

    y-= 0.75*R;

    // middle line
    ctx.beginPath();
    ctx.moveTo(x - 0.75*R, y);
    ctx.lineTo(x + 0.75*R, y);
    ctx.stroke();

    y += 1.75*R;

    // 1,2,3
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+5] == 'X');

        y += 2.5*R;
    }

    // bridge keys / keys
    draw_drop_left(x-2*R, y-0.8*R, R*0.52, R*0.28, mod.includes("⠁"));
    draw_drop_left(x-2*R, y, R*0.52, R*0.28, mod.includes("⡀"));
    draw_drop_left(x-1.5*R, y-0.9*R, R*0.52, R*0.28, mod.includes("⠈"));
    draw_drop_left(x-1.5*R, y-0.1*R, R*0.52, R*0.28, mod.includes("⢀"));


    // banana keys
    y+= 22;

    return y;
}