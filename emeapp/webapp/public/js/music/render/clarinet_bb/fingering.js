
function draw_circ(x,y,r,fill) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
  
    if (fill) ctx.fill();
    ctx.stroke();
}

function draw_drop(x,y,w,h,fill) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y+h, w, 0, Math.PI);
    ctx.lineTo(x, y);
  
    if (fill) ctx.fill();
    ctx.stroke();
}

function draw_drop_left(x,y,w,h,fill) {
    ctx.beginPath();
    ctx.moveTo(x+w, y);
    ctx.arc(x, y, h, Math.PI*0.5, Math.PI*1.5);
    ctx.lineTo(x+w, y);
 
    let exfill = ctx.fillStyle;
    if (!fill)
        ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = exfill;
}

function draw_abkey_drop(x,y,w,h,fill) {
    ctx.beginPath();
    ctx.moveTo(x-w, y+h/4);
    ctx.lineTo(x+w/2, y+h-w*3);
    ctx.arc(x, y+h, w, 0, Math.PI);
    ctx.lineTo(x-w/2, y+h-w*3);
    ctx.lineTo(x-w*1.6, y+h/4);
    ctx.closePath();

    if (fill) ctx.fill();
    ctx.stroke();
}

function draw_lower_banana(x,y,w,h, fill) {
    ctx.beginPath();

    ctx.moveTo(x-w/2, y-h/2);
    ctx.lineTo(x+w/2, y+h/2);
    //ctx.arc(x, y, w/2.5, 0, Math.PI);
    ctx.ellipse(x, y, w/2, h/2, 0.1*Math.PI, 0, Math.PI);

    // ctx.lineTo(x+w/2, y+h/2+h/10);
    // ctx.lineTo(x-w/2, y-h/2);
    ctx.closePath();

    if (fill) ctx.fill();
    ctx.stroke();

}

function draw_upper_banana(x,y,w,h, fill) {
    ctx.beginPath();

    ctx.moveTo(x+w/2, y-h/2);
    //ctx.lineTo(x-w/2, y+h/2);
    //ctx.arc(x, y, w/2.5, 0, Math.PI);
    ctx.ellipse(x, y, w/2, h/2, -0.1*Math.PI, 0, Math.PI);

    // ctx.lineTo(x+w/2, y+h/2+h/10);
    // ctx.lineTo(x-w/2, y-h/2);
    ctx.closePath();

    if (fill) ctx.fill();
    ctx.stroke();

}

function draw_c_bridge1(x,y,w,h,fill) {

}

function draw_c_bridge2(x,y,w,h,fill) {

}

function draw_c_bridge3(x,y,w,h,fill) {

}

function draw_c_bridge_topx(x,y,w,h,fill) {
    // 
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);

    if (fill) ctx.fill();
    ctx.stroke();
}

function draw_capsule(x,y,w,h,fill) {
    ctx.beginPath();
    //ctx.moveTo(x+w, y);
    ctx.arc(x-w/2, y, h, Math.PI*0.5, Math.PI*1.5);
    ctx.arc(x+w/2, y, h, Math.PI*1.5, Math.PI*0.5);
    ctx.closePath();

    if (fill) ctx.fill();
    ctx.stroke();
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
    "B3":   [".XXX|XOO", "LBAN"],
    // ------------------------
    "C4":   [".XXX|OOO", ""],
    "C#4":  [".XXX|OOO", "C#key"],
    "D4":   [".XXO|OOO", ""],
    "D#4":  [".XXO|OOO", "UBAN"],
    "E4":   [".XOO|OOO", ""],
    "F4":   [".OOO|OOO", ""],
    "F#4":  [" XOO|OOO", ""],
    "G4":   [" OOO|OOO", ""],
    "G#4":  [" OOO|OOO", "Abkey"],
    "A4":   [" OOO|OOO", "Akey"],
    "A#4":  ["'OOO|OOO", "Akey"],
    "B4":   ["!XXX|XXX", "⡀"],
    // ------------------------
    "C5":   ["!XXX|XXX", "⢀"],
    "C#5":  ["!XXX|XXX", "⠁"],
    "D5":   ["!XXX|XXX", ""],
    "D#5":  ["!XXX|XXX", "⠈"],
    "E5":   ["!XXX|XXO", ""],
    "F5":   ["!XXX|XOO", ""],
    "F#5":  ["!XXX|XOO", "LBAN"],
    "G5":   ["!XXX|OOO", ""],
    "G#5":  ["!XXX|OOO", "C#key"],
    "A5":   ["!XXO|OOO", ""],
    "A#5":  ["!XXO|OOO", "UBAN"],
    "B5":   ["!XOO|OOO", ""],
    // ------------------------
    "C6":   ["!OOO|OOO", ""],

    "C#6":   ["!OXX|XXO", ""],
    "D6":   ["!OXX|XOO", "⠈"],
    "D#6":   ["!OXX|XOO", "⠈LBAN"],
    "E6":   ["!OXX|OOO", "⠈"],
    "F6":   ["!OXX|OOO", "⠈C#key"],
    "F#6":   ["!OXO|OOO", "⠈"],

    // @todo: G6, G#6, A6, A#6, C7
};

