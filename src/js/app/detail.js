define([
    'jquery',
    'get',
    'template'
], function($,get,temp) {
    return function(info){
        $('.index').hide();
        $('.detail').show();
        get(info.url,function(data){
            var data = data ? JSON.parse(data) : {item:{title:'暂无数据'}};
            temp(info.context,data.item,'.detail');
            if(data.item.title == '暂无数据'){
                temp('<div>暂无数据</div>',data,'.detail>.main');
            }else{
                get('/views/detail-content.html',function(html){
                    console.log(data);
                    temp(html,data,'.detail>.main');
                })
            }
        })
    }
});