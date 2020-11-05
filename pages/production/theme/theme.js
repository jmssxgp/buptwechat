// pages/production/result.js
/**
 * 页面改动：2019.2.28 新增需求
 * 新增一个主题《多彩民族风》
 * 点击《多彩民族风》时跳转的页面与其他5个页面不一样
 * 其app.globalData.theme取值为6，需要单独做判断
 * 目前共6个主题
 */
const app = getApp()

/*保证是中间图案的放大*/
function chageIndex(index) {
  if (index == 5) {
    return 0;
  } else {
    return ++index;
  }
}
Page({
  /**
   * 页面数据
   */
  data: {
    // 主题图案和文字的图片资源
    imgUrls: [{
        img: app.globalData.rootURL + 'USTP0301.png',
        text: app.globalData.rootURL + 'USTT0301.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0302.png',
        text: app.globalData.rootURL + 'USTT0302.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0303.png',
        text: app.globalData.rootURL + 'USTT0303.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0304.png',
        text: app.globalData.rootURL + 'USTT0304.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0305.png',
        text: app.globalData.rootURL + 'USTT0305.png'
      },
      // TODO 新增主题图片
      {
        img: app.globalData.rootURL +'USTP0306.png',
        text: app.globalData.rootURL +'USTT0307.png'
      }
    ],
    
    // 背景图
    bkimg: app.globalData.rootURL + 'UGKP0001.png',
    
    /**
     * swiper组件设置
     * indicator-dots 是否显示面板指示点
     * autoplay 是否自动切换
     * duration 滑动动画时长
     * vertical 滑动方向是否为纵向
     */
    indicatorDots: false,
    autoplay: false,
    duration: 2000,
    vertical: true,
    swiperIndex: 1, //初始状态就让中间的图案放大
  },

  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: chageIndex(e.detail.current),
    })
  },

  // 轮播图点击事件(问题：点击任意位置均为放大主题)
  swipclick: function(e) {
    app.globalData.theme = this.data.swiperIndex + 1;
    if(app.globalData.theme == 6){
      app.globalData.production = 'N';
    }
    // wx.navigateTo({
    //   url: '../production'
    // })
  },

  // 页面初始化
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 自适应屏幕高度
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        // 高度,宽度 单位为px
        that.setData({
          // swiper-block样式 bgHeight
          bgHeight: Math.ceil(((res.windowHeight * 750)) / (res.windowWidth)),
        })
      }
    })

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