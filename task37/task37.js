function $(id){
	return document.getElementById(id);
}
var submit=$('submit');
var box=$('box1');
var btnOK=$('btnOk');
var btnCanner=$('btnCanner');
var pop=$('confirm');
var h4=$('h4');
submit.onclick=function(){
   box.style.display="block"; 
}
box.onclick=function(){
	  box.style.display='none'; 
}
confirm.onclick=function(){
   box.style.display="block"; 
}
btnOK.onclick=function(){
	alert("haha");
	box.style.display='none'; 
}
btnCanner.onclick=function(){
  box.style.display='none'; 
}

//拖动

h4.onmousedown=function(e){
   e=e||window.event;
   var x=e.clientX;//鼠标移动时x轴位置
   var y=e.clientY;
   document.onmousemove=function(event){
   	event=event||window.event;
   	pop.style.left=event.clientX-x+'px';
   	pop.style.top=event.clientY-y+'px';
   }
   document.onmouseup=function(){
					document.onmousedown=null;
					document.onmousemove=null;
				}
}