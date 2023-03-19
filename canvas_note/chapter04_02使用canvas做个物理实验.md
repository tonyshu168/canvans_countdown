### 使用canvas做物理实验(小球落地实验)
***

1. 由定时器完成, render方法做渲染，update方法更新
```typescript
setInterval(function() {
  render( context );
  update();
}, 50);
```
2. 设置重力加速度，设置每帧X轴移动的距离，设置每帧Y轴移动的距离
```typescript
// g: 重力加速度；vx：x轴移动的距离；vy：y轴移动的距离
var ball = { x: 512, y: 100, r: 20, g: 2, vx: -4, vy: 5, color: '#005588' };
```

4. 小球落地时碰撞检测
```typescript
// 落到地面时检测
if ( ball.y >= HEIGHT - ball.r ) {
  ball.y = HEIGHT - ball.r;
  ball.vy =- ball.vy * 0.5; // 向上回弹的距离为原来的一半
}
``` 


3. 具体代码如下：
```typescript
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

```

[代码地址](https://github.com/tonyshu168/canvans_countdown/tree/chapter05-01)