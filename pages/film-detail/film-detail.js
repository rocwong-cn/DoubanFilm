var http = require('../../utils/http');
var config = require('../../common/js/config');

Page({
    data:{
        detail:{},
        casts:[],
        filmId:''
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
    onPullDownRefresh: function () {
      this.loadData();
    }
})