var myAudio = new Daudio({
  ele: '.d-audio',
  src: 'http://www.17sucai.com/preview/939950/2018-11-29/%E5%94%AF%E7%BE%8E%E5%8A%A8%E7%94%BB/mp3/Approaching%20Nirvana%20-%20You.mp3',
  imageurl: '/img/avatar1.png',
  name: 'YOU',
  singer: 'Approaching Nirvana',
  loop: true,
  initstate: 'cricle',//cricle
  showprogress: true,
  next: function () { },
  ended: function () { }
})


function randomRange(t, i) {
  return Math.random() * (i - t) + t
}
Particle3D = function (t) {
      THREE.Particle.call(this, t), this.velocity = new THREE.Vector3(0, -2, 0), this.velocity.rotateX(randomRange(-
              45, 45)), this.velocity.rotateY(randomRange(0, 360)), this.gravity = new THREE.Vector3(0, 0, 0), this.drag =
          1
  }, Particle3D.prototype = new THREE.Particle, Particle3D.prototype.constructor = Particle3D, Particle3D.prototype.updatePhysics =
  function () {
      this.velocity.multiplyScalar(this.drag), this.velocity.addSelf(this.gravity), this.position.addSelf(this.velocity)
  };
var TO_RADIANS = Math.PI / 180;
THREE.Vector3.prototype.rotateY = function (t) {
  cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
  var i = this.z,
      o = this.x;
  this.x = o * cosRY + i * sinRY, this.z = o * -sinRY + i * cosRY
}, THREE.Vector3.prototype.rotateX = function (t) {
  cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
  var i = this.z,
      o = this.y;
  this.y = o * cosRY + i * sinRY, this.z = o * -sinRY + i * cosRY
}, THREE.Vector3.prototype.rotateZ = function (t) {
  cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
  var i = this.x,
      o = this.y;
  this.y = o * cosRY + i * sinRY, this.x = o * -sinRY + i * cosRY
};
var d3lizi;
$(function () {
  var container = document.querySelector(".snow-container");
  if (/MSIE 6|MSIE 7|MSIE 8/.test(navigator.userAgent)) {
      return
  } else {
      if (/MSIE 9|MSIE 10/.test(navigator.userAgent)) {
          $(container).css("height", $(window).height()).bind("click", function () {
              $(this).fadeOut(1000, function () {
                  $(this).remove()
              })
          })
      }
  }
  var containerWidth = $(container).width();
  var containerHeight = $(container).height();
  var particle;
  var camera;
  var scene;
  var renderer;
  var mouseX = 0;
  var mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var particles = [];
  var particleImage = new Image();
  particleImage.src = "img/snow.png";
  var snowNum = 800;
  
  function init() {
      camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 10000);
      camera.position.z = 1000;
      scene = new THREE.Scene();
      scene.add(camera);
      renderer = new THREE.CanvasRenderer();
      renderer.setSize(containerWidth, containerHeight);
      var material = new THREE.ParticleBasicMaterial({
          map: new THREE.Texture(particleImage)
      });
      for (var i = 0; i < snowNum; i++) {
          particle = new Particle3D(material);
          particle.position.x = Math.random() * 3000 - 100;
          particle.position.y = Math.random() * 3000 - 100;
          particle.position.z = Math.random() * 3000 - 100;
          particle.scale.x = particle.scale.y = 1;
          scene.add(particle);
          particles.push(particle)
      }
      container.appendChild(renderer.domElement);
      document.addEventListener("mousemove", onDocumentMouseMove, false);
      document.addEventListener("touchstart", onDocumentTouchStart, false);
      document.addEventListener("touchmove", onDocumentTouchMove, false);
      d3lizi = setInterval(loop, 1000 / 40)
  }

  function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) * 1;
      mouseY = (event.clientY - windowHalfY) * 1;
  }

  function onDocumentTouchStart(event) {
      if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY
      }
  }

  function onDocumentTouchMove(event) {
      if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY
      }
  }

  function loop() {
      for (var i = 0; i < particles.length; i++) {
          var particle = particles[i];
          particle.updatePhysics();
          with(particle.position) {
              if (y < -1000) {
                  y += 2000
              }
              if (x > 1000) {
                  x -= 2000
              } else {
                  if (x < -1000) {
                      x += 2000
                  }
              }
              if (z > 1000) {
                  z -= 2000
              } else {
                  if (z < -1000) {
                      z += 2000
                  }
              }
          }
      }
      camera.position.x += (mouseX - camera.position.x) * 0.005;
      camera.position.y += (-mouseY - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      renderer.render(scene, camera)
  }
  init()
});

// 星星构造函数
function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * 0.03;
}

//对象原型方法
/**
* 画星星
* 
* @param context
*/
Star.prototype.draw = function (context) {
  context.rotate(Math.PI * 1 / 10);

  //save the context
  context.save();
  //move into the middle of the canvas,just make room
  context.translate(this.x, this.y);
  //change the opacity
  if (this.opacity > 1) {
      this.factor = -1;
  } else if (this.opacity <= 0) {
      this.factor = 1;

      // 更新一次星星位置
      this.x = Math.round(Math.random() * screenW);
      this.y = Math.round(Math.random() * screenH);
  }

  // factor 控制方面，淡入淡出，每次重绘，星星的透明度都在变化
  this.opacity += this.increment * this.factor;

  context.beginPath();
  //画线
  for (var i = 5; i > 0; i--) {
      context.lineTo(0, this.length);
      context.translate(0, this.length);
      context.rotate(Math.PI * 2 / 10);
      context.lineTo(0, -this.length);
      context.translate(0, -this.length);
      context.rotate(-(Math.PI * 6 / 10));
  }

  context.lineTo(0, this.length);
  context.closePath();

  context.fillStyle = 'rgba(255,255,200, ' + this.opacity + ')';
  context.shadowBlur = 5;
  context.shadowColor = '#ffff33';
  context.fill();

  context.restore();
}



