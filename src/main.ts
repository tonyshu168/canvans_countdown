(function() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement,
        width = canvas.width,
        height = canvas.height,
        context = canvas.getContext('2d');
  console.log(width);
  console.log(height);

  // 绘制线条, 两段线
  // context?.beginPath();
  // context?.moveTo(100, 100);                 // 状态绘制，绘制一条线
  // context?.lineTo(700, 700);
  // context?.lineTo(100, 700);
  // context?.lineTo(100, 100);
  // context!.lineWidth = 5;
  // context!.strokeStyle = '#00f';
  // context?.closePath();

  // context?.stroke();

  // context?.beginPath();
  // context?.moveTo(200, 100);
  // context?.lineTo(700, 600);
  // context?.closePath();

  // context!.strokeStyle = 'black';
  // context?.stroke();

  // 给多边形填色, 再描边
  // context?.moveTo(100, 100);
  // context?.lineTo(700, 700);
  // context?.lineTo(100, 700);
  // context?.lineTo(100, 100);

  // context!.fillStyle = 'rgba(50, 100, 200, 0.2)';
  // context!.fill();

  // context!.lineWidth = 5;
  // context!.strokeStyle = 'red';

  // context!.stroke();
})();

// import drawTangram from './drawTangram';

// drawTangram();

// import './ts/drawArc';

// 03
import './ts/countdown';

