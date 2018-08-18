define([
    'jquery',
    'get',
    'template',
    'tab'
], function($,get,temp,table) {
    return function(info){
        table.pageTab('.search');
        $('.search').html(info.context);
        get(info.url,function(data){
            var json = JSON.parse(data);
            get('/views/tag-tpl.html',function(html){
                temp(html,json.ads,'.hotkey');
            })
            $('.search').on('click','.sear_btn',function(){
                var val = $('.sear label>input').val().trim();
                if(!val){
                    alert('输入内容为空');
                }else{
                    searchFun(val);
                }
            })
            var storage = window.localStorage,
            historyArr = JSON.parse(storage.getItem('history')) || [];
            if(historyArr.length>0){
                renderHistory(historyArr);
            }
            function renderHistory(historyArr){
                console.log(historyArr);
                get('/views/tag-tpl.html',function(html){
                    temp(html,historyArr,'.history');
                })
            }
            function searchFun(val){
                get('/api/search?key='+val,function(data2){
                    $('.search_list').show();
                    $('.tag_wrap').hide();
                    var ishas = historyArr.some(function(item){
                        return item.ad_name == val;
                    })
                    if(!ishas){
                        historyArr.push({ad_name:val});
                    }
                    renderHistory(historyArr);
                    storage.setItem('history',JSON.stringify(historyArr));
                    var json2 = JSON.parse(data2);
                    if(json2.length==0){
                        $('.search_list').html('<p class="none">没有匹配内容</p>')
                    }else{
                        get('/views/imginfo.html',function(html){
                            temp(html,json2,'.search_list');
                        })
                    }
                })
            }
            $('.sear label>input').on('input',function(){
                var val = $(this).val().trim();
                if(!val){
                    $('.tag_wrap').show();
                    $('.search_list').hide();
                }
            })

            $('.type_tag').on('click','li',function(){
                console.log(1);
                var text = $(this).text();
                $('.sear label>input').val(text);
                searchFun(text);
            })
        })
    }
})