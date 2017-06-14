/* get JSON data */
var data = []; //data先宣告成陣列
//var data; 資料存入，typeof(data)會自動判斷為Object
var dataJSON;
var dataNum;
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=268', true);
xhr.send(null);
xhr.onload = function () {
    dataJSON = JSON.parse(xhr.responseText);
    data = dataJSON.result.records;
    dataNum = data.length; //防止資料還沒抓取完就將data.length存入，dataNum = 0
}