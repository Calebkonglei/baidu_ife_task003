function g(id) {
    return document.getElementById(id);
}

//创建下拉列表并将初始值设为当前日期
function selectBox() {
    var disYear = g("disYear");
    var disMonth = g("disMonth");
    for (var i = 1950; i < 2050; i++) {
        var optionYear = document.createElement("option");
        optionYear.value = String(i);
        var optionYearText = document.createTextNode(String(i) + "年");
        optionYear.appendChild(optionYearText);
        disYear.appendChild(optionYear);
    }
    for (var j = 0; j < 12; j++) {
        var optionMonth = document.createElement("option");
        optionMonth.value = String(j);
        var optionMonthText = document.createTextNode(String(j+1) + "月");
        optionMonth.appendChild(optionMonthText);
        disMonth.appendChild(optionMonth);
    }
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    currentMonth = (currentMonth < 10) ? ("0" + currentMonth) : currentMonth;
    disYear.value = currentYear;
    disMonth.value = currentDate.getMonth();
    g("myText").value = currentYear + "年" + currentMonth + "月";
}

//创建日历主体
function buildTable() {
    var myTable = g("myTable");
    var tableHead = document.createElement("thead");
    tableHead.id = "myTableHead";
    var week = ["日", "一", "二", "三", "四", "五", "六"];
    var tableTr = document.createElement("tr");

    for (var i = 0; i < 7; i++) {
        var tableTh = document.createElement("th");
        var tableThText = document.createTextNode(week[i]);
        tableTh.appendChild(tableThText);
        tableTr.appendChild(tableTh);
    }
    tableHead.appendChild(tableTr);
    myTable.appendChild(tableHead);
    
    var tableBody = document.createElement("tbody");
    tableBody.id = "myTableBody";
    for (var j = 0; j < 6; j++) {
        var tableTr = document.createElement("tr");
        for (var k = 0; k < 7; k++) {
            var tableTd = document.createElement("td");
            tableTr.appendChild(tableTd);
        }
        tableBody.appendChild(tableTr);
    }
    myTable.appendChild(tableBody);
}


//确定某个月的第一天是星期几
function getWeek() {
    var yearMonth = new Date();
    var disYear = g("disYear").value;
    var disMonth = g("disMonth").value;
    yearMonth.setFullYear(disYear, disMonth, 1);
    var selectDay = yearMonth.getDay();
    return selectDay;
}

//确定一个月有多少天
function getdate() {
    var disYear = parseInt(g("disYear").value);
    var naturalMonth = parseInt(g("disMonth").value) + 1;
    if(naturalMonth==1||naturalMonth==3||naturalMonth==5||naturalMonth==7||naturalMonth==8||naturalMonth==10||naturalMonth==12){
        return 31;
    } else if (naturalMonth == 4 || naturalMonth == 6 || naturalMonth == 9 || naturalMonth == 11) {
        return 30;
    } else if ((disYear % 100 != 0 && disYear % 4 == 0) || disYear % 400 == 0) {
        return 29;
    } else {
        return 28;
    }
}



//给日历内写入日期
function buildDate() {
    var weekday = getWeek();
    var date = 1;
    var tableTds = document.getElementsByTagName("td");
    var dateNum = getdate();
    //清空日历
    for (var i = 0; i < tableTds.length; i++) {
        if (tableTds[i].firstChild) {
            tableTds[i].removeChild(tableTds[i].firstChild);
        }
    }
    //重写日历
    for (var m = 0; m < dateNum; m++) {
        var tableTdText = document.createTextNode(date);
        tableTds[weekday].appendChild(tableTdText);
        weekday++;
        date++;
    }
}

//选取下拉列表时刷新日历主体与页面头部 "xxxx年xx月xx日" 字样
function refreshTable() {
    g("selectBox").onclick = function () {
        buildDate();
        var disYear = g("disYear").value;
        var disMonth = parseInt(g("disMonth").value) + 1;
        disMonth = disMonth < 10 ? "0" + disMonth : disMonth;
        g("myText").value = disYear + "年" + disMonth + "月";
    }
}

//点击日历主体选取日期时刷新页面头部 "xxxx年xx月xx日" 字样
function showDate() {
    g("myTableBody").onclick = function (event) {
        var disYear = parseInt(g("disYear").value);
        var disMonth = parseInt(g("disMonth").value) + 1;
        disMonth = disMonth < 10 ? "0" + disMonth : disMonth;
        if (event.target.firstChild) {
            var disDate = event.target.firstChild.nodeValue;
            var selectDate = new Date();
            selectDate.setFullYear(disYear, disMonth - 1, disDate);
            var disDay = selectDate.getDay();
            disDate = disDate < 10 ? "0" + disDate : disDate;
            var week = ["日", "一", "二", "三", "四", "五", "六"];
            g("myText").value = disYear + "年" + disMonth + "月" + disDate + "日 星期" + week[disDay];
        }
        setTimeout(function () { g("calendar").style.display = "none"; }, 800);
    }
    
}

//点击文本框显示日历,选择日期后隐藏日历
function showCalendar() {
    g("calendar").style.display = "none";
    g("myText").onclick = function () {
        if (g("calendar").style.display == "none") {
            g("calendar").style.display = "block";
        } else {
            g("calendar").style.display = "none";
        }
    }
    
    
}

window.onload = function () {
    selectBox();
    buildTable();
    buildDate();
    refreshTable();
    showDate();
    showCalendar();
}