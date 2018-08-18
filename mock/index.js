var bookcity = require('./index/home');
var bookshelf = require('./index/recommend1');
var page2 = require('./index/recommend2');
var page3 = require('./index/recommend3');
var detail = require('./detail/352876');
var read1 = require('./reader/data1');
var read2 = require('./reader/data2');
var read3 = require('./reader/data3');
var read4 = require('./reader/data4');
var chapter = require('./reader/chapter-list');
var searchKey = require('./search/searchKey');
var search = require('./search/search');

var data = {
    '/api/bookcity': bookcity,
    '/api/bookshelf': bookshelf,
    '/api/bookcityLoad?pagenum=1': bookshelf,
    '/api/bookcityLoad?pagenum=2': page2,
    '/api/bookcityLoad?pagenum=3': page3,
    '/api/detail?id=352876': detail,
    '/api/read?bookid=352876&char=1':read1,
    '/api/read?bookid=352876&char=2':read2,
    '/api/read?bookid=352876&char=3':read3,
    '/api/read?bookid=352876&char=4':read4,
    '/api/chapter?bookid=352876':chapter,
    '/api/hotkey':searchKey
}
module.exports = function(url) {
    var url = decodeURI(url);
    if(url.match('search')){
        var key = url.split('=')[1];
        var target = [];
        search.items.forEach(function(item){
            if(item.title.match(key)){
                target.push(item);
            }
        })
        return JSON.stringify(target);
    }
    else{
        return JSON.stringify(data[url]);
    }
}