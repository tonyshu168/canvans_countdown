(function() {
  const canvas =document.getElementById('canvas') as HTMLCanvasElement,
        width = canvas.width,
        height = canvas.height,
        context = canvas.getContext('2d');

  console.log('width, height: ', width, height);

  // draw line
  context?.beginPath();
  context?.moveTo(100, 100);
  context?.lineTo(700, 700);
  context?.lineTo(100, 700);
  context?.lineTo(100, 100);
  context?.closePath();

  context!.fillStyle = 'regb(2, 100, 30)';
  context?.fill();

  context!.lineWidth = 5;
  context!.strokeStyle = '#f00';
  context?.stroke();

  context?.beginPath();
  context?.moveTo(200, 100);
  context?.lineTo(700, 600);
  context?.closePath();
  context!.strokeStyle = 'black';
  context?.stroke();

  // 绘制七巧板
  const tangrams = [
    {p: [{x: 0, y: 0}, {x: 800, y: 0}, {x: 400, y: 400}], color: '#caff67'},
    {p: [{x: 0, y: 0}, {x: 400, y: 400}, {x: 0, y: 800}], color: '#67becf'},
    {p: [{x: 800, y: 0}, {x: 800, y: 400}, {x: 600, y: 600}, {x: 600, y: 200}], color: '#ef3d61'},
    {p: [{x: 600, y: 200}, {x: 600, y: 600}, {x: 400, y: 400}], color: '#f9f51a'},
    {p: [{x: 400, y: 400}, {x: 600, y: 600}, {x: 400, y: 800}, {x: 200, y: 600}], color: '#a594c0'},
    {p: [{x: 200, y: 600}, {x: 400, y: 800}, {x: 0, y: 800}], color: '#fa8ecc'},
    {p: [{x: 800, y: 400}, {x: 800, y: 800}, {x: 400, y: 800}], color: '#f6ca29'}
  ];

  type coordinate = {x: number, y: number};
  type block = {p: coordinate[], color: string};

  function drawTangram( tangram = tangrams ) {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement,
        ctx = canvas.getContext('2d');

    canvas.width = 800, canvas.height = 800;

    tangram.forEach(piece => {
      draw(piece, ctx!);
    });

    function draw(piece: block, ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.moveTo(piece.p[0].x, piece.p[0].y);

      for ( let i = 1, len = piece.p.length; i < len; i++ ) {
        const coordinate = piece.p[i];
        ctx.lineTo(coordinate.x, coordinate.y);
      }

      ctx.closePath();

      ctx.fillStyle = piece.color;
      ctx.fill();
    }
  }

  drawTangram();
})()