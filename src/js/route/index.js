define(['page','index'],function(page,init){
    page('*',init.start);
    page('/','/index/bookcity');
    page('/index/bookcity',init.bookcity);
    page('/index/bookshelf',init.bookshelf);
    page('/page/detail/:pageid',init.detail);
    page('*',init.render);
    page();
})