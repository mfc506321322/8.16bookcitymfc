define(['get'],function(get){
    var init = {};
    init.start = function(ctx,next){
        $('.index').show();
        $('.detail').hide();
        ctx.data = {};
        next();
    }
    init.bookcity = function(ctx,next){
        get('/views/bookcity.html',function(html){
            ctx.data.index = 0;
            ctx.data.url = '/api/bookcity';
            ctx.data.script = 'bookcity';
            ctx.data.context = html;
            next();
        })
    }
    init.bookshelf = function(ctx,next){
        get('/views/bookshelf.html',function(html){
            ctx.data.index = 1;
            ctx.data.url = '/api/bookshelf';
            ctx.data.script = 'bookshelf';
            ctx.data.context = html;
            next();
        })
    }
    init.detail = function(ctx,next){
        get('/views/detail.html',function(html){
            ctx.data.index = 1;
            ctx.data.url = '/api/detail?id=' + ctx.params.pageid;
            ctx.data.script = 'detail';
            ctx.data.context = html;
            next();
        })
    }
    init.render = function(ctx){
        require([ctx.data.script],function(cb){
            cb(ctx.data);
        })
    }
    return init;
})