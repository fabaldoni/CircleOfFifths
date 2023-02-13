//flat unicode character &#x266d;
//sharp unicode character &#x266f;

function test(){alert('it works');}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = parseInt(canvas.getAttribute("width"));
const canvasHeight = parseInt(canvas.getAttribute("height"));
const canvasCenterX = parseInt(canvasWidth / 2);
const canvasCenterY = parseInt(canvasHeight / 2);

//move the canvas origin to the middle of the area
ctx.save();
ctx.lineWidth = 4;
ctx.translate(canvasWidth / 2, canvasHeight / 2);

//radius is calculated so the circle takes up 70% of the lesser of the canvas width or height
const r = Math.min(canvasWidth, canvasHeight) * 0.7 * 0.5;

function drawCircleOfFifths() {
  clearCanvas();

  //draw outer circle
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
  ctx.stroke();

  const offset = Math.PI / 12;
  const increment = Math.PI / 6;

  for (let i = 1; i <= 12; i++) {
    const p = getRadialSegmentEndPoints(0, 0, r, offset + i * increment);
    ctx.beginPath();
    ctx.moveTo(p.P1.x, p.P1.y);
    ctx.lineTo(p.P2.x, p.P2.y);
    ctx.stroke();
  }

  //fill inner circle (shrink by 1px to avoid filling stroke)
  ctx.beginPath();
  ctx.arc(0, 0, 0.7 * r, 0, 2 * Math.PI, true);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();

  drawSegmentText("C", 1);
  drawSegmentText("G", 2);
  drawSegmentText("D", 3);
  drawSegmentText("A", 4);
  drawSegmentText("E", 5);
  drawSegmentText("B", 6);
  drawSegmentText("F\u266f", 7);
  drawSegmentText("D\u266d", 8);
  drawSegmentText("A\u266d", 9);
  drawSegmentText("E\u266d", 10);
  drawSegmentText("B\u266d", 11);
  drawSegmentText("F", 12);

  //console.log(getRadialSegmentEndPoints(0,0,1,0.25*Math.PI));
}

function getRadialSegmentEndPoints(cx, cy, radius, angle) {
  const seg = {};
  seg.P1 = {};
  seg.P2 = {};
  seg.P1.x = cx + radius * Math.cos(angle);
  seg.P1.y = cy + radius * Math.sin(angle);
  seg.P2.x = cx - radius * Math.cos(angle);
  seg.P2.y = cy - radius * Math.sin(angle);
  return seg;
}

function drawSegmentText(text, num) {
  let tm = ctx.measureText(text); // TextMetrics object
  let tmOffset = tm.width / 2;
  console.log(tmOffset);

  ctx.save();
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "black";
  ctx.rotate((num - 1) * (Math.PI / 6));
  ctx.fillText(text, -tmOffset * 5, -r * 0.8);
  ctx.restore();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
