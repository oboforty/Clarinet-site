
function draw_note(x,y,w,h,note, show_text) {
  y+=20;
  // full note scale:
  var kR = h/10;
  var startY = y+5*kR;

  let mod = ['#','b'].includes(note[1]) ? note[1] : null;

  for(var i = 0; i < 10; i++) {
      // note Y:
      var ny = startY-i*kR;

      if (i%2==0) {
          ctx.beginPath();
          ctx.moveTo(x-w/2, ny);
          ctx.lineTo(x+w/2, ny);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
      }
  }

  // calculate offset on note sheet
  var octaveidx = (parseInt(note[len(note)-1])) - 4;
  var noteidx = note[0].charCodeAt(0) - 69;
  if (note[0]=='A'||note[0]=='B')
    noteidx+=7;
  var offsetid = noteidx + 7*octaveidx;
  
  //console.log(note, offsetid)

  // draw note
  var i = offsetid;
  var nx = x, nR = kR-0.5;
  var ny = startY-i*kR;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(nx+nR/2, ny+nR/2);
  ctx.arc(nx, ny, nR, 0, Math.PI*2);
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;

  // draw sharp/mol
  if (mod != null) {
    ctx.fillText(mod, x-24, ny+8);
  }

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

  if (show_text) {
    ctx.fillStyle = "#404040";
    ctx.fillText(note, x-30, y + 24 + h);
    ctx.fillStyle = "black";  
  }
}
  