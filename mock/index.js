var bookcity = require('./index/home');
var bookshelf = require('./index/recommend1');
var page2 = require('./index/recommend2');
var page3 = require('./index/recommend3');
var detail = require('./detail/352876');
var data = {
    '/api/bookcity': bookcity,
    '/api/bookshelf': bookshelf,
    '/api/bookcityLoad?pagenum=1': bookshelf,
    '/api/bookcityLoad?pagenum=2': page2,
    '/api/bookcityLoad?pagenum=3': page3,
    '/api/detail?id=352876': detail
}
module.exports = function(url) {
    return JSON.stringify(data[url]);
}