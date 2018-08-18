define(['jquery','get','tab','base64','template'],function($,get,table,base64,temp){
    function getRead(url,info){
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data){
            var text = $.base64().decode(data);
            temp(info.context,JSON.parse(text),'.read')
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.append(script);
    }
    return function(info){
        table.pageTab('.read');
        get(info.url,function(data){
            var data = JSON.parse(data);
            getRead(data.jsonp,info);
        })
    }
})