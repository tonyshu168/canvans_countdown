(function() {
  const WIDTH = 1024, HEIGHT = 768;
  var ball = { x: 512, y: 100, r: 20, g: 2, vx: -4, vy: 5, color: '#005588' };
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  canvas.width = WIDTH, canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d')!;

  setInterval(() => {
    render( ctx );
    update();
  }, 50);

  function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += ball.g;

    if ( ball.y >= HEIGHT - ball.r ) {
      ball.y = HEIGHT - ball.r;
      ball.vy =- ball.vy * 0.5;
    }
  }

  function render( ctx: CanvasRenderingContext2D ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, ball.r, 0, 2 * Math.PI );
    ctx.closePath();

    ctx.fill();
  }
})()
