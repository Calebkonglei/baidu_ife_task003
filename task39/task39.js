var table=document.getElementById('table');
var thead=document.getElementById("thead");

var scrollEvt=function(){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var Offest=table.offsetTop-scrollTop;
	if(Offest<=0){
		thead.style.position="fixed";
		thead.style.top='0';
		if(Offest+parseInt(getComputedStyle(table).height)<=-10){
			thead.style.position="absolute"
		}

	}else{
	thead.style.position="static";
   }
}
window.onscroll=scrollEvt;

