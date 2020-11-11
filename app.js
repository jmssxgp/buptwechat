//app.js
/**
 * 页面改动：2019.2.28 新增需求
 * 添加一个独立的主题6《多彩民族风》
 * 产品类型新增取值N
 */
App({
  onLaunch: function() {
    // 转发群
    wx.showShareMenu({
      withShareTicket: true
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // console.log("onLaunch")
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            // 自己服务器的接口
            url: 'https://cgo.culturecompute.com:8088/mini/getOpenId',
            method: 'GET',
            // 传code至后台
            // 请求参数
            data: {
              code: res.code
            },
            // 登录成功 返回json对象

            success: function(res) {
              getApp().globalData.openId = res.data.openId;
              console.log('*************用户openId：' + getApp().globalData.openId)
            },
            fail: function(res) {
              console.log('*************openId获取失败');
              // 带确认按钮的提示弹窗
              // wx.showModal({
              //   title: '提示',
              //   content: '网络状态不好，请重试！！！',
              //   showCancel: false,
              //   confirmText: "重新加载",
              //   success: function(res) {
              //     if (res.confirm) { //这里是点击了确定以后
              //       // console.log('用户点击确定')
              //     } else { //这里是点击了取消以后
              //       // console.log('用户点击取消')
              //     }
              //   }
              // })
            }
          })

        } else {
          // res.errMsg错误信息 没有获取到微信的code
          console.log('获取用户登录态失败！')
        }
      }
    })

    // 获取用户信息 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    // 产品类型 取值范围 C（披肩）、B（布包）、N（多彩民族风）
    production: "",
    // 主题序号 取值范围 1-6
    theme: 0,
    //服务器图片root路径
    rootURL: "https://vrwbg-1256403542.image.myqcloud.com/mini/data/",
    //用户自定义图片root路径
    customRoot: "https://cgo.culturecompute.com:8088/mini/image_custom/",
    //rootURL: "https://www.vrwbg.com:8080/mini/data/",
    //rootURL: "https://www.vrwbg.com:8080/mini/image_resources/",
    // rootURL: "https://cgo.culturecompute.com:8088/mini/image_resources/",
    // openId
    openId: "",
    //结果root路径
    rURL: "https://cgo.culturecompute.com:8088/mini/image_results/",
    //结果参数
    cc_name: "", //地毯参数记录
    ce_name: "",
    cm_name: "",
    bp_name: "", //布包参数记录
    bc_name: "",
    np_name:"", // 民族参数记录
    nc_name:"",
    rNameUrl: "", //结果图路径记录
    bagNoColorUrl: "", //布包没有选择色块的图片路径记录
    is_return: false, //判断重新加载的元素界面是否是由解雇页面返回的
    //元素页面元素选择记录
    selectce: -1, //选择图片记录(默认不选)
    selectcm: 0, //默认第一个
    selectcc: -1,
    selectbp: 0, //默认第一个
    selectbc: -1,
    successRimg: false, //点击自动按钮，获取结果图片成功
    
    // 记录民族主题布包上的图标URL
    nationalIcons:[
      "","","","",
      "","","",""
    ],
    nselectImg:"https://vrwbg-1256403542.image.myqcloud.com/mini/data/N06MI010.png",
  },


  // 页面转发按钮
  onShareAppMessage: function() {
    return {
      // title: '自定义分享标题',    
      title: '',
      // desc: '自定义分享描述',
      desc: '',
      // path: '/page/user?id=123'  【小程序分享页面的路径 （目前该路径'/page/user?id=123'是指代的用户id）】
      path: '/page/user?id=123',
      // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5: 4
      imageUrl: '',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        // 如果这里有 shareTickets，则说明是分享到群的
        console.log(res.shareTickets)
        // var shareTickets = res.shareTickets;
        // if (shareTickets.length == 0) {
        //   return false;
        // }
        // //可以获取群组信息
        // wx.getShareInfo({
        //   shareTicket: shareTickets[0],
        //   success: function(res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

})