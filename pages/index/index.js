//index.js
var http = require('../../utils/http');
var config = require('../../common/js/config');
var url = 'https://api.douban.com/v2/movie/in_theaters';
//获取应用实例
var app = getApp()
Page({
  data: {
    showLoading: true,
    hasMore: true,
    start: 0,
    films: [],
    windowHeight: 0
  },
  loadData:function(){
    var that = this;
    var {start,films} = that.data
    var data = {
       city: config.city,
       start: start,
       count: config.count
    };
    http.post.call(this,url,data,function(res){
      console.log(res);
      if(res && res.statusCode===200){
        wx.stopPullDownRefresh();
        that.setData({
          films: films.concat(res.data.subjects),
          start: start + res.data.subjects.length,
          showLoading: false
        });
      }
    });
  },
  onLoad: function () {
    this.loadData();
  },
  onReady: function () {
        // 页面渲染完成
  },
    onShow: function () {
        // 页面显示
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight*2
                })
            }
        })
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    onPullDownRefresh: function () {

    },
})
