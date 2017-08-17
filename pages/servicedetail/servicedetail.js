var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var servsers = getApp().globalData.baseUrl;
Page({
  data: {
  	servsers: servsers,
    navbar: ['套餐详情', '体检须知'],
    currentTab: 0,
    pro: {},
    msgTwo: {},
    default_number: 1,
    toggle: false,//是否隐藏底部tar
    colorValue: '#e64340',
    btntype: 0,
    spaceimgs:[],
    phoneNumber: '13866145149'
  },
  onLoad: function (options) {
  	console.log(options);
    var that = this
  	wx.request({
      url: servsers+'/khtj/json/base/tabPersonalPackage/getDetails',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res);
        var list = [];
        if(res.data.result.fileList.length == 0) {
          list.push(servsers + res.data.result.logo);
        } else {
          for (var i = 0; i < res.data.result.fileList.length; i++) {
            list.push(servsers + res.data.result.fileList[i].fileUrl);
          }
        }
        console.log(list)
        console.log(res.data.result.cnts);
        that.setData({
          pro: res.data.result,
          spaceimgs: list,
        })
        
        msgTwo: WxParse.wxParse('msgTwo', 'html', res.data.result.cnts, that, 5)
        console.log(msgTwo);
      }
    })
  	
  	
  	
  	
  	
//  this.setData({
//    pro: {
//      id: 1,
//      title: '宏辉果蔬 苹果 烟台红富士 12个 单果约75mm 总重约2.1kg 新鲜水果',
//      image: '../../images/pr1.jpg',
//      num: 1,
//      price: '3600',
//      oldPrice: '68',
//      selected: true,
//      repertory: 99999,
//      sales: 36,
//      slideshow: [
//        '../../images/pr1.jpg',
//        '../../images/pr2.jpg',
//        '../../images/pr3.jpg'
//      ]
//    }
//  });
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //拨打电话
  bindGoIndex: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //点击加入购物车
  showCartBox: function () {
    this.setData({
      toggle: true,
      default_number: 1,
      btntype: 1
    })
  },
  //点击立即购买
  showBuyBox: function () {
    this.setData({
      toggle: true,
      default_number: 1,
      btntype: 2
    })
  },
  //添加数量
  addCount: function () {
    let num = this.data.default_number; //商品数
    let repertory = this.data.pro.repertory; // 库存
    num++;
    if (num > repertory) {
      num = readonly;
    }
    this.setData({
      default_number: num
    })
  },
  //减少数量
  reduceCount: function () {
    let num = this.data.default_number; //商品数
    num--;
    if (num <= 1) {
      num = 1;
    }
    this.setData({
      default_number: num
    })
  },
  //x-关闭窗口
  hideCartBox: function () {
    this.setData({
      toggle: false
    })
  },
  //悬浮按钮-前往购物车
  bindGoCart: function (event) {
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
  },
  // 添加商品到缓存
  goods_add_cart: function () {
    let proIntro = wx.getStorageSync('proIntro');
    let that = this;
    let btntype = that.data.btntype;//按钮类型 0:无 1:加入购物车-跳转购物车  2:立即购买-跳转我的订单
    let total = that.data.default_number;
    let intro = that.data.pro;
    let cache = {
      id: intro.id,
      title: intro.title,
      image: servsers+intro.logo,
      price: intro.price,
      num: total,
      selected: true
    };
    proIntro ? proIntro = proIntro : proIntro = [];
    proIntro.push(cache);
    wx.setStorage({
      key: "proIntro",
      data: proIntro
    });
    that.setData({
      toggle: false
    });
    if (btntype == 1) {//加入购物车
      wx.navigateTo({
        url: '/pages/cart/cart'
      })
    } else if (btntype == 2) {//加入订单
      wx.navigateTo({
        url: '/pages/cart/cart'
      })
    }
    
  }
})