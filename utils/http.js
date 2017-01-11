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
                    if(res.statusCode===200){
                        !!successCb && successCb(res);
                    }else{
                        message.show.call(that, {
                            content: '服务器被怪兽吃掉啦',
                            icon: 'warning',
                            duration: 3000
                        })
                    }
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