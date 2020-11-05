// pages/production/carpet.js
var app = getApp()
const utilApi = require('../../../utils/util.js')
const contextC = wx.createCanvasContext('canvasC')
const contextB = wx.createCanvasContext('canvasB')
const contextN = wx.createCanvasContext('canvasN')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rimg: '',
    Bagimg: app.globalData.rootURL + "UGKP0002.png",
    imgformat: "",
    returnimg: app.globalData.rootURL + "USTT0501.png",
    // 实验室logo：
    logoimg: app.globalData.rootURL + "USKP0501.png",
    // 北邮和中央民族大学logo：
    // logoimg:'https://wxhanfu-1252521638.cos.ap-chengdu.myqcloud.com/diyweapp/result/USKP0501.png',
    tipimg: '',
    h: 0, // 动态获取到的屏幕展示高度
    r: 0, // 相对iphone6的相对单位
    // 系统屏幕参数
    windowWidth: 0,
    windowHeight: 0,
    pixelRatio: 0,
    centerh: "",
    textimg: [],
    txtURL: "UDKT",
    // 画布背景高px
    canvasHeight: 0,
  },
  /**
   * 结果页面顶部返回按钮回调函数
   */
  returnTap: function() {
    //由结果页面返回元素界面
    app.globalData.is_return = true;

    wx.reLaunch({
      url: '../element/element'
    })
  },
  /**
   * 长按保存画布及原图至手机相册
   */
  longtap: function() {
    var canvasId = 'canvasC';
    if (app.globalData.production === 'B') {
      canvasId = 'canvasB';
    }
    if(app.globalData.production === 'N'){
      canvasId = 'canvasN';
    }
    // 将画布保存至临时文件
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      fileType: 'jpg',
      quality: 1,
      success: function(res) {
        // 保存画布内容至相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功！',
              icon: 'success',
              duration: 1500,
            })
          }
        })
      }
    }, this)
    // 布包可以直接点完成，可以不选颜色这里需要判断
    if(app.globalData.production != 'N'){

      var url = "";
      if (app.globalData.bc_name === "" && app.globalData.production === 'B') {
        url = app.globalData.bagNoColorUrl
      } else {
        url = app.globalData.rNameUrl;
      }
      utilApi.downloadimgPromise(url)
        .then(res => {
          // 保存结果图至相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
          })
        });
    }

  },

  /**
   * 生命周期函数
   * 监听页面加载
   * 在页面加载时完成绘图功能
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    wx.showToast({
      title: '正在绘图，请稍等！！！',
      icon: 'none',
      duration: 2000 //持续的时间
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    this.data.windowHeight = wx.getSystemInfoSync().windowHeight;
    this.data.windowWidth = wx.getSystemInfoSync().windowWidth;
    this.data.pixelRatio = wx.getSystemInfoSync().pixelRatio;
    console.log("设备屏幕信息:" + this.data.windowHeight + "-" + this.data.windowWidth + "-" + this.data.pixelRatio);
    this.data.h = 750 * this.data.windowHeight / this.data.windowWidth;
    //相对单位，相对iPhone6的375px尺寸
    this.data.r = this.data.windowWidth / 375;
    this.setData({
      // 60-顶部返回 80-长按提示 logo-120
      centerh: this.data.h - 60 - 80 - 80,
      production: app.globalData.production
    })

    switch (app.globalData.theme) {
      case 1:
        this.data.tURL = "01"
        break;
      case 2:
        this.data.tURL = "02"
        break;
      case 3:
        this.data.tURL = "03"
        break;
      case 4:
        this.data.tURL = "04"
        break;
      case 5:
        this.data.tURL = "05"
        break;
      default:
        break;
    }
    this.data.textimg = [
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "01.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "02.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "03.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "04.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "05.png",
    ];
    //console.log("选择的文字图片路径：" + this.data.textimg[Math.floor(Math.random() * this.data.textimg.length)]);
    // 披肩（地毯）结果页面画布逻辑
    if (app.globalData.production === "C") {
      this.setData({
        tipimg: app.globalData.rootURL + "USKT0502.png"
      })
      this.data.imgformat = ".png";
      var that = this;
      // 计算高度自适应
      // TODO 针对平板等设备的自适应
      var proy = (this.data.windowHeight - 30 - 40 - 40 - 375) / 2;
      var prox = (this.data.windowWidth - 250) / 2
      var txty = proy + 375;
      proy = proy / 2;
      utilApi.downloadimgPromise(app.globalData.rNameUrl)
        .then(res => {
          // 画画布背景(灰色)
          // contextC.setFillStyle('#e0e0e0');
          contextC.fillStyle = "#e0e0e0";
          // 设置一个很大的值可以自动填满画布区域做背景
          contextC.fillRect(0, 0, this.data.windowWidth, 10000);
          // 画结果图 
          contextC.save();
          contextC.translate((prox + 250 / 2), (proy + 375 / 2));
          contextC.rotate(90 * Math.PI / 180);
          contextC.drawImage(res.tempFilePath, (-375 / 2), (-250 / 2), 375, 250);
          contextC.restore();

          utilApi.downloadimgPromise(that.data.textimg[Math.floor(Math.random() * that.data.textimg.length)])
            .then(res => {
              // 画文字图片
              contextC.drawImage(res.tempFilePath, prox, txty, 250, 35);
              contextC.draw();
            });
        });

    }
    // 布包结果页面画布逻辑 三层回调 保证绘图顺序
    if (app.globalData.production === 'B') {
      this.setData({
        tipimg: app.globalData.rootURL + "USKT0501.png"
      })
      this.data.imgformat = ".jpg";

      // 默认文字图片高70rpx，包高750rpx，间隙20rpx
      var bagx, bagy, bagw, bagh;
      var txtx, txty, txtw, txth;
      var prox, proy, prow;
      var that = this;
      if (this.data.centerh > (750 + 70 + 20)) {
        bagw = 500 / 2 * that.data.r;
        bagh = 750 / 2 * that.data.r;
        //750rpx为微信默认iPhone6宽
        bagx = (750 - 500) / 2 / 2 * that.data.r;
        bagy = (this.data.centerh - 750 - 70 - 20) / 2 / 2 * that.data.r;
        txtw = 500 / 2 * that.data.r;
        txth = 70 / 2 * that.data.r;
        txtx = (750 - 500) / 2 / 2 * that.data.r;
        txty = ((this.data.centerh - 750 - 70 - 20) / 2 + 750 + 20) / 2 * that.data.r;
        //结果图宽400rpx，包身高576rpx（比为4.6的5.3----结果图偏上）
        prow = 400 / 2 * that.data.r;
        prox = (750 - 400) / 2 / 2 * that.data.r;
        proy = ((this.data.centerh - 750 - 70 - 20) / 2 + 750 - 576 + (576 - 400) / 2) / 2 * that.data.r;
      } else {
        // 文字图片高42rpx，包高600rpx，间隙20rpx
        bagw = 400 / 2 * that.data.r;
        bagh = 600 / 2 * that.data.r;
        //750rpx为微信默认iPhone6宽
        bagx = (750 - 400) / 2 / 2 * that.data.r;
        bagy = (this.data.centerh - 600 - 56 - 20) / 2 / 2 * that.data.r;
        txtw = 400 / 2 * that.data.r;
        txth = 56 / 2 * that.data.r;
        txtx = (750 - 400) / 2 / 2 * that.data.r;
        txty = ((this.data.centerh - 600 - 56 - 20) / 2 + 600 + 20) / 2 * that.data.r;
        //结果图宽320rpx,包身高460rpx
        prow = 320 / 2 * that.data.r;
        prox = (750 - 320) / 2 / 2 * that.data.r;
        proy = ((this.data.centerh - 600 - 56 - 20) / 2 + 600 - 460 + (460 - 320) / 2) / 2 * that.data.r;
      }

      utilApi.downloadimgPromise(that.data.Bagimg)
        // 使用.then处理结果
        .then(res => {
          //画画布背景(灰色)
          // contextB.setFillStyle('#e0e0e0');//此接口要废弃
          contextB.fillStyle = "#e0e0e0";
          contextB.fillRect(0, 0, that.data.windowWidth, 10000);
          // 画背景包（宽500rpx；高750rpx）
          contextB.drawImage(res.tempFilePath, bagx, bagy, bagw, bagh);

          utilApi.downloadimgPromise(that.data.textimg[Math.floor(Math.random() * that.data.textimg.length)])
            // 使用.then处理结果
            .then(res => {
              // 画文字图片
              contextB.drawImage(res.tempFilePath, txtx, txty, txtw, txth);
              if (app.globalData.bc_name == "") {

                utilApi.downloadimgPromise(app.globalData.bagNoColorUrl)
                  .then(res => {
                    // 画结果图
                    contextB.drawImage(res.tempFilePath, prox, proy, prow, prow);
                    contextB.draw();
                  });

              } else {

                utilApi.downloadimgPromise(app.globalData.rNameUrl)
                  .then(res => {
                    // 画结果图
                    contextB.drawImage(res.tempFilePath, prox, proy, prow, prow);
                    contextB.draw();
                  });
              }
            });
        });
    }

    if (app.globalData.production === 'N') {
      this.setData({
        tipimg: app.globalData.rootURL + "USKT0503.png"
      })
      this.data.imgformat = ".jpg";

      // 默认文字图片高70rpx，包高750rpx，间隙20rpx
      var bagx, bagy, bagw, bagh;
      var prox, proy, prow;
      var iconsize = 24*this.data.r*0.8;
      var that = this;
      var offset = 0;
      if (this.data.centerh > (750 + 70 + 20)) {
        bagw = 750 / 2 * that.data.r;
        bagh = 861 / 2 * that.data.r;
        //750rpx为微信默认iPhone6宽
        bagx = (750 - 750) / 2 / 2 * that.data.r;
        bagy = (this.data.centerh - 861) / 2 / 2 * that.data.r;
        //结果图宽400rpx，包身高576rpx（比为4.6的5.3----结果图偏上）
        offset = 0;
      } else {
        // 平板设备自适应
        // 文字图片高42rpx，包高600rpx，间隙20rpx
        bagw = (750 *0.8)/ 2 * that.data.r;
        bagh = (861*0.8) / 2 * that.data.r;
        //750rpx为微信默认iPhone6宽
        bagx = (750 - 750*0.8) / 2 / 2 * that.data.r;
        bagy = (this.data.centerh - 861*0.8) / 2 / 2 * that.data.r;
        offset = -80;
      }
      console.log("绘图坐标：" + "x"+bagx+"y"+ bagy);
      utilApi.downloadimgPromise(app.globalData.nselectImg)
        // 使用.then处理结果
        .then(res => {
          //画画布背景(灰色)
          contextB.setFillStyle('#e0e0e0'); //此接口要废弃
          contextN.fillStyle = "#e0e0e0";
          contextN.fillRect(0, 0, that.data.windowWidth, 10000);
          //画背景包（宽500rpx；高750rpx）
          contextN.drawImage(res.tempFilePath, bagx, bagy, bagw, bagh);
          // 八个小图标
          // TODO 调整位置及自适应
          utilApi.downloadimgPromise(app.globalData.nationalIcons[0]).then(res => {
            // （135+5）： 改变数值x轴偏移  （304 + bagy + offset）：改变数值y轴偏移
            // 第1列图标
            contextN.drawImage(res.tempFilePath, (135+1) * that.data.r, (304 + bagy + offset) * that.data.r, iconsize, iconsize);
            utilApi.downloadimgPromise(app.globalData.nationalIcons[1]).then(res => {
              contextN.drawImage(res.tempFilePath, (135+1) * that.data.r, (331+bagy+offset) * that.data.r, iconsize, iconsize);
              utilApi.downloadimgPromise(app.globalData.nationalIcons[2]).then(res => {
                // 第2列图标
                contextN.drawImage(res.tempFilePath, (162+3) * that.data.r, (304 + bagy + offset) * that.data.r, iconsize, iconsize);
                utilApi.downloadimgPromise(app.globalData.nationalIcons[3]).then(res => {
                  contextN.drawImage(res.tempFilePath, (162+3) * that.data.r, (331 + bagy + offset) * that.data.r, iconsize, iconsize);
                  // 第2列图标
                  utilApi.downloadimgPromise(app.globalData.nationalIcons[4]).then(res => {
                    contextN.drawImage(res.tempFilePath, (189+5) * that.data.r, (304 + bagy + offset) * that.data.r, iconsize, iconsize);
                    utilApi.downloadimgPromise(app.globalData.nationalIcons[5]).then(res => {
                      contextN.drawImage(res.tempFilePath, (189+5) * that.data.r, (331 + bagy + offset) * that.data.r, iconsize, iconsize);
                      // 第2列图标
                      utilApi.downloadimgPromise(app.globalData.nationalIcons[6]).then(res => {
                        contextN.drawImage(res.tempFilePath, (216+7) * that.data.r, (304 + bagy + offset) * that.data.r, iconsize, iconsize);
                        utilApi.downloadimgPromise(app.globalData.nationalIcons[7]).then(res => {
                          contextN.drawImage(res.tempFilePath, (216+7) * that.data.r, (331 + bagy + offset) * that.data.r, iconsize, iconsize);
                          contextN.draw();
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        });
    }

    // 转发群
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // 页面转发按钮
  // onShareAppMessage: function() {
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