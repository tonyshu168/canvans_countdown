import digit from './digit';
(function(digit) {
  const WINDOW_WIDTH = 1024,
        WINDOW_HEIGHT = 768,
        RADIUS = 8,
        MARGIN_TOP = 60,
        MARGIN_LEFT = 30,

        canvas = document.getElementById('canvas') as HTMLCanvasElement,
        ctx = canvas.getContext('2d')!;

  canvas.width = WINDOW_WIDTH, canvas.height = WINDOW_HEIGHT;

  render( ctx );

  function render( ctx: CanvasRenderingContext2D ) {
    let hours = 12,
        minutes = 34,
        seconds = 56;

    // 小时
    // renderDigit( 0, 0, parseInt(String(hours / 10)), ctx);
    renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(String(hours / 10)), ctx);
    renderDigit( MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(String(hours % 10)), ctx);
    renderDigit( MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);                                        // 给制冒号:
    // 分
    renderDigit( MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(String(minutes / 10)), ctx);
    renderDigit( MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(String(minutes % 10)), ctx);
    renderDigit( MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    // 秒
    renderDigit( MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(String(seconds / 10)), ctx);
    renderDigit( MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(String(seconds % 10)), ctx);
  }

  function renderDigit( x: number, y: number, num: number, ctx: CanvasRenderingContext2D ) {
    ctx.fillStyle = 'rgb(0, 102, 153)';

    for ( let i = 0; i < digit[num].length; i++ ) {
      for ( let j = 0; j < digit[num][i].length; j++ ) {
        if ( digit[num][i][j] == 1) {
          ctx.beginPath();
          ctx.arc( x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
          ctx.closePath();

          ctx.fill();
        }
      }
    }
  }
})(digit)