// pages/production/cropper/cropper.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productionType: 1,
    imageSize:{
      C:[
        [250, 150],
        [300, 200],
        [80, 80]
      ],
      B:[
        [250, 250],
        [250, 250]
      ]
    }
  },

  /**
   * 设置跳转过来的页面类型
   */
  onLoad: function (options) {
    var type = options.type;
    var size = [];
    var production = 1;
    if (app.globalData.production === 'C'){
      size = this.data.imageSize.C;
    }else {
      size = this.data.imageSize.B;
      production = 0;
    }
    this.setData({
      imageType: type,
      size: size,
      openId: app.globalData.openId,
      productionType: production
    })
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.imgReset();
  },

  cropperload(e) {
    console.log('cropper加载完成');
  },
  loadimage(e){
    wx.hideLoading();
    console.log('图片');
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //图片预览
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  upload(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
      }
    })
  },

  submit(){
    var that = this;
    this.cropper.getImg((obj)=>{
      wx.uploadFile({
        filePath: obj.url,
        name: 'file',
        url: 'https://cgo.culturecompute.com:8088/uploadImage',
        formData:{
          openId: that.data.openId,
          subjectType: app.globalData.theme,
          productionType: that.data.productionType,
          imageType: that.data.imageType,
          preName: "image.png"
        }
      })
      var pages = getCurrentPages();
      var before = pages[pages.length - 2];
      wx.navigateBack({
        delta: -1,
        success:function(){
          before.refreshAfterCrop();
        }
      })
    });
  },

  back: function() {
    wx.navigateBack({
      delta: -1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})