var message = require('../components/widgets/message/message')

module.exports = {
    get:function(url,data,hasMore,successCb,failCb){
        if(hasMore){
        var that = this;
        wx.showToast({
                title: '玩命加载中...',
                icon: 'loading',
                duration: 10000
            });
        wx.request({
                url: url,
                data: data,
                method: 'GET',
                header: {
                    "Content-Type": "application/json,application/json"
                },
                success: function (res) {
                    !!successCb && successCb(res);
                },
                 fail: function () {
                     !!failCb && failCb();
                    message.show.call(that, {
                        content: '网络不给力啊',
                        icon: 'warning',
                        duration: 3000
                    })
                },
                complete: function () {
                    wx.hideToast()
                }
        });
         }
    }
}