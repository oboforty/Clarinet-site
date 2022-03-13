
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

function draw_capsule(x,y,w,h,fill) {
    ctx.beginPath();
    //ctx.moveTo(x+w, y);
    ctx.arc(x-w/2, y, h, Math.PI*0.5, Math.PI*1.5);
    ctx.arc(x+w/2, y, h, Math.PI*1.5, Math.PI*0.5);
    ctx.closePath();

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
    "C#4":  [" OOO|OOO", "@TODO"], // @TODO: 4 oldal keys / special 1st
    "D4":   [".XXO|OOO", ""],
    "D#4":  [".XXO|OOO", "4"],
    "E4":   [".XOO|OOO", ""],
    "F4":   [".OOO|OOO", ""],
    "F#4":  [" XOO|OOO", ""],
    "G4":   [" OOO|OOO", ""],
    "G#4":  [" OOO|OOO", "@TODO"], // @TODO: felso oldalso reg key
    "A4":   [" OOO|OOO", "A"],
    "A#4":  ["'OOO|OOO", "A"],
    "B4":   ["!XXX|XXX", "⡀"],
    // ------------------------
    "C5":   ["!XXX|XXX", "⢀"],
    "C#5":  ["!XXX|XXX", "⠁"],
    "D5":   ["!XXX|XXX", ""],
    "D#5":  ["!XXX|XXX", "⠈"],
    "E5":   ["!XXX|XXO", ""],
    "F5":   ["!XXX|XOO", ""],
    "F#5":  ["!XXX|OXO", ""],
    "G5":   ["!XXX|OOO", ""],
    "G#5":  [" OOO|OOO", "@TODO"], // @TODO: 4 oldal keys / special 1st
    "A5":   ["!XXO|OOO", ""],
    "A#5":  ["!XXO|OOO", "4"],
    "B5":   ["!XOO|OOO", ""],
    // ------------------------
    "C6":   ["!OOO|OOO", ""],
    "C#6":   ["!OXX|XXO", ""],
    "D6":   ["!OXX|XOO", "⠈"],
    "D#6":   [" OOO|OOO", "@TODO"], // @TODO: also banana key
    "E6":   ["!OXX|OOO", "⠈"],
    "F6":   [" OOO|OOO", "@TODO"], // @TODO: 4 oldal keys / special 1st
    "F#6":   ["!OXO|OOO", "⠈"],
    "G6":   ["!OXO|XXO", "⠈"],
    "G#6":   [" OOO|OOO", "@TODO"], // @TODO: also banana key
    "A6":   [" OOO|OOO", "@TODO"], // @TODO: 4 oldal keys / 4th (long)
    "A#6":   [" OOO|OOO", "@TODO"], // @TODO: wtf??
    "B6":   [" OOO|OOO", "@TODO"], // @TODO: wtf??
    // ------------------------
    "C7":   [" OOO|OOO", "@TODO"], // @TODO: wtf??
};


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
    draw_drop(x, y-1.25*R, R*0.5, R, mod.includes('A'));

    y += 1.7 * R;

    // 1,2,3
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+1] == 'X');

        y += 2.5*R;
    }

    y-= 0.75 * R;

    // middle line
    ctx.beginPath();
    ctx.moveTo(x - 0.75*R, y);
    ctx.lineTo(x + 0.75*R, y);
    ctx.stroke();

    // draw 1,2,3,4 keys
    ctx.lineWidth = 0.5;
    draw_capsule(x + 2.1*R, y-0.6*R, 0.5*R, 0.2*R, mod.includes('1'));
    draw_capsule(x + 2.1*R, y, 0.5*R, 0.2*R, mod.includes('2'));
    draw_capsule(x + 2.1*R, y+0.6*R, 0.5*R, 0.2*R, mod.includes('3'));
    draw_capsule(x + 2*R, y+1.2*R, 0.8*R, 0.2*R, mod.includes('4'));

    y += 1.75 * R;

    // 1,2,3
    ctx.lineWidth = 1;
    for (let o of range(3)) {
        draw_circ(x,y,R,fingering[o+5] == 'X');

        y += 2.5 * R;
    }

    // bridge keys / keys
    ctx.lineWidth = 0.5;
    draw_drop_left(x-2*R, y-0.8*R, R*0.52, R*0.28, mod.includes("⠁"));
    draw_drop_left(x-2*R, y, R*0.52, R*0.28, mod.includes("⡀"));
    draw_drop_left(x-1.5*R, y-0.9*R, R*0.52, R*0.28, mod.includes("⠈"));
    draw_drop_left(x-1.5*R, y-0.1*R, R*0.52, R*0.28, mod.includes("⢀"));


    // banana keys
    y+= 22;

    return y;
}

function get_clarinet_height(R) {
    //
    return Math.floor(20.45*R + 22);
}