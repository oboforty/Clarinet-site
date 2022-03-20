
function draw_note(ctx, x,y,h,note,text_color) {

  y+=20;
  // full note scale:
  var kR = h/10;
  var startY = y+5*kR;

  let mod = ['#','b'].includes(note[1]) ? note[1] : null;

  // calculate offset on note sheet
  var octaveidx = (parseInt(note[len(note)-1])) - 4;
  var noteidx = note[0].charCodeAt(0) - 69;
  if (note[0]=='A'||note[0]=='B')
    noteidx+=7;
  var offsetid = noteidx + 7*octaveidx;


  // draw helper lines
  if (offsetid < -1) {
    for (var i = offsetid; i < 0; i++) {
      var ny = startY-i*kR;
      if (i%2==0) {
        ctx.beginPath();
        ctx.moveTo(x-kR*2, ny);
        ctx.lineTo(x+kR*2, ny);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
  // draw helper lines
  else if (offsetid > 9) {
    for (var i = 9; i <= offsetid; i++) {
      var ny = startY-i*kR;
      if (i%2==0) {
        ctx.beginPath();
        ctx.moveTo(x-kR*2, ny);
        ctx.lineTo(x+kR*2, ny);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  // draw note
  var i = offsetid;
  var nx = x, nR = kR-0.5;
  var ny = startY-i*kR;
  ctx.beginPath();
  ctx.arc(nx, ny, nR+1, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  ctx.fillRect(nx+nR/2+1.5, ny-5*nR, 2, 4.5*kR);

  // draw sharp/mol
  if (mod != null) {
    ctx.fillText(mod, x-24, ny+8);
  }

  if (text_color) {
    //ctx.fillStyle = text_color;
    ctx.fillText(note, x+10, y - h + 12);
  }
}

function draw_note_lines(ctx, x0,x1,y,h) {
  // full note scale:
  y+=20;

  var kR = h/10;
  var startY = y+5*kR;

  for(var i = 0; i < 10; i++) {
      // note Y:
      var ny = startY-i*kR;

      if (i%2==0) {
          ctx.beginPath();
          ctx.moveTo(x0, ny);
          ctx.lineTo(x1, ny);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
      }
  }
}
//
//function get_note_height(R, h) {
//  var kR = h/10;
//
//  return 20 + 5*kR;
//}