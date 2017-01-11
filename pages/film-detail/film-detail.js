var http = require('../../utils/http');
var config = require('../../common/js/config');

Page({
    data:{
        detail:{},
        casts:[]
    },
    onLoad:function(props){
        var that =this;
        var filmId = props.filmId;
        var url = config.url_film_detail+filmId;
        http.get.call(that,url,{},true,function(res){
            console.log(res);
            that.setData({
                detail:res.data,
                casts:res.data.directors.concat(res.data.casts)
            });
        });
    }
})