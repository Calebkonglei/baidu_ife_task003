window.onload=function(){
	wartFall('main','box');
	var dataInt={'data':[{"src":"images/25.jpg"},
	                     {"src":"images/33.jpg"},
	                     {"src":"images/37.jpg"},
	                     {"src":"images/20.jpg"},
	                     {"src":"images/35.jpg"}]};
    setTimeout(function(){
      
    },3000);
	window.onscroll=function(){
       if(checkScrollSlide()){
       	var oParent=document.getElementById('main');
          //将数据渲染到页面底部
          for(var i=0,l=dataInt.data.length;i<l;i++){
          	var oBox=document.createElement('div');
          	oBox.className="box";
          	oParent.appendChild(oBox);
          	var opic=document.createElement('div');
          	opic.className="pic";
          	oBox.appendChild(opic);
          	var oimg=document.createElement('img');
          	oimg.src=dataInt.data[i].src;
          	opic.appendChild(oimg);


          }
          wartFall('main','box');
       }
	}
}

function wartFall(parent,box){
	//取出main下的所有class为box的元素
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/盒子宽）
	var oBoxW=oBoxs[0].offsetWidth;//盒宽
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	var hArr=[];//放置每排元素高度
	for(var i=0,l=oBoxs.length;i<l;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position="absolute";
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=index*oBoxW+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}


	}
	

};

function getByClass(parent,clsName){
	var boxArr=[];//存放取出的元素
	var oElements=parent.getElementsByTagName('*');
	for(var i=0,l=oElements.length;i<l;i++){
		if((' '+oElements[i].className+' ').indexOf(' '+clsName+' ')!=-1){//判断是否存在该元素
         boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
//获取最低高度元素的index值
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//鼠标滚动，图片加载条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	//页面中最后一个元素在页面中的高度
	var lastBox=oBoxs[oBoxs.length-1];
	//当最后一个元素已经在屏幕中出现一半的高度，则开始加载新一组图片
	var lastBoxh=lastBox.offsetBottom;
	//当前滚动条滚动距离
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	var height=document.body.clientHeight ||document.documentElement.clientHeight;
    var bottom=200+'px';
    return (lastBoxh<20+'px')?true:false;

}