var http = require('../../utils/http');
var config = require('../../common/js/config');

Page({
    data:{
        detail:{},
        casts:[],
        filmId:'',
        popoverHeight:200,
        popoverWidth:500,
        popoverTop:0,
        popoverLeft:0,
        isPopoverShow:false,
        celebrity:{}
    },
    loadData:function(){
        var {filmId} = this.data;
        var that =this;
        var url = config.url_film_detail+filmId;
        http.get.call(that,url,{},true,function(res){
             console.log(res);
            that.setData({
                detail:res.data,
                casts:res.data.directors.concat(res.data.casts)
            });
            wx.stopPullDownRefresh();
        });
    },
    onLoad:function(props){
        var filmId = props.filmId;
        this.setData({filmId});
        this.loadData();
    },
    onShow:function(){
        var that = this;
        var {popoverHeight,popoverWidth} = that.data;
        wx.getSystemInfo({
            success: function(res) {
               var top =  (res.windowHeight*2 - popoverHeight)*0.5;
               var left =  (res.windowWidth*2 - popoverWidth)*0.5;
                that.setData({
                    popoverTop: top,
                    popoverLeft:left
                });
            }
        })
    },
    onPullDownRefresh: function () {
      this.loadData();
    },
    celebrityTap:function(e){
        var that = this;
        var celebrityId = e.currentTarget.dataset.celebrityId;
        var url = config.url_celebrity_detail+celebrityId;
        http.get.call(that,url,{},true,function(res){
             console.log(res);
            that.setData({
                celebrity:res.data,
                isPopoverShow:true
            });
        });
        
    },
    togglePopover:function(){
        var {isPopoverShow} = this.data;
        this.setData({isPopoverShow:!isPopoverShow});
    }
})