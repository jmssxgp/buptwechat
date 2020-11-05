// pages/production/production.js
const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    borderimg: app.globalData.rootURL + "USKP0101.png",
    returnimg: app.globalData.rootURL + "USTT0306.png",
    pro1: app.globalData.rootURL + "USTT0201.png",
    pro2: app.globalData.rootURL + "USTT0203.png",
    pro1tip: app.globalData.rootURL + "USKT0201.png",
    pro2tip: app.globalData.rootURL + "USKT0202.png",
    bkimg: app.globalData.rootURL + "UGKP0001.png",
    centertop: 0
  },

  /**
   * 披肩按钮回调
   */
  CatpetTap: function() {
    // 地毯参数
    app.globalData.production = "C";
    //顺序进入元素界面
    app.globalData.is_return = false;
    // console.log("production：" + app.globalData.production);
    
    // wx.navigateTo({
    //   url: './element/element'
    // })
  },

  /**
   * 布包按钮回调
   */
  BagTap: function() {
    // 布包参数
    app.globalData.production = "B";
    //顺序进入元素界面
    app.globalData.is_return = false;
    // console.log("production：" + app.globalData.production);

    // wx.navigateTo({
    //   url: './element/element'
    // })

  },

  /**
   * 顶部返回按钮回调
   */
  // ReturnTap: function() {
  //   wx.navigateTo({
  //     url: './theme/theme'
  //   })
  // },

  /**
   * 加载页面
   * 按钮居中自适应
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      // 高度 113rpx按钮，43rpx图片，100rpx间距
      centertop: (h - 43 * 2 - 113 * 2 - 100) / 2
    });

    // 转发群
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },
  // 监听页面初次渲染完成
  onReady: function() {
    wx.hideLoading()
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