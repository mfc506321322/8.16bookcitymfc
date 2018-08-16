define(['jquery'],function($){
    return function(obj){
        var ops = $.extend({},{
            tag:'span',
            classname:'active'
        },obj);
        change(ops.index);
        $(ops.parent).find(ops.tag).click(function(){
            change($(this).index());
        })
        function change(i){
            $(ops.parent).children(ops.tag).eq(i).addClass('active').siblings().removeClass(ops.classname);
        }
    }
});