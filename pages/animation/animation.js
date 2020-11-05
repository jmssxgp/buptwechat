//animation.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bkimg: app.globalData.rootURL + 'UGKP0001.png', //背景图片
    patternimg: app.globalData.rootURL + 'USKP0102.png',
    rippleStyle: '',
    rippleStyle1: '',
    // end: '',
    outer: '',
    // inner: '',
    flag: 1 //判断页面是否已经跳转
  },

  /* 点击屏幕回调函数(水波纹) */
  containerTap: function(res) {
    //点击跳转判断(点击多次跳转一次)
    this.data.flag++;

    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;

    setTimeout(function() {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear;'
      });
    }, 400)

    setTimeout(function() {
      that.setData({
        rippleStyle1: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.2s;'
      });
    }, 400)

    // setTimeout(function() {
    //   that.setData({
    //     rippleStyle2: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.4s;'
    //   });
    // }, 1000)

    // 点击水波，跳转事件
    if (this.data.flag == 2) {
      setTimeout(function() {
        wx.reLaunch({
          url: '../production/theme/theme'
        })
      }, 2000)
    }

  },

  //图片显示动画结束事件
  animationend: function(event) {

    if (this.data.flag == 1) {
      // setTimeout(function() {
      wx.reLaunch({
        url: '../production/theme/theme',
      })
      // }, 100)
    }

  },
  onLoad: function() {

    // setTimeout(function() {
    //   wx.showToast({
    //     title: '可单击页面跳过动画',
    //     icon: 'none',
    //     duration: 2050 //持续的时间
    //   })
    // }, 500)

    this.setData({
      outer: 'outer',
      // inner: 'inner',
    })
  }
})