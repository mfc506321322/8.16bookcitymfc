define([
    'jquery',
    'get',
    'template',
    'tab'
], function($,get,temp,table) {
    return function(info){
        table.pageTab('.detail');
        get(info.url,function(data){
            var data = data ? JSON.parse(data) : {item:{title:'暂无数据'}};
            temp(info.context,data.item,'.detail');
            if(data.item.title == '暂无数据'){
                temp('<div>暂无数据</div>',data,'.detail>.main');
            }else{
                get('/views/detail-content.html',function(html){
                    temp(html,data,'.detail>.main');
                })
            }
        })
    }
});