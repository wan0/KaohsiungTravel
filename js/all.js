localStorage.removeItem('dataList');
var Zone = ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區', '楠梓區', '小港區', '左營區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區']
var zoneNum = Zone.length;
var dataNum = data.length;
var selectZone = document.querySelector('.selectDistricts');
var dataList = document.querySelector('.dataList');
var selectHotZone = document.querySelector('.hotDistricts');
var pageList = document.querySelector('.dataPage');
var newData = []
var newDataNum;
var pageNum;
var thisPage;
//行政區下拉選單
var str = '<option value=" ">- - 請選擇行政區域 - -</option>';
for (var i = 0; i < zoneNum; i++) {
    str += '<option value="' + Zone[i] + '">' + Zone[i] + '</option>';
}
selectZone.innerHTML = str;
//監聽
selectZone.addEventListener('change', showData);
selectHotZone.addEventListener('click', showHotData);
pageList.addEventListener('click', changePageList);
//jQuery
$(document).ready(function () {
    //Scroll to Anchor
    $('a[href="#dataList"]').on('click', function(event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: $('#dataList').offset().top
        }, 1000);
    });
    $('.top a').click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
     $('.dataPage').click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $('#dataList').offset().top
        }, 0);
    });
});
//function
//下拉選單
function showData(e) {
    localStorage.removeItem('dataList');
    e.preventDefault();
    addData(selectZone.value);
}
//熱門區
function showHotData(e) {
    localStorage.removeItem('dataList');
    e.preventDefault();
    if (e.target.nodeName !== 'LI') { return; }
    addData(e.target.title);
}
//改變目前頁數
function changePageList(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return; }
    //解決頁面點擊問題
    if (e.target.className == 'prev none' || e.target.className == 'next none') { return; }
    if (e.target.textContent == '< prev') {
        thisPage = thisPage - 1;
    } else if (e.target.textContent == 'next >') {
        thisPage = thisPage + 1;
    } else {
        thisPage = parseInt(e.target.textContent);
    }
    showPageList(thisPage);
}
//資料處理
function addData(zoneValue) {
    newData.length = 0; //清空陣列，放在此函式尾會造成點過下一頁後，其他行政區要點兩次才有作用
    //增加資料到newData
    for (var i = 0; i < dataNum; i++) {
        if (data[i].Zone === zoneValue) {
            thisData = {
                Ticketinfo: data[i].Ticketinfo,
                Zone: data[i].Zone,
                Add: data[i].Add,
                Opentime: data[i].Opentime,
                Name: data[i].Name,
                Picture1: data[i].Picture1,
                Tel: data[i].Tel
            };
            newData.push(thisData);
        }
    }
    localStorage.setItem('dataList', JSON.stringify(newData));
    thisPage = 1;
    showPageList(thisPage, zoneValue); //傳送zoneValue值!!!，讓str預設設在showDataList
}

function showDataList(starDataNum, endDataNum, zoneValue) {
    //判斷zoneValue是否undefined
    if (typeof (zoneValue == "null")) {
        zoneValue = newData[0].Zone;
    }
    //頁面顯示
    str = '<h2>' + zoneValue + '</h2>';
    for (var i = starDataNum; i < endDataNum; i++) {
        str += '<li data-index="' + i + '">' +
            //'<div class="dataPicture data' + i + '" style="background: url(' + newData[i].Picture1 + ') center center no-repeat">' +
            '<div class="dataPicture data' + i + '">' +
            '<div class="dataTitle">' +
            '<h3 class="dataName">' + newData[i].Name + '</h3>' +
            '<h4 class="dataZone">' + newData[i].Zone + '</h4>' +
            '</div>' +
            '</div>' +
            '<ul class="dataDetail">' +
            '<li class="dataOpentime"><div class="icon"></div>' + newData[i].Opentime + '</li>' +
            '<li class="dataAdd"><div class="icon"></div>' + newData[i].Add + '</li>' +
            '<li class="dataTel"><div class="icon"></div>' + newData[i].Tel + '</li>' +
            '<li class="dataTicketinfo"><div class="icon"></div>' + newData[i].Ticketinfo + '</li>' +
            '</ul>' +
            '</li>';
    }
    dataList.innerHTML = str;
    //更改背景圖
    for (var i = starDataNum; i < endDataNum; i++) {
        var imgClassName = ".data" + i;
        var changeImg = document.querySelector(imgClassName);
        changeImg.style.background = "url('" + newData[i].Picture1 + "') center center no-repeat";
    }
}

function showPageList(thisPage, zoneValue) {
    newData = JSON.parse(localStorage.getItem('dataList')) || [];
    //頁數
    newDataNum = newData.length;
    if (newDataNum > 0) {
        pageNum = Math.ceil(newDataNum / 10);
        var strPage = "";
        if (pageNum == 1) {
            strPage = '<li><a href="#" class="prev none">< prev</a></li>' +
                '<li><a href="#" class="page thisPage">1</a></li>' +
                '<li><a href="#" class="next none">next ></a></li>';
            showDataList(0, newDataNum, zoneValue);
        }
        else {
            var pageClassName = "";
            var prevPageClassName = "";
            var nextPageClassName = "";
            var starDataNum;
            var endDataNum;
            if (thisPage == 1) {
                prevPageClassName = "prev none";
                nextPageClassName = "next";
                starDataNum = 0;
                endDataNum = 10;
            } else if (thisPage == pageNum) {
                prevPageClassName = "prev";
                nextPageClassName = "next none";
                starDataNum = (thisPage - 1) * 10;
                endDataNum = newDataNum;
            } else {
                prevPageClassName = "prev";
                nextPageClassName = "next";
                starDataNum = (thisPage - 1) * 10;
                endDataNum = thisPage * 10;
            }
            strPage = '<li><a href="#" class="' + prevPageClassName + '">< prev</a></li>';
            for (var i = 1; i <= pageNum; i++) {
                if (thisPage == i) {
                    pageClassName = "page thisPage";
                } else {
                    pageClassName = "page";
                }
                strPage += '<li><a href="#" class="' + pageClassName + '">' + i + '</a></li>';
            }
            strPage += '<li><a href="#" class="' + nextPageClassName + '">next ></a></li>';
            showDataList(starDataNum, endDataNum, zoneValue);
        }
        pageList.innerHTML = strPage;
    }
    else {
        pageNum = 0;
        pageList.innerHTML = "";
    }
}