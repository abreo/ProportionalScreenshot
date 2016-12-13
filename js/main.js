
document.onselectstart=new Function('event.returnValue=false;');
window.onload = function(){
	var boxDiv = document.getElementById('box');//外层容器
	var img=document.getElementById('img1');//原图片
	var mainDiv = document.getElementById('main');//选择层
	var leftUpDiv = document.getElementById('left-up');//左上角触点
	var rightDownDiv = document.getElementById('right-down');//右下角触点
	var ifBool = false;//判断鼠标是否按下
	var contact = "";//当前拖动的触点
/*
		事件区
*/
	$( "#main" ).draggable({ containment: 'parent' ,drag: setChoice});
	//鼠标按下-右下角
	rightDownDiv.onmousedown = function(e){
		e.stopPropagation();
		ifBool = true;
		contact = "rightDown";
	};
	//拖动
	window.onmousemove = function(e){
		e.stopPropagation();
		if(ifBool){
			switch(contact){
				case "rightDown":rightMove(e);break;
				default:alert("操作错误！");
			}
		var width = mainDiv.offsetWidth;
		var height = mainDiv.offsetHeight;
		setChoice();
		}
	};
	//鼠标松开
	window.onmouseup = function(e){
		ifBool = false;
		contact = "";
	};
	setChoice();//初始化选择区域可见
/*
		函数区
*/
	//右边拖动
	function rightMove(e){
		var x = e.clientX;//鼠标横坐标
		if(x > getPosition(boxDiv).left + boxDiv.offsetWidth){
			x = getPosition(boxDiv).left + boxDiv.offsetWidth;
		}		
		if(getPosition(rightDownDiv).top+4<getPosition(img1).top+img1.height){//防止选择层下方超出图片
		var width = mainDiv.offsetWidth - 2;//选择层宽度
		var height=width/2;
		var mainX = getPosition(leftUpDiv).left + 4;//左上角横坐标
		var addWidth = x - width - mainX;//拖动后应该增加的宽度
		var addHeight =addWidth;
		mainDiv.style.width = (width + addWidth) + "px";
		mainDiv.style.height = (height + addHeight) + "px";
		}
	}
	//设置选择区域可见
	function setChoice(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		document.getElementById("img2").style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
		preview({"top":top,"right":right,"bottom":bottom,"left":left});

	}
	//获取元素的绝对位置
	function getPosition(node){
		var left = node.offsetLeft;
		var top = node.offsetTop;
		current = node.offsetParent; // 取得元素的offsetParent
		　// 一直循环直到根元素
	　　while (current != null) {
		　　left += current.offsetLeft;
		　　top += current.offsetTop;
		　　current = current.offsetParent;
	　　}
		return {"left":left,"top":top};
	}
	//预览
	function preview(view){
		var previewImg = document.getElementById("img3");
		previewImg.style.top = -view.top + "px";
		previewImg.style.left = -view.left + "px";
		previewImg.style.clip = "rect("+view.top+"px,"+view.right+"px,"+view.bottom+"px,"+view.left+"px)";
	}
}
