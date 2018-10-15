
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;
autoSetCanvasSize(yyy)
/*************/
listenToUser(yyy)

var eraserEnabled = false;
pen.onclick = function(){
//click事件兼容移动端和pc
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
//橡皮事件
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height);
}//清除图像
download.onclick = function(){
  var url =  yyy.toDataURL("image/png")
  console.log(url)
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url;
  a.download = '我的画'
  a.target = '_blank'
  a.click();
}

/***********/

function listenToUser(canvas) {

  var using = false;
  var lastPoint = { x: undefined, y: undefined }

//特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备  
    canvas.ontouchstart = function (aaa) {
      console.log('开始摸')
      console.log(aaa)
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      /*因为移动触屏设备支持多点触控，所以会存储多个触点信息，
      现在只有一个触点那就是鼠标指针，数据存在touches第零个数组里。*/
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { "x": x, "y": y }
        console.log(lastPoint);
        //drawCircle(x, y, 1);画圆
      }
    }
    canvas.ontouchmove = function (aaa) {
      console.log('摸着拖')
      
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      console.log(x,y)
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = {
          "x": x,
          "y": y
        }
        //drawCircle(x, y, 1);画圆
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)//画线从xy到新的xy
        lastPoint = newPoint;//新的点变成最后一个点，用来更新
      }

    }
    canvas.ontouchend = function () {
      console.log('摸完了')
      using = false;
    }
  }
  else {
    //非触屏设备 
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { "x": x, "y": y }
        console.log(lastPoint);
        //drawCircle(x, y, 1);画圆
      }
  
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
  
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = {
          "x": x,
          "y": y
        }
        //drawCircle(x, y, 1);画圆
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)//画线从xy到新的xy
        lastPoint = newPoint;//新的点变成最后一个点，用来更新
      }
    }
    canvas.onmouseup = function (aaa) {
      using = false;
    }
  }

  
}

black.onclick = function(){
  context.strokeStyle= 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}

red.onclick = function(){
  context.strokeStyle = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  black.classList.remove('active')
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')


}
blue.onclick = function(){
  black.classList.remove('active')
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
//切换颜色
thin.onclick = function(){
  lineWidth = 5;
}
thick.onclick = function(){
  lineWidth = 10;
}
/***********/

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth//从api获取宽度
    var pageHeight = document.documentElement.clientHeight//从api获取高度

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
/****************/
function drawCircle(x, y, radius) {
  context.beginPath();
  
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  
  context.moveTo(x1, y1);//起点
  context.lineWidth = lineWidth;//线宽
  context.lineTo(x2, y2);//终点
  context.stroke();//划线
  context.closePath();//结束
}

