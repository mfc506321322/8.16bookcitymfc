define(['jquery','handlebars'],function($,hand){
    hand.registerHelper('num',function(item){
        return item == 0 ? 1 : '0' + (item+1);
    })
    hand.registerHelper('wordCount',function(item){
        return (item/10000).toFixed(1);
    })
    return function(html,data,el,flag){
        var setData = hand.compile(html);
        if(flag){
            $(el).append(setData(data))
        }else{
            $(el).html(setData(data))
        }
    }
})