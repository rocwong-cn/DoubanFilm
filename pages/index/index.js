//index.js
var http = require('../../utils/http');
var config = require('../../common/js/config');
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
    var {start,films,hasMore} = that.data
    var data = {
       city: config.city,
       start: start,
       count: config.count
    };
    http.post.call(that,config.url_films,data,hasMore,function(res){
      console.log(res);
      if(res && res.statusCode===200){
        if (res.data.subjects.length === 0) {
            that.setData({
              hasMore: false
              })
        } else {
          that.setData({
            films: films.concat(res.data.subjects),
            start: start + res.data.subjects.length,
            showLoading: false
          });
        }
        wx.stopPullDownRefresh();
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
        // 使用竖向滚动时，需要给<scroll-view/>一个固定高度，通过 WXSS 设置 height。
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
      this.setData({start:0});
      this.loadData();
    },
    loadMoreHandle:function(){
      this.loadData();
    }
})
