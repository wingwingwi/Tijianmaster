//index.js
//获取应用实例
var app = getApp();
var servsers = getApp().globalData.baseUrl;
Page({
  data: {
    indexmenu:[],
    imgUrls: [],
    servsers: servsers,
    loading: false,
    actTxt:'热门活动',
    phone:'0551-63829889'
  },
  onLoad:function(){
    //生命周期函数--监听页面加载
    this.fetchData();
    var that = this
    //调取首页banner
    wx.request({  
      
      url: servsers+'/khtj/json/base/tabBanner/queryList',
      data: {

      },
      success: function (e) {
        console.log('焦点图接口');
        console.log(e.data.result);
        that.setData({
          imgUrls: e.data.result
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })
    //调取首页活动列表
    wx.request({
      // url: 'http://v.juhe.cn/toutiao/index',
      // data: {
      //     type: 'top',
      //     key: '6dd2bccc77b7e69737e3317f3251fd64'
      // },
      url: servsers+'/khtj/json/base/tabInformation/queryHomeList',
      data: {
        page: 1,
        rows: 10,
      },
      success: function (e) {
        console.log('活动数据接口');
        console.log(e.data.result);
        var datas = e.data.result;
        for(var i = 0;i < datas.length; i++) {
           console.log(datas.length);
           console.log(datas[i].depict);
           datas[i].title = datas[i].title.substring(0,14);
           datas[i].depict = datas[i].depict.substring(0,16);
        }
        that.setData({
          newsList: e.data.result
        })
      },
      fail: function (e) {
        console.log('22222');
        console.log(e);
      }
    })
   
  },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon':'../../images/8.png',
          'text':'个人体检',
          'url':'../service/service',
          'type': 'navigate'
        },
        {
          'icon':'../../images/6.png',
          'text':'团体体检',
          'url':'../space/space',
          'type': 'navigate'
        },
        {
          'icon': '../../images/icon_13.png',
          'text': '个人定制',
          'url': '../question/question',
          'type': 'navigate'
        },
        {
          'icon':'../../images/4.png',
          'text':'活动资讯',
          'url':'../activity/activity',
          'type': 'navigate'
        },
        {
          'icon':'../../images/3.png',
          'text':'联系我们',
          'url':'../abouts/abouts',
          'type':'switchTab',
          'moth':'callMe'
        },
        {
          'icon': '../../images/icon_09.png',
          'text': '健康咨询',
          'url': '../question/question',
          'type':'navigate'
        },
        {
          'icon': '../../images/9.png',
          'text': '特别服务',
          'url': '../space/space',
          'type': 'navigate'
        },
        {
          'icon': '../../images/11.png',
          'text': '个人中心',
          'url': '../my/my',
          'type': 'switchTab'
        }
      ],
      
      reservelist: [
        {
          "id": 1,
          "name": "坚持正确的办院方针—“康虹人”经..",
          "time": "2016/08/25 13:00",
          "desc": "坚持正确的办院方针—“康虹人”经受住..",
          "imgurl": "../../images/hhh.jpg",
          "url":"../activitydetail/activitydetail?id=jix"
        }, 
        {
          "id": 1,
          "name": "坚持正确的办院方针—“康虹人”经..",
          "time": "2016/08/25 13:00",
          "desc": "坚持正确的办院方针—“康虹人”..",
          "imgurl": "../../images/hhh.jpg",
           "url": "../activitydetail/activitydetail?id=2"
        }
      ]
    })
  },
  
  // 加载更多
  //触底上拉加载新内容
  onReachBottom: function () {
    var that = this
    //每次进入 当前页++
    that.setData({
      page: ++that.data.ye,
      loading: true
    })
    wx.request({
      url: 'http://106.14.157.223/khtj/json/base/tabInformation/queryHomeList',
      data: {
        page: 1,
        rows: 10,
      },
      success: function (e) {
        console.log(e.data.tngou)
        that.setData({
          taocanData: that.data.taocanData.concat(e.data.result),
          loading: false
        })
      }
    })
  }
  ,
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showToast({
	title: '没事儿别乱拉',//提示信息
	icon: 'success',//成功显示图标
	duration: 2000//时间
})
    wx.stopPullDownRefresh;
  },
  
  // 首页中间图片跳转
  goTo: function (e) {
    wx.navigateTo({
      url: '../activity/activity'
    })
  },
  //热门活动
  goToPict: function (e) {
    wx.navigateTo({
      url: '../space/space'
    })
  },
  callMe: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone, //此号码并非真实电话号码，仅用于测试
      success: function () { },
      fail: function () { }
    })
  },
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow :function(){
    //生命周期函数--监听页面显示
    // console.log('onShow');
  },
  onHide :function(){
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload :function(){
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  },
  //下拉刷新
  onPullDownRefresh:function(){ //下拉刷新
    this.onLoad();
    wx.stopPullDownRefresh();
  },
   //三点-分享
  onShareAppMessage: function () {
    return {
      title: '我要体检',
      desc: '体检就上康虹职业病体检中心,国内专业健康体检机构,在线购买体检套餐,在线预约咨询等',
      path: 'pages/index/index'
    }
  },
  btn_pay: function () {
    var that = this;
    wx.login({
      success: function (res) {
        //console(1111+res)
        that.getOpenId(res.code);
      }
    });
  },

  //获取openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/GetOpenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'code': code },
      success: function (res) {
        var openId = res.data.openid;
        //console(2222 + openId)
        that.getXiaDan(openId);
      }
    })
  },
  getXiaDan: function (openId) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': openId },
      success: function (res) {
        var prepay_id = res.data.prepay_id;
        //console(3333 + prepay_id)
        that.sign(prepay_id);
      }
    })
  },
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'prepay_id': prepay_id },
      success: function (res) {
        //console(4444 + res)
        that.requestPayment(res.data);
      }
    })
  },
  requestPayment: function (obj) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
       // console(55555 + res)
      },
      'fail': function (res) {
        //console(66666 + res)
      }
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex
    if (this.data.navSectionItems[curid].length === 0) return
    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    })
  }
})
