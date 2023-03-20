import digit from './digit';
(function(digit) {
  let WINDOW_WIDTH = document.body.clientWidth || document.documentElement.clientWidth,
        WINDOW_HEIGHT = document.body.clientHeight || document.documentElement.clientHeight,
        RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) -1,  // 屏幕的4/5除以108(最右边的小球的位置93 + 小球的半径15)
        MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5),
        MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);

  const canvas = document.getElementById('canvas') as HTMLCanvasElement,
        ctx = canvas.getContext('2d')!;

  const endTime = new Date('2023-03-20 23:00:00');
  let curShowTimeSeconds = 0;

  type BallType = {
    x: number,
    y: number,
    g: number,
    vx: number,
    vy: number,
    color: string
  };
  const balls: Array<BallType> = [],
        colors = ['#33B5E5','#0099CC','#AA66CC','#9933CC','#99CC00','#669900','#FFBB33','#FF8800','#FF4444','#CC0000'];

  canvas.width = WINDOW_WIDTH, canvas.height = WINDOW_HEIGHT;


  curShowTimeSeconds = getCurrentShowTimeSeconds();
  setInterval(function() {
    render( ctx );
    update();
  }, 50);

  window.onresize = function() {
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      WINDOW_WIDTH = document.body.clientWidth || document.documentElement.clientWidth,
      WINDOW_HEIGHT = document.body.clientHeight || document.documentElement.clientHeight,
      RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) -1,  // 屏幕的4/5除以108(最右边的小球的位置93 + 小球的半径15)
      MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5),
      MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    },50)
  }
  
  function update() {
    const nextShowTimeSeconds = getCurrentShowTimeSeconds();
    const nextHours = parseInt( String(nextShowTimeSeconds / 3600) ),
          nextMinutes = parseInt( String((nextShowTimeSeconds - nextHours * 3600)/60) ),
          nextSeconds = nextShowTimeSeconds % 60;

    // 
    let curHours = parseInt( String(curShowTimeSeconds / 3600) ),
        curMinutes = parseInt( String((curShowTimeSeconds - curHours * 3600)/60) ),
        curSeconds = curShowTimeSeconds % 60;
    if ( nextSeconds !== curSeconds ) {
      // 设置变动的小球
      if ( parseInt( String(curHours/10) ) != parseInt( String(nextHours/10) ) ) {
        addBalls( MARGIN_LEFT + 0, MARGIN_TOP, parseInt(String(curHours/10)) );
      }
      if ( parseInt( String(curHours%10) ) != parseInt( String(nextHours%10) ) ) {
        addBalls( MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt( String(curHours/10) ) );
      }

      if( parseInt( String(curMinutes/10) ) != parseInt( String(nextMinutes/10) ) ){
        addBalls( MARGIN_LEFT + 39 * (RADIUS+1) , MARGIN_TOP , parseInt( String(curMinutes/10) ) );
      }
      if( parseInt( String(curMinutes%10) ) != parseInt( String(nextMinutes%10) ) ){
        addBalls( MARGIN_LEFT + 54 * (RADIUS+1) , MARGIN_TOP , parseInt( String(curMinutes%10) ) );
      }

      if( parseInt( String(curSeconds/10) ) != parseInt( String(nextSeconds/10) ) ){
        addBalls( MARGIN_LEFT + 78 * (RADIUS+1) , MARGIN_TOP , parseInt( String(curSeconds/10) ) );
      }
      if( parseInt( String(curSeconds%10) ) != parseInt( String(nextSeconds%10) ) ){
        addBalls( MARGIN_LEFT + 93 * (RADIUS+1) , MARGIN_TOP , parseInt( String(nextSeconds%10) ) );
      }

      curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
  }

  function getCurrentShowTimeSeconds(): number {
    let curTime = new Date();
    let ret = endTime.getTime() - curTime.getTime();
    
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
  }

  function render( ctx: CanvasRenderingContext2D ) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    let hours = parseInt( String(curShowTimeSeconds / 3600) ),
        minutes = parseInt( String((curShowTimeSeconds - hours * 3600)/60) ),
        seconds = curShowTimeSeconds % 60;

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
    
    // 生成动画小球
    for ( const ball of balls ) {
      ctx.fillStyle = ball.color;

      ctx.beginPath();
      ctx.arc( ball.x, ball.y, RADIUS, 0, 2 * Math.PI, true);
      ctx.closePath();

      ctx.fill();
    }
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

  function updateBalls( ) {
    for ( const obj of balls ) {
      obj.x += obj.vx;
      obj.y += obj.vy;
      obj.vy += obj.g;

      // 边界判断
      if ( obj.y >= WINDOW_HEIGHT - RADIUS ) {
        obj.y = WINDOW_HEIGHT - RADIUS;
        obj.vy =- obj.vy * 0.75;
      }
    }

    // 小球的性能优化
    let counter = 0;
    for ( const ball of balls ) {
      // 如小球在屏幕内,则加入
      if ( ball.x + RADIUS > 0 && ball.x - RADIUS < WINDOW_WIDTH ) {
        balls[counter++] = ball;
      }
    }

    // 只渲染最大数量300个小球
    while ( balls.length > Math.min(300, counter) ) {
      balls.pop();
    }
  }

  // Add ball
  function addBalls( x: number, y: number, num: number) {
    for ( let i = 0, len = digit[num].length; i < len; i++ ) {
      for ( let j = 0, length = digit[num][i].length; j < length; j++ ) {
        if ( digit[num][i][j] === 1 ) {
          const aBall: BallType = {
            x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
            y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
            g: 1.5 + Math.random(),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,            // -1多少次方, [-1, 1], 偶数次方为1, 奇数次方为-1
            vy: -5,
            color: colors[ Math.floor(Math.random() * colors.length) ]
          };

          balls.push( aBall );
        }
      }
    }
  }
})(digit)