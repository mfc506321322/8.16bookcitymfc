define(['jquery','tab','get','template'],function($,tab,get,temp){
    return function(info){
        tab({
            parent:'.header',
            tag:'a',
            index:info.index
        })
        console.log(info);
        get(info.url,function(data){
            var data = JSON.parse(data);
            temp(info.context,data.items[0],'.main');
        })
    }
})