### 5-1 动画小球的性能优化
***

随着程序运行时间的的增长，balls中的小球会越来越多，会增加计算机的渲染资源，从面导顿，因此需要做优化。具体方案如下：
当小球不在当前页面时，删除该小球。
```typescript
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
```
