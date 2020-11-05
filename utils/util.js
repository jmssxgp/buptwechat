const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
/**
 * 获取生成的布包图片名
 * pName 图案
 * cName 颜色
 */
function requestPromiseBp(pName, cName, openId) {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    wx.request({
      data: {
        openId: openId,
        pName: pName,
        cName: cName,
      },
      url: "https://cgo.culturecompute.com:8088/mini/create-bp",
      success: res => {
        resolve(res);
        getApp().globalData.successRimg=true;
        console.log("openId:"+openId);
        console.log("pName:"+pName);
        console.log("cName:"+cName);
      },
      fail: res => {
        // wx.hideLoading();
        wx.showToast({
          title: '网络状态不好，请重试！！！',
          icon: 'none',
          duration: 4000 //持续的时间
        })
      }
    })
  })
}
/**
 * 获取生成的地毯图片名
 * cName 四角
 * eName 边框
 * mName 中心
 */
function requestPromiseCp(cName, eName, mName, openId) {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    wx.request({
      data: {
        ename: eName,
        cname: cName,
        mname: mName,
        openId: openId
      },
      url: "https://cgo.culturecompute.com:8088/mini/create-cp",
      success: res => {
        resolve(res);
        getApp().globalData.successRimg = true;
      },
      fail: res => {
        // wx.hideLoading();
        wx.showToast({
          title: '网络状态不好，请重试！！！',
          icon: 'none',
          duration: 4000 //持续的时间
        })
      }
    })
  })
}

/**
 * 下载网络图片
 * imgURL 图片路径
 */
function downloadimgPromise(imgURL) {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: imgURL,
      success: res => resolve(res),
      fail: res =>
        wx.showToast({
          title: '网络状态不好，请返回重试！！！',
          icon: 'none',
          duration: 4000 //持续的时间
        })
    })
  })
}

module.exports = {
  formatTime: formatTime,
  requestPromiseBp: requestPromiseBp,
  requestPromiseCp: requestPromiseCp,
  downloadimgPromise: downloadimgPromise
}