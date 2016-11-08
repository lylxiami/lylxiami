(function(html){//匿名函数 获取不同屏幕下html根的字体大小
		change()
		function change(){
			var w = html.clientWidth;
			size = 100*(w/750).toFixed(2);
			html.style.fontSize = size+"px";
		}
		window.addEventListener('resize',function () {
			change();
			setTimeout(function(){
			var span = document.querySelectorAll("span");
//				span[0].innerText = "讲义";
				span[0].innerText = "选课";
				span[1].innerText = "题库";
//				span[3].innerText = "评价";
			},50);
		})
	})(document.documentElement)

var video = document.getElementsByTagName('video')[0];//获取video标签
var change = document.querySelectorAll('.title li');//切换的标题标签
var framework = document.querySelector('.course-select .framework');//包裹所有章节列表的标签
var lay = document.querySelector('.layer');//刚进入页面时的遮层罩
var scan = document.querySelector('.scan')//扫描二维码
var close = document.querySelector(".close")//关闭二维码
var footer = document.querySelector("footer");
localStorage.clear();
lay.onclick = function(){
	lay.style.display = "none";
}

//swiper插件实现切换
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    		var span = document.querySelectorAll(".swiper-pagination span");
//			span[0].innerText = "讲义";
			span[0].innerText = "选课";
			span[1].innerText = "题库";
//			span[3].innerText = "评价";
  		}
  });

var id = "2301";//传入默认播放视频的id
//ajax 获取数据
$.post('http://120.76.31.111/scanajax/getlessonlist',{},function(data){
	var json = data;
	create(json)//创建章节列表
})

function create(json){
	for (var i = 0; i < json.list.length; i++) {//创建章
		framework.innerHTML +=  '<div class="List"><h1>'+json.list[i].Name+'</h1><ul class="list"></ul></div>'
	}
	var list = document.querySelectorAll('.list');
	for (var i = 0; i < list.length; i++) {//创建节
		for (var j = 0; j < json.list[i].ChildrenList.length; j++) {
			list[i].innerHTML +='<li class="section"><img src="img/1.png" alt="">'+json.list[i].ChildrenList[j].Name+'</li>'
			if(json.list[i].ChildrenList[j].Id==id){//判断是否为默认视频
				video.src = json.list[i].ChildrenList[j].Url;
				var m = i;
				var n = j;
			}
		}
	}
	
	$('.List').eq(m).find('.list li').eq(n).addClass('reset');
	$('.List').eq(m).find('.list li').eq(n).find('img').attr('src','img/2.png');
	
	var num = localStorage.getItem("num") || 0;

	//点击播放视频
	var section = document.querySelectorAll('.List');
	var img = document.querySelectorAll('.section img');
	var section = $('.section')
	section.each(function(){
		$(this).click(function(){
			var thi = $(this);
			var pic = $(this).find('img')
			var d = thi.parents('.List').index()
			var k = thi.index()
			num++;
			if(num==3){
				localStorage.setItem("num",3);
			}else{
				localStorage.setItem("num",4);
			}
			if (localStorage.getItem("num")==3) {
				video.pause();
				scan.style.display = "block"
			}else{
				scan.style.display = "none"
			}
			video.src = json.list[d].ChildrenList[k].Url
			video.play()
			$(this).addClass('reset');
			$(this).find('img').attr('src','img/2.png');
			section.not(thi).removeClass('reset');
			section.find('img').not(pic).attr('src','img/1.png');
		})
	})
}

//点击关闭学习二维码
Close();
function Close(){
	close.onclick = function(){
		footer.style.display = "none"
	}
}




