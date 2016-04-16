var table=document.getElementById('tab');
var title=document.getElementById("title");
var th = document.getElementsByTagName( 'th' );
//构造函数模式==========================================

function Student(name,chinese,math,english){
	this.name=name;
	this.chinese=chinese;
	this.math=math;
	this.english=english;
	this.total=chinese+math+english;
};
var data=[];
data[0] = new Student("小明", 80, 90, 70);
data[1] = new Student("小红", 90, 60, 90);
data[2] = new Student("小亮", 60, 100, 70);

//渲染表格
function renderTable(data){
	 for(var i = 0; i < data.length; i++){
    var row = "<tr><td>" + data[i].name + "</td><td>" + data[i].chinese + "</td><td>" + data[i].math +"</td><td>" + data[i].english + "</td><td>" + data[i].total + "</td></tr>";
    table.innerHTML += row;
	}
};


//运用多态机制实现数据的排序=================================
// var topSort={//向上排序
// 	pai:function(data,tip){
//         data.sort(function(pre,next){
//    	    return pre[tip]-next[tip];
// 	})
//     }
// }


// var bottomSort={//向下排序
// 	pai:function(data,tip){
// 		data.sort(function(pre,next){
//    	    return next[tip]-pre[tip];
// 	})
// }
// }

//排序
//按照某项成绩从小到大排序
function upSort(data){
  data.sort(function(a, b){
    return a - b;
  });
  return data;
}
//按照某项成绩从大到小排序
function downSort(data, tip){
  data.sort(function(a, b){
    return b[tip] - a[tip];
  });
  return data;
}
// var sortData=function(type){
// 	if(type.sort instanceof Function){
// 		type.pai();
// 	}
// }
//  sortData(topSort)======================================
//每次排序清除表中数据

function deleteTab(table){
  var len=table.rows.length;
  for(var i=1;i<len;i++){
  	table.deleteRow(1);
  }
}
//闭包

	// for(var i=1;i<th.length;i++){
	// 	(function(i){
	// 		th[i].onclick=function(){
	// 			deleteTab(table);

	// 			upSort(data,i);
				
	// 		}
	// 	})(i);
	// }


	var flag={
		 "chinese": true,
         "math": true,
         "english": true,
         "total": true
	};
function tdClick(){

	table.onclick=function(event){
		event=event||window.event;
		var target=event.target||event.srcElement;

		if(target.tagName.toLowerCase()==="th"){
			if(flag[target.id]!==true){
				upSort(data,target.id);
			}else{
                downSort(data,target.id);
			}
			deleteTab(table);
			renderTable(data);
			flag[target.id]=!flag[target.id];
		}
	}
}
renderTable(data);
window.onload=function(){upSort(data);}
tdClick();

