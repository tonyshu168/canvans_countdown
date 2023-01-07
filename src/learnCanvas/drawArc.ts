/**
 * Draw arc
 */
(function() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement,
        ctx = canvas.getContext('2d');

  canvas.width = 1024, canvas.height = 768;

  ctx!.lineWidth = 5;
  ctx!.strokeStyle = '#005588';

  // 00
  // ctx?.arc(300, 300, 200, 0, 1.5 * Math.PI, true);
  // ctx?.stroke();

  // 01
  for ( let i = 0; i < 10; i++ ) {
    ctx?.beginPath();
    ctx?.arc(50 + i * 100, 60, 40, 0, 2 * Math.PI * (i + 1) / 10);
    ctx?.closePath();

    ctx?.stroke();
  }

  // 02
  for ( let i = 0; i < 10; i++ ) {
    ctx?.beginPath();
    ctx?.arc(50 + i * 100, 180, 40, 0, 2 * Math.PI * (i + 1) / 10);

    ctx?.stroke();
  }

  // 03
  for ( let i = 0; i < 10; i++ ) {
    ctx?.beginPath();
    ctx?.arc(50 + i * 100, 300, 40, 0, 2 * Math.PI * (i + 1) / 10, true);
    ctx?.closePath()

    ctx?.stroke();
  }

  // 04
  for ( let i = 0; i < 10; i++ ) {
    ctx?.beginPath();
    ctx?.arc(50 + i * 100, 420, 40, 0, 2 * Math.PI * (i + 1) / 10);

    ctx?.stroke();
  }
})()