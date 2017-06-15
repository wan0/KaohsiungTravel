/* get JSON data */
var data = []; //data先宣告成陣列
//var data; 資料存入，typeof(data)會自動判斷為Object
var dataJSON;
var dataNum;
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://github.com/wan0/KaohsiungTravel/tree/master/js/data.json', true);
xhr.send(null);
xhr.onload = function () {
    if (xhr.status == 200) {
        dataJSON = JSON.parse(xhr.responseText);
        data = dataJSON.result.records;
        dataNum = data.length; //防止資料還沒抓取完就將data.length存入，dataNum = 0
    }else {
        console.log('fail');
    }
}