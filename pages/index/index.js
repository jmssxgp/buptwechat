//index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // motto: '用户授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    miniimg: app.globalData.rootURL + "gh_e4665726ae3e_430.png"
  },
  // 事件处理函数（点击跳转函数bindViewTap注册）
  bindViewTap: function() {
    if (app.globalData.openId != '') {
      wx.reLaunch({
        // url: '../logs/logs'
        // 点击跳转到动画页面
        url: '../animation/animation'
      })
    }
  },
  onLoad: function() {
    // 转发群
    // wx.showShareMenu({
    //   withShareTicket: true
    // })

    //判断openid是否获取成功
    // if (app.globalData.openId != '') {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        // motto:'用户已授权'
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '../animation/animation'
        })
      }, 1500);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          // motto: '用户已授权'
        })
        setTimeout(function() {
          wx.reLaunch({
            url: '../animation/animation'
          })
        }, 1500);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            // motto: '用户已授权'
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '../animation/animation'
            })
          }, 1500);
        }
      })
    }
    // }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      // motto: '用户已授权',
    })
    setTimeout(function() {
      wx.navigateTo({
        url: '../animation/animation'
      })
    }, 1500);
  },

  // 页面转发按钮
  // onShareAppMessage: function () {
  //   return {
  //     // title: '自定义分享标题',    
  //     title: '',
  //     // desc: '自定义分享描述',
  //     desc: '',
  //     // path: '/page/user?id=123'  【小程序分享页面的路径 （目前该路径'/page/user?id=123'是指代的用户id）】
  //     path: '/page/user?id=123',
  //     // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5: 4
  //     imageUrl: '',
  //   }
  // }
})