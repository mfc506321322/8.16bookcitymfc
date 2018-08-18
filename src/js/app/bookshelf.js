define(['jquery','tab','get','template'],function($,table,get,temp){
    return function(info){
        table.tab({
            parent:'.header',
            tag:'a',
            index:info.index
        })
        get(info.url,function(data){
            var data = JSON.parse(data);
            console.log(data.items);
            temp(info.context,data.items,'.main');
        })
    }
})