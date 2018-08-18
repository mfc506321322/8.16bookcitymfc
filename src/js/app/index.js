define(['get','tab'],function(get,table){
    var init = {};
    init.start = function(ctx,next){
        table.pageTab('.index');
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
            ctx.data.index = 2;
            ctx.data.url = '/api/detail?id=' + ctx.params.pageid;
            ctx.data.script = 'detail';
            ctx.data.context = html;
            next();
        })
    }
    init.read = function(ctx,next){
        get('/views/read.html',function(html){
            ctx.data.url = `/api/read?bookid=${ctx.params.pageid}&char=1`;
            ctx.data.script = 'read';
            ctx.data.context = html;
            next();
        })
    }
    init.search = function(ctx,next){
        get('/views/search.html',function(html){
            ctx.data.url = '/api/hotkey';
            ctx.data.script = 'search';
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