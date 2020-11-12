// pages/production/element/element.js

var app = getApp()
const utilApi = require('../../../utils/util.js')

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}  

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0, //外面滑片
    //地毯
    carpet: [{
        "name": "主题",
        "url": app.globalData.rootURL + "USTT0408.png"
      },
      {
        "name": "边框",
        "url": app.globalData.rootURL + "USTT0401.png"
      },
      {
        "name": "角隅",
        "url": app.globalData.rootURL + "USTT0402.png"
      }
    ],
    //布包
    bag: [{
        "name": "主题",
        "url": app.globalData.rootURL + "USTT0409.png"
      },
      {
        "name": "配色",
        "url": app.globalData.rootURL + "USTT0403.png"
      }
    ],
    // 民族风
    nationality:[
      {
        "name":"布包样式",
        "url": app.globalData.rootURL+"USTT0410.png",
      }
    ],
    returnimg: app.globalData.rootURL + "UGTP0002.png",
    finishimg: app.globalData.rootURL + "UGTP0001.png",
    autoimg: '',
    Eimg: "",
    Mimg: "",
    Cimg: "",
    Rimg: "",
    is_rimg: false, //判断是否为地毯（披肩）结果图，是就添加白色背景
    Pimg: "",
    // 民族
    Nimg: app.globalData.rootURL + "N06MI010.png",
    // image URL
    pURL: "",
    tURL: "",
    eURL: "",
    imgformat: "",
    imgURL: [],
    imgName: [],
    // 民族图
    nImgURL: [
      app.globalData.rootURL + "UN06MI01.png",
      app.globalData.rootURL + "UN06MI02.png",
      app.globalData.rootURL + "UN06MI03.png",
      app.globalData.rootURL + "UN06MI04.png",
      app.globalData.rootURL + "UN06MI05.png",
      app.globalData.rootURL + "UN06MI06.png",
    ],
    nImgName: [
      app.globalData.rootURL + "N06MI010.png",
      app.globalData.rootURL + "N06MI020.png",
      app.globalData.rootURL + "N06MI030.png",
      app.globalData.rootURL + "N06MI040.png",
      app.globalData.rootURL + "N06MI050.png",
      app.globalData.rootURL + "N06MI060.png",
    ],
    nselectBackgroundImg:"",
    nationalIcons:[],
    // icon-表示小图标参数
    icon0: "",
    icon1: "",
    icon2: "",
    icon3: "",
    icon4: "",
    icon5: "",
    icon6: "",
    icon7: "",
    iconsize:0,
    iconbottom:0,
    iconoffset:0,
    // 里面滑片默认选择
    select: 0,
    drawName: "",
    showFinishbt: true, //展示完成按钮
    enablecolor: false, //自动生成颜色变换（可点击）
    // 民族布包位置
    Nimgwitdth:0,
    Nimgheight:0,
    // 图片位置
    centerheight: 0,
    Eimgwidth: 0,
    Eimgheight: 0,
    Eimgwidth: 0,
    Mimgheight: 0,
    Mimgwidth: 0,
    Cimgheight: 0,
    Cimgwidth: 0,
    //L：左 ；R：右 ；T：上 ；B：下
    CimgleftLT: 0,
    CimgtopLT: 0,
    CimgleftLB: 0,
    CimgtopLB: 0,
    CimgleftRT: 0,
    CimgtopRT: 0,
    CimgleftRB: 0,
    CimgtopRB: 0,
    Eimgwidth: 0,
    Pimgbottom: 0,
    flag: -1, //判断布包选择了色块后是否点击了自动上色
    dissatisfaction: false, //用户不满意结果，重新选择
    once_auto: 1, //自动生成按钮只可点击一次
    no_choosetip: 0, //双击配色按钮，可以取消，判断提示次数
    index_s: 0, //记录布包上一次的外面滑片的选择,默认为主题
    customSelect: -1
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）,调整披肩的角隅、边框、主题等
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });
    // 切换主题边框角隅时，更新自定义图片列表
    this.initCustomImage(this.data.indexb);
     //console.log("外部滑片indexb:" + this.data.indexb);

    if (this.data.select == 0) {
      //不带默认选择框
      this.setData({
        select: -1,
      });
    }

    if (app.globalData.production == "C") {
      // 初始化选择的第一张图片
      if (this.data.indexb == 0) {
        this.data.eURL = "M";

        this.setData({
          select: app.globalData.selectcm,
        });
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "E";

        this.setData({
          select: app.globalData.selectce,
        });

      }
      if (this.data.indexb == 2) {
        this.data.eURL = "C";

        this.setData({
          select: app.globalData.selectcc,
        });
      }
    } else {
      if (this.data.indexb == 0) {
        this.data.eURL = "P";

        this.setData({
          select: app.globalData.selectbp,
        });

        //记录布包上一次的外面滑片的选择
        this.data.index_s = 0;
      }

      //双击配色按钮可取消配色，只选择原图
      //添加判断 app.globalData.bc_name != "" ，阻止自动按钮灰色时的页面再次渲染
      //问题：从结果页面返回时，双击配色取消，自动按钮会闪动
      if (this.data.indexb == 1 && this.data.index_s == 1 && app.globalData.bc_name != "") {
        // 自动按钮颜色
        this.setData({
          enablecolor: false,
        });

        // 清空配色参数
        app.globalData.bc_name = ""
        app.globalData.selectbc = -1
      }

      if (this.data.indexb == 1) {
        this.data.eURL = "C";

        //添加判断 app.globalData.is_return ==false ，阻止从结果页面返回时重复提示
        if (this.data.no_choosetip == 0 && app.globalData.is_return == false) {
          // 提示弹窗
          // wx.showToast({
          //   title: '双击 “ 配色 ” 按钮可取消配色，只选择原图',
          //   icon: 'none',
          //   duration: 2000 //持续的时间
          // })

          // 带确认按钮的提示弹窗
          wx.showModal({
            title: '提示',
            content: '双击 “ 配色 ” 按钮可取消配色，只选择原图',
            showCancel: false, //是否显示取消按钮-----》false去掉取消按钮
            // cancelText: "否", //默认是“取消”
            // cancelColor: 'skyblue', //取消文字的颜色
            // confirmText: "是", //默认是“确定”,如果为空则没有显示
            // confirmColor: 'skyblue', //确定文字的颜色
            // success: function(res) {
            //   if (res.confirm) { //这里是点击了确定以后
            //     console.log('用户点击确定')
            //   } else { //这里是点击了取消以后
            //     console.log('用户点击取消')
            //   }
            // }
          })

          // 重置
          this.data.no_choosetip++;
        }

        this.setData({
          select: app.globalData.selectbc,
        });

        //记录布包上一次的外面滑片的选择
        this.data.index_s = 1;
      }

    }

    this.data.imgName = [
      this.data.pURL + this.data.tURL + this.data.eURL + "I01",
      this.data.pURL + this.data.tURL + this.data.eURL + "I02",
      this.data.pURL + this.data.tURL + this.data.eURL + "I03",
      this.data.pURL + this.data.tURL + this.data.eURL + "I04",
      this.data.pURL + this.data.tURL + this.data.eURL + "I05",
      this.data.pURL + this.data.tURL + this.data.eURL + "I06",
      this.data.pURL + this.data.tURL + this.data.eURL + "I07",
      this.data.pURL + this.data.tURL + this.data.eURL + "I08",
      this.data.pURL + this.data.tURL + this.data.eURL + "I09",
      this.data.pURL + this.data.tURL + this.data.eURL + "I10",
    ]

    // 切换主题、角隅、边框时，获得新的图片列表
    this.setData({
      imgURL: [
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09.png",
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10.png",
      ]
    })

    // console.log("事件点击加载获取图片路径：" + this.data.imgURL);
    // console.log("图片名称：" + this.data.imgName[0]);
  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function() {
    return false;
  },

  swipclick: function(e) {

    //记录布包上一次的外面滑片的选择
    this.data.index_s = 0;
    
    this.setData({
      select: e.currentTarget.dataset.num,
      customSelect:-1,
      Rimg: "",
      is_rimg: false,
      Pimg: app.globalData.rootURL + app.globalData.bp_name + this.data.imgformat,
      Nimg: this.data.nImgName[e.currentTarget.dataset.num],
    });
    // 多彩民族
    if(app.globalData.production === 'N'){
      // console.log("多彩")
      app.globalData.nselectImg = this.data.nImgName[e.currentTarget.dataset.num];
    }
    // console.log("select里面滑片:" + this.data.select);

    // 用户不满意，清除数据
    if (this.data.dissatisfaction == true) {
      if (app.globalData.production == "B") {
        //用户不满意，重新选择元素，布包需要重新判断点击完成按钮的条件
        this.data.flag = -1;
      } else {
        //用户不满意，重新选择元素，地毯（披肩）需要隐藏完成按钮
        this.setData({
          showFinishbt: false,
        });
      }
      //重新判断满意度
      this.data.dissatisfaction = false;
    }

    // 初始化自动按钮点击情况
    this.data.once_auto = 1;

    var str = this.data.imgName[this.data.select];
    // 字符串去掉首位的“u”，再在末尾补0
    // 字符串长度 str.toString().length
    str = str.substr(1) + "0";
    this.data.drawName = str;

    // 披肩
    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        app.globalData.cm_name = this.data.drawName;
        // console.log("滑片0 cm_name：" + app.globalData.cm_name);

        //记录选择里面滑片
        app.globalData.selectcm = this.data.select;

        //页面使用
        this.setData({
          Mimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Mimg：" + this.data.Mimg);
      }

      if (this.data.indexb == 1) {
        app.globalData.ce_name = this.data.drawName;
        // console.log("滑片1 ce_name：" + app.globalData.ce_name);

        //记录选择里面滑片
        app.globalData.selectce = this.data.select;

        this.setData({
          Eimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Eimg：" + this.data.Eimg);
      }

      if (this.data.indexb == 2) {
        app.globalData.cc_name = this.data.drawName;
        // console.log("滑片2 cc_name：" + app.globalData.cc_name);

        //记录选择里面滑片
        app.globalData.selectcc = this.data.select;

        this.setData({
          Cimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Cimg：" + this.data.Cimg);
      }
    } 
    
    if (app.globalData.production == "B")  {

      if (this.data.indexb == 0) {
        app.globalData.bp_name = this.data.drawName;
        // console.log("滑片0 bp_name：" + app.globalData.bp_name);

        //记录选择里面滑片
        app.globalData.selectbp = this.data.select;

        //布包没有选择色块的图片路径记录
        app.globalData.bagNoColorUrl = app.globalData.rootURL + this.data.drawName + this.data.imgformat;

        this.setData({
          Pimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Pimg：" + this.data.Pimg);
      }
      if (this.data.indexb == 1) {
        app.globalData.bc_name = this.data.drawName;
        // console.log("滑片1 bc_name：" + app.globalData.bc_name);

        //记录选择里面滑片
        app.globalData.selectbc = this.data.select;

      }
    }

    //判断完成度
    if (app.globalData.production == "C") {
      if (app.globalData.cc_name != "" && app.globalData.ce_name != "" && app.globalData.cm_name != "") {
        this.setData({
          enablecolor: true,
          autoimg: app.globalData.rootURL + "USTT0406.png"
        });
      } else {
        this.setData({
          enablecolor: false,
        });
      }
    } 
    
    if (app.globalData.production == "B")  {
      if (app.globalData.bp_name != "" && app.globalData.bc_name != "") {
        this.setData({
          enablecolor: true,
          autoimg: app.globalData.rootURL + "USTT0405.png"
        });
      } else {
        this.setData({
          enablecolor: false,
        });
      }
    }
    
    // TODO民族风满意度
    if(app.globalData.production == 'N'){
      this.setData({
        autoimg: app.globalData.rootURL + "USTT0411.png",
      });
    } 
  },


  //事件处理函数
  ReturnTap: function() {
    // 点击返回按钮，清空参数
    app.globalData.ce_name = "";
    app.globalData.cm_name = "";
    app.globalData.cc_name = "";
    app.globalData.bp_name = "";
    app.globalData.bc_name = "";
    // 点击返回按钮，清空选择
    app.globalData.selectce = -1; //选择图片记录(默认不选)
    app.globalData.selectcm = 0; //默认第一个
    app.globalData.selectcc = -1;
    app.globalData.selectbp = 0; //默认第一个
    app.globalData.selectbc = -1;

    if(app.globalData.production === 'B'){
      wx.reLaunch({
        url: '../production'
      })
    }

    if (app.globalData.production === 'C') {
      wx.reLaunch({
        url: '../production'
      })
    }

    if (app.globalData.production === 'N') {
      wx.reLaunch({
        url: '../theme/theme'
      })
    }

  },
  ResultTap: function() {
    if (app.globalData.bc_name == "") {

      wx.reLaunch({
        url: '../result/result'
      })
    } else {
      //判断是否可以点击完成按钮
      if (this.data.flag == 0) {
        wx.reLaunch({
          url: '../result/result'
        })
      } else {
        wx.showToast({
          title: '请先点击 “ 自动上色 ” 按钮！',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    }
  },
 //多彩民族风时的按钮
 nRandomButton:function(){
   console.log("民族风按钮");

   var length = app.globalData.nationalIcons.length;
   var noRepeatFilter = new Set();
   for (var i = 0; i < length; i++){
     var temp = 0;
     // 防止元素重复出现
     while ((noRepeatFilter.size - 1) != i){
       temp = random(0, 48);
       noRepeatFilter.add(temp);
     }

     var str = "https://vrwbg-1256403542.image.myqcloud.com/mini/data/N06PI";

     if(temp < 10){
       str = str + "00"+temp;
     }
     
     if(temp < 100 && temp >=10){
       str = str + "0" + temp;
     }

     if(temp > 100){
       str = str + temp;
     }
     app.globalData.nationalIcons[i] = str+".png";
     console.log(app.globalData.nationalIcons[i]);
   }
   
   this.setData({
     nationalIcons: app.globalData.nationalIcons,
     icon0: app.globalData.nationalIcons[0],
     icon1: app.globalData.nationalIcons[1],
     icon2: app.globalData.nationalIcons[2],
     icon3: app.globalData.nationalIcons[3],
     icon4: app.globalData.nationalIcons[4],
     icon5: app.globalData.nationalIcons[5],
     icon6: app.globalData.nationalIcons[6],
     icon7: app.globalData.nationalIcons[7],
   });
 },

  //自动生成按钮事件（变色可用）
  enablebt: function() {

    wx.showToast({
      title: '按钮暂时不可点击，请选择足够的样式使按钮变色！！！',
      icon: 'none',
      duration: 2000 //持续的时间
    })

    //判断用户是否没有直接点击完成
    this.data.dissatisfaction = true;
    // 重置布包上一次外面滑片选择记录
    this.data.index_s = 0;
    // 判断是否为二次点击
    if (this.data.enablecolor == true && this.data.once_auto >= 2) {
      wx.showToast({
        title: '图案已经存在，请选择其他样式！！！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }

    if (this.data.once_auto == 1) {

      if (this.data.enablecolor == true) {
        if (app.globalData.production == "C") {

          // wx.showToast({
          //   title: '正在自动生成。。。',
          //   icon: 'none',
          //   duration: 1500 //持续的时间
          // })

          wx.showLoading({
            title: '正在自动生成',
          })

          // console.log("cc_name, ce_name, cm_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name)
          // 获取结果图名(c,e,m,id)
          var that = this;
          utilApi.requestPromiseCp(app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.openId)
            // 使用.then处理结果
            .then(res => {
              // console.log("结果图rName：" + res.data.rName)

              // 获取结果图路径
              app.globalData.rNameUrl = app.globalData.rURL + res.data.rName + that.data.imgformat
              // 展示结果图（显示完成按钮）
              that.setData({
                showFinishbt: true,
                Rimg: app.globalData.rURL + res.data.rName + that.data.imgformat,
                is_rimg: true
              });
              // 图片加载完毕，取消提示
              if (that.data.is_rimg == true) {
                wx.hideLoading()
              }

            });

        } else {

          // wx.showToast({
          //   title: '正在自动上色。。。',
          //   icon: 'none',
          //   duration: 1500 //持续的时间
          // })

          wx.showLoading({
            title: '正在自动上色',
          })

          // 布包点击自动上色按钮，判断条件
          this.data.flag = 0;

          // console.log("bp_name, bc_name:" + app.globalData.bp_name, app.globalData.bc_name)
          // 获取结果图名(p,c,id)
          var that = this;
          utilApi.requestPromiseBp(app.globalData.bp_name, app.globalData.bc_name, app.globalData.openId)
            // 使用.then处理结果
            .then(res => {
              // console.log("结果图rName：" + res.data.rName)

              // 获取结果图路径
              app.globalData.rNameUrl = app.globalData.rURL + res.data.rName + that.data.imgformat
              // 展示结果图
              that.setData({
                Pimg: app.globalData.rURL + res.data.rName + that.data.imgformat
              });

              that.data.is_rimg = true;
              // 图片加载完毕，取消提示
              if (that.data.is_rimg == true) {
                wx.hideLoading()
              }

            });
        }
      }
      // 判断是否点击自动生成按钮（成功获取结果图，没有网络问题）
      if (app.globalData.successRimg == true) {
        this.data.once_auto++;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log("cc_name, ce_name, cm_name , bp_name , bc_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.bp_name, app.globalData.bc_name)
    // console.log("Pimg, Eimg , Mimg , Cimg:" + this.data.Pimg, this.data.Eimg, this.data.Mimg, this.data.Cimg)
    // console.log("flag , dissatisfaction，is_return:" + this.data.flag, this.data.dissatisfaction, app.globalData.is_return)

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      // 下面153rpx的83rpx的83rpx,上面的间距20rpx,上面的按钮100rpx
      centerheight: h - 153 - 83 - 83 - 20 - 100,
      // production 用于页面判断
      production: app.globalData.production
    })

    if (this.data.centerheight > 700) {
      this.setData({
        Nimgwitdth:750,
        Nimgheight:861 + 17,
        iconsize:40,
        iconoffset:0,
        iconbottom: (this.data.centerheight - 750) / 2,
        Pimgwidth: 750,
        Pimgbottom: (this.data.centerheight - 750) / 2,
        Eimgwidth: 750,
        Eimgheight: 500,
        Mimgwidth: 625 + 6,
        Mimgheight: 375 + 6, //加7偏差
        Cimgwidth: 80, //角宽度为80rpx
        //0.8*750 外面view的宽度,400为主题宽度
        //L：左 ；R：右 ；T：上 ；B：下
        CimgleftLT: (0.8 * 750 - 375) / 2 - 2,
        CimgtopLT: (this.data.centerheight - 625) / 2 - 2,
        CimgleftLB: (0.8 * 750 - 375) / 2 - 2,
        CimgtopLB: (this.data.centerheight - 625) / 2 + 625 - 80 + 4,
        //加4偏差
        CimgleftRT: (0.8 * 750 - 375) / 2 + 375 - 80 + 4,
        CimgtopRT: (this.data.centerheight - 625) / 2 - 2,
        CimgleftRB: (0.8 * 750 - 375) / 2 + 375 - 80 + 4,
        CimgtopRB: (this.data.centerheight - 625) / 2 + 625 - 80 + 4,
      })
    } else { // 平板设备
      this.setData({
        Nimgwitdth: this.data.centerheight - 20,
        Nimgheight: (861 + 17) * (this.data.centerheight - 20)/750,
        iconsize: 48 * (this.data.centerheight - 20) / 750,
        iconbottom: -50,
        iconoffset:5,
        //图片上下间隔10rpx
        Pimgwidth: this.data.centerheight - 20,
        Pimgbottom: 10,
        Eimgwidth: this.data.centerheight - 20,
        Eimgheight: (this.data.centerheight - 20) / 3 * 2,
        // 边框和主题相差100rpx
        Mimgwidth: this.data.centerheight - 20 - 100,
        Mimgheight: (this.data.centerheight - 20) / 3 * 2 - 100,
        Cimgwidth: 80, //角宽度为80rpx
        //0.8*750 外面view的宽度, (this.data.centerheight - 20) / 3 * 2 - 100 为主题宽度
        //L：左 ；R：右 ；T：上 ；B：下
        CimgleftLT: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 100)) / 2,
        CimgtopLT: (this.data.centerheight - (this.data.centerheight - 20 - 100)) / 2,
        CimgleftLB: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 100)) / 2,
        CimgtopLB: (this.data.centerheight - (this.data.centerheight - 20 - 100)) / 2 + (this.data.centerheight - 20 - 100) - 80 + 2,
        //加2偏差
        CimgleftRT: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 100)) / 2 + ((this.data.centerheight - 20) / 3 * 2 - 100) - 80 + 3,
        CimgtopRT: (this.data.centerheight - (this.data.centerheight - 20 - 100)) / 2,
        CimgleftRB: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 100)) / 2 + ((this.data.centerheight - 20) / 3 * 2 - 100) - 80 + 3,
        CimgtopRB: (this.data.centerheight - (this.data.centerheight - 20 - 100)) / 2 + (this.data.centerheight - 20 - 100) - 80 + 2,
      })
    }
    // 根据布包和披肩，有不同的图片类型后缀
    if (app.globalData.production == "C") {
      //地毯默认可跳转结果页面
      this.data.flag = 0;

      //隐藏完成按钮
      this.setData({
        showFinishbt: false,
        autoimg: app.globalData.rootURL + "USTT0407.png"
      });

      this.data.pURL = "UC";
      this.data.eURL = "M";
      this.data.imgformat = ".png";
    } else {

      this.setData({
        autoimg: app.globalData.rootURL + "USTT0404.png"
      });

      this.data.pURL = "UB";
      this.data.eURL = "P";
      this.data.imgformat = ".jpg";
    }

    if (app.globalData.production == "N"){
      this.setData({
        autoimg: app.globalData.rootURL + "USTT0411.png"
      });
    }

    // 根据所选主题调整URL
    switch (app.globalData.theme) {
      case 1:
        this.data.tURL = "01"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B01PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C01MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C01MI010'
          app.globalData.bp_name = 'B01PI010'
        }
        break;
      case 2:
        this.data.tURL = "02"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B02PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C02MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C02MI020'
          app.globalData.bp_name = 'B02PI020'
        }
        break;
      case 3:
        this.data.tURL = "03"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B03PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C03MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C03MI010'
          app.globalData.bp_name = 'B03PI010'
        }
        break;
      case 4:
        this.data.tURL = "04"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B04PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C04MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C04MI010'
          app.globalData.bp_name = 'B04PI010'

        }
        break;
      case 5:
        this.data.tURL = "05"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B05PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C05MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C05MI010'
          app.globalData.bp_name = 'B05PI010'
        }
        break;
      case 6:
        this.data.tURL = "06";
        break;
      default:
        break;
    }

    //由结果页面返回
    if (app.globalData.is_return == true) {
      this.setData({
        Pimg: app.globalData.rootURL + app.globalData.bp_name + this.data.imgformat,
        Mimg: app.globalData.rootURL + app.globalData.cm_name + this.data.imgformat,
        Eimg: app.globalData.rootURL + app.globalData.ce_name + this.data.imgformat,
        Cimg: app.globalData.rootURL + app.globalData.cc_name + this.data.imgformat
      });
      if (app.globalData.production == "C" && this.data.indexb == 0) {
        this.setData({
          //地毯（披肩）需要隐藏完成按钮
          showFinishbt: false,
          select: app.globalData.selectcm,
        });
      }
      if (app.globalData.production == "B" && this.data.indexb == 0) {
        this.setData({
          select: app.globalData.selectbp,
        });
      }
    } else {
      //布包没有色块默认路径
      app.globalData.bagNoColorUrl = this.data.Pimg
    }

    this.data.imgName = [
        this.data.pURL + this.data.tURL + this.data.eURL + "I01",
        this.data.pURL + this.data.tURL + this.data.eURL + "I02",
        this.data.pURL + this.data.tURL + this.data.eURL + "I03",
        this.data.pURL + this.data.tURL + this.data.eURL + "I04",
        this.data.pURL + this.data.tURL + this.data.eURL + "I05",
        this.data.pURL + this.data.tURL + this.data.eURL + "I06",
        this.data.pURL + this.data.tURL + this.data.eURL + "I07",
        this.data.pURL + this.data.tURL + this.data.eURL + "I08",
        this.data.pURL + this.data.tURL + this.data.eURL + "I09",
        this.data.pURL + this.data.tURL + this.data.eURL + "I10",
      ],

      this.setData({
        imgURL: [
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10.png",
        ]
      })

    // console.log("页面加载获取图片路径：" + this.data.imgURL);
    // console.log("图片名称：" + this.data.imgName[0]);

    // 转发群
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
      // 获取用户的图片列表
      this.getCustomImage();
  },

  getCustomImage:function(){
    var subjectType = app.globalData.theme;
    var openId = app.globalData.openId;
    var that = this;
    wx.request({
      url: 'https://cgo.culturecompute.com:8088/customImage?openId='+openId+"&subjectType="+subjectType,
      method:"GET",
      success:function(res){
        that.setData({
          customImage: res.data
        })
        that.initCustomImage(0);
      }
    })
  },

  // 初始化和刷新展示的图片列表
  initCustomImage:function(index){
    var customImage = this.data.customImage;
    var prod = this.data.production;
    var images = customImage.c;
    if(prod === 'B') {
      images = customImage.b; 
    }
    console.log(images)
    images = images.map(function(image){
      return image.map(function(i){
        return app.globalData.customRoot + i;
      })
    })
    this.setData({
      customImageShow: images[index]
    })
  },

  customSwipClick:function(e){
    var index = e.currentTarget.dataset.index;
    var that = this;
    var customImage = this.data.customImage;
    var prod = this.data.production;
    var images = customImage.c;
    if(prod === 'B') {
      images = customImage.b; 
    }
    // 地毯，生成时传入后台的参数
    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        app.globalData.cm_name = images[0][index];
      }
      if (this.data.indexb == 1) {
        app.globalData.ce_name = images[1][index];
      }
      if (this.data.indexb == 2) {
        app.globalData.cc_name = images[2][index];
      }
    } else {
      // 布包传入后台的参数
      if (this.data.indexb == 0) {
        app.globalData.bp_name = images[0][index];
      }
      if (this.data.indexb == 1) {
        app.globalData.bc_name = images[1][index];
      } 
    }
    
    this.setData({
      select:-1,
      customSelect: index,
      Mimg: that.data.customImageShow[index]
    })
  },

  // 监听页面初次渲染完成
  onReady: function() {
    wx.hideLoading()
  },

  refreshAfterCrop:function(){
    console.log("调用");
    var that = this;
    setTimeout(function(){
      that.getCustomImage();
      that.initCustomImage(that.data.indexb);
    },1000)
  },

  // 跳转裁剪
  jump2crop:function(e){
    // 从何处跳转过来
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../cropper/cropper?type='+type,
    })
  }

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