function instrument_include(note) {
    return clarinet_fingering[note] != null;
}

function draw_clarinet_fingering(x,y,R, note) {
    if (!clarinet_fingering[note]) {
        throw new Exception("Note not found: " + note);
        return 0;
    }

    const [fingering, mod] = clarinet_fingering[note];
    const mark = fingering[0];

    if (mod == "@TODO") {
        ctx.fillText("? " + note + ' ?', x-3*R, y+5*R);
        return;
    }

    // Register keys (back)
    ctx.lineWidth = 0.5;
    draw_drop(x-2*R, y+R, R*0.3, R*1.2, mark =='!' || mark == "'");
    draw_circ(x-2*R, y+R + 2.12*R, R*0.3, mark =='!' || mark=='.');

    y += 1.25 * R;

    // A key
    ctx.lineWidth = 1;
    draw_drop(x, y-1.25*R, R*0.5, R, mod.includes('Akey'));

    //Ab key
    ctx.lineWidth = 0.5;
    draw_abkey_drop(x + 1.25*R, y-1.8*R, R*0.3, R*2.5, mod.includes('Abkey'));

    y += 1.7 * R;

    // 1,2,3
    ctx.lineWidth = 1;
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+1] == 'X');

        y += 2.5*R;
    }
    // draw upper banana
    ctx.lineWidth = 0.5;
    draw_upper_banana(x + 1*R, y - 4 * R, 1.2*R, 0.5*R, mod.includes("UBAN"));

    y-= 0.75 * R;

    // middle line
    ctx.beginPath();
    ctx.moveTo(x - 0.75*R, y);
    ctx.lineTo(x + 0.75*R, y);
    ctx.closePath();
    ctx.stroke();

    // draw 1,2,3,4 keys
    ctx.lineWidth = 0.5;
    draw_capsule(x - 1.6*R, y-0.6*R, 0.5*R, 0.2*R, mod.includes('1'));
    draw_capsule(x - 1.6*R, y, 0.5*R, 0.2*R, mod.includes('2'));
    draw_capsule(x - 1.6*R, y+0.6*R, 0.5*R, 0.2*R, mod.includes('3'));
    draw_capsule(x - 1.5*R, y+1.2*R, 0.8*R, 0.2*R, mod.includes('4'));

    y += 1 * R;

    // draw middle bridge keys
    draw_c_bridge_topx(x + 0.75*R, y - 0.25*R, 0.75*R, 0.3*R, mod.includes('C#key'));

    y += 1.5 * R;

    // lower 1,2,3
    ctx.lineWidth = 1;
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+5] == 'X');

        y += 2.5 * R;
    }

    // draw lower banana
    ctx.lineWidth = 0.5;
    draw_lower_banana(x - 1.2*R, y - 4 * R, 1.2*R, 0.5*R, mod.includes("LBAN"));

    // bridge keys / keys
    ctx.lineWidth = 0.5;
    draw_drop_left(x-1.2*R, y-R, R*0.8, R*0.4, mod.includes("⠁"));
    draw_drop_left(x-1.2*R, y, R*0.8, R*0.4, mod.includes("⡀"));
    draw_drop_left(x-0.2*R, y-R+0.2*R, R*0.8, R*0.4, mod.includes("⠈"));
    draw_drop_left(x-0.2*R, y+0.2*R, R*0.8, R*0.4, mod.includes("⢀"));

    // banana keys
    y+= 22;

    return y;
}

function get_clarinet_height(R) {
    //
    return Math.floor(20.45*R + 22);
}