var stars = [];

screenW = $(window).width(),
screenH = $(window).height(),
stars = [];
numStars = 200;

for (let i = 0; i < numStars; i++) {
  let x = Math.round(Math.random() * screenW);
  let y = Math.round(Math.random() * screenH);
  let length = 1 + Math.random() * 2;
  let opacity = Math.random();

  // 创建星星实例
  let star = new Star(x, y, length, opacity);
  stars.push(star);
}

var canvas = $$("canvass"),
	ctx = canvas.getContext("2d"),
	g = 0.3,//模拟重力加速度
	n = 5,//一次性发射的烟火的数量
	fireworkList = [],//存放所有烟火对象
	//烟火形状                                                        圆形                                                              椭圆形                                                          爱心形
	fireworkTypeList = [createCircleFirework, createEllipseFirework, createHeartFirework],
	totalNum = 0,//发射烟火的总数量
	surprise_num = 25,//当发射烟火数量达到25时,发射生日快乐字样的烟火
	flag = true;//是否发射生日快乐字样的烟火
canvas.width = $(window).width() - 15;
canvas.height = $(window).height() - 20;




var init = function(firework,params){//初始化一个烟火
	var beforeBalst = firework.getBeforeBalst();
	firework.setCtx(ctx);
	firework.setStatus(1);//状态为点燃引线
	firework.setNum(100 + Math.floor(20 * Math.random()));//爆炸之后的烟花数量
	firework.setRoundness(getType(params) == "object" ? (getType(params.roundness) == "number" ? params.roundness : 0.25) : 0.25);//默认的规则度是0.25,这样爆炸的烟花与真实的最像
	// firework.setFireworkType(getType(params) == "object" ? params.fireworkType : fireworkTypeList[Math.floor(Math.random() * fireworkTypeList.length)]);//从三种形状中随机烟花形状
	firework.setFireworkType(getType(params) == "object" ? params.fireworkType : createCircleFirework);//默认圆形烟花
	firework.setDelay(Math.floor(30 * Math.random()));//引线燃烧的时间,单位为帧, 最多30帧,即0.5s
	beforeBalst.setAnimate({
		quiescence : {//发射位置为底部中间
			x : canvas.width / 2,
			y : canvas.height,
			deg : 0,
			zoom : 1
		},move : {//发射速度向量
			vx : getType(params) == "object" && params.xv == 0 ? 0 : -7 + 14 * Math.random(),
			vy : getType(params) == "object" && params.xv == 0 ? -20 : -20 + 4 * Math.random(),
			pal : 0,
			scale : 0
		},translate : {//发射加速度,有一个为g的重力加速度
			ax : 0,
			ay : g,
			apal : 0,
			scale : 0
		}
	});
	beforeBalst.setR(3);//烟火半径为3像素
	beforeBalst.setColor("#FFFFFF");//白色
	beforeBalst.setLife(50 + Math.floor(Math.random() * 40));//烟花从发射到爆炸的时间,单位为帧,即50-100帧后爆炸
	beforeBalst.setBase();//记录烟花发射的初始状态
}

for(var i = 0; i < n; i++){//初始化n个烟火
	var firework = Firework.getInstance();
	init(firework);
	fireworkList.push(firework);
	totalNum++;
}

var draw = function(){//描绘每一帧烟火的状态
	//整个canvas充满黑幕,模拟黑夜
	ctx.globalCompositeOperation = 'source-over';
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = '#000003';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//描绘每个烟火的状态
	ctx.globalCompositeOperation = 'screen';
	$.each(fireworkList,function(index,value){
		value.draw();
	});
	
};

var update = function(){//更新每一帧烟火的状态
	for(var i = fireworkList.length - 1; i >= 0; i--){
		fireworkList[i].update();//更新
		if(fireworkList[i].getStatus() == 5){//烟火消失
			fireworkList.splice(i,1);//在烟火集合中将这个烟火去除掉
			if(totalNum < surprise_num){//当发射烟火数量没到25
				var firework = Firework.getInstance();//继续生成新的烟火
				init(firework);
				fireworkList.push(firework);
				totalNum++;
			}  
			if(fireworkList.length == 0 && flag){//发射生日快乐烟火和一箭穿心烟火
				var firework = Firework.getInstance();
				init(firework,{fireworkType:createCustomFirework,roundness:1,xv: 0});
				fireworkList.push(firework);        			
				var firework2 = Firework.getInstance();
				init(firework2,{fireworkType:createDoubleHeartFirework,roundness:1});
				fireworkList.push(firework2);
                flag = false;
                // setTimeout(function(){
                //   cancelAnimationFrame(aaa)
                // }, 8000)
                aflag = true;
			}
		}
	}
}
var aaa;
var loop = function(){
	draw();
  update();
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }					
	aaa = requestAnimationFrame(loop);
};

function showfire(){
  $$("canvass").style.display = 'block'
  clearInterval(d3lizi)
  loop();
}