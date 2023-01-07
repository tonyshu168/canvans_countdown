### 第一章
***

#### canvas的基本用法
***
* 创建canvas元素，指定高，宽，获取canvas，获取context, **canvas的坐标是以左上角为原点，往右为x轴，往下为y轴**。
```html
<canvas width="200" height="100">当前浏览器不支持canvas, 请使用其它浏览器试试</canvas>
```
```typescript
const canvas = document.getElementById('canvas') as HTMLCanvasElement,
      width = canvas.width,
      height = canvas.height,
      context = canvas.getContext('2d');
console.log(width);
console.log(height);
```

* 绘制线条，指定起好始点: moveTo(x, y), 下一点: lineTo(x, y), 设置线宽: lineWidth = 5, 设置线的颜色: storeStyle = "#00f", 一条线的开始: beginPath(), 一条线的结束: closePath(), canvas先是状态绘制，再是具体绘制
```typescript
context?.beginPath();
context?.moveTo(100, 100);                 // 状态绘制，绘制一条线
context?.lineTo(700, 700);
context?.lineTo(100, 700);
context?.lineTo(100, 100);
context?.closePath();
context!.lineWidth = 5;
context!.strokeStyle = '#00f';

context?.stroke();                         // 再具体绘制

context?.beginPath();
context?.moveTo(200, 100);
context?.lineTo(700, 600);
context?.closePath();

context!.strokeStyle = 'black';
context?.stroke();

```

* 多边形着色, fillStyle = 'rgba(50, 100, 200, 0.2)', 再填充: fill().
```typescript
context?.moveTo(100, 100);
context?.lineTo(700, 700);
context?.lineTo(100, 700);
context?.lineTo(100, 100);

context!.fillStyle = 'rgba(50, 100, 200, 0.2)';
context!.fill();

context!.lineWidth = 5;
context!.strokeStyle = 'red';

context!.stroke();
```

* 用上面所学的知识给一个七巧板， 定义好各个板的坐标与颜色，再具体的绘制
```typescript
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

function drawTangram( tangram = tangrams) {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement,
      ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 800;

  tangram.forEach(piece => {
    draw(piece, ctx!);
  })

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

export default drawTangram;
```