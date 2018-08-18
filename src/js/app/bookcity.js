define(['jquery','tab','get','template','swiper'],function($,table,get,temp,Swiper){
    function gethtml(url){
        var str = '';
        get(url,function(html){
            str = html;
        })
        return str;
    }
    function chengViews(html,data,parent){
        $(parent).parent().find('.change-btn').on('click',function(){
            var n = $(this).attr('data-page');
            n++;
            var len = data.length;
            var pagesize = Math.ceil(len/5);
            n = n % pagesize;
            $(this).attr('data-page',n);
            temp(html,data.slice(n*5,n*5+5),parent);
        })
    }
    function scrollload(pagenum,nshtml){
        pagenum++;
        if(pagenum>=4){
            $('.loading').html('已经到底啦!٩(๑>◡<๑)۶ ');
            return false;
        }
        var clientH = $('body').height();
        $('.main').on('scroll',function(){
            var loadT = $('.loading').offset().top;
            if(loadT<clientH){
                $(this).off('scroll');
                get('/api/bookcityLoad?pagenum='+pagenum,function(data){
                    var data = JSON.parse(data);
                    temp(nshtml,data.items,'.load-cont','scroll');
                    scrollload(pagenum,nshtml);
                })
            }
        })
    }
    return function(info){
        table.tab({
            parent:'.tab',
            tag:'a',
            index:info.index
        })
        get(info.url,function(data){
            var data = JSON.parse(data);
            temp(info.context,data.items[0],'.main');
            new Swiper('.banner',{
                loop:true,
                autoplay:true
            });
            //本周最火
            var dlhtml = gethtml('/views/dl.html');
            temp(dlhtml,data.items[1].data,'.hotlist');
            //重磅推荐
            var zbData = data.items[2].data.data;
            var zbhtml = gethtml('/views/tuijian.html');
            temp(zbhtml,zbData.slice(0,5),'.zb-cont');
            chengViews(zbhtml,zbData,'.zb-cont');
            //女生最爱
            var nsData = data.items[3].data.data;
            var nshtml = gethtml('/views/imginfo.html');
            temp(nshtml,nsData.slice(0,5),'.ns-cont');
            chengViews(nshtml,nsData,'.ns-cont');
            //男生最爱
            var manData = data.items[4].data.data;
            temp(nshtml,manData.slice(0,5),'.man-cont');
            chengViews(nshtml,manData,'.man-cont');
            //限时免费
            var freeData = data.items[5].data;
            temp(dlhtml,freeData,'.freelist');
            var pagenum = 0;
            scrollload(pagenum,nshtml);
        });
    }
})