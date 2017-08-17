//获取应用实例
var app = getApp();
var servsers = getApp().globalData.baseUrl;
Page({
  data: {
  	servsers: servsers,
    sortindex:0,  //排序索引
    sortid:null,  //排序id
    activitylist:[], //会议室列表列表
    scrolltop:null, //滚动位置
     ye: 1,
    page: 0  //分页,
  },
  onLoad: function () { //加载数据渲染页面
    this.fetchConferenceData();
  },
  fetchConferenceData:function(){  //获取数据列表
   
    var that = this
   
   //调取首页活动列表
    wx.request({
      // url: 'http://v.juhe.cn/toutiao/index',
      // data: {
      //     type: 'top',
      //     key: '6dd2bccc77b7e69737e3317f3251fd64'
      // },
      url: servsers+'/khtj/json/base/tabInformation/queryHomeList',
      data: {
        page: 0,
        rows: 10,
      },
      success: function (e) {
        console.log('活动数据接口');
        console.log(e.data.result);
        var datas = e.data.result;
        for(var i = 0;i < datas.length; i++) {
           console.log(datas.length);
           console.log(datas[i].depict);
           datas[i].title = datas[i].title.substring(0,18);
           datas[i].depict = datas[i].depict.substring(0,36)+"......";
        }
        that.setData({
          activitylist:e.data.result
        })
      },
      fail: function (e) {
        console.log('22222');
        console.log(e);
      }
    })
  
  },
  scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
     })
  },
  goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  scrollLoading:function(){ //滚动到底部加载
    this.fetchConferenceData();
  },
   //触底上拉加载新内容
  onReachBottom: function () {
    var that = this
    //每次进入 当前页++
    that.setData({
      page: ++that.data.ye,
      loading: true
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
        page: that.data.ye,
        rows: 10,
      },
      success: function (e) {
        console.log('活动数据接口');
        console.log(e.data.result);
        var datas = e.data.result;
        for(var i = 0;i < datas.length; i++) {
           console.log(datas.length);
           console.log(datas[i].depict);
           datas[i].title = datas[i].title.substring(0,18);
           datas[i].depict = datas[i].depict.substring(0,36);
        }
        that.setData({
          activitylist:that.data.activitylist.concat(e.data.result)
        })
      },
      fail: function (e) {
        console.log('22222');
        console.log(e);
      }
    })
    
    
  },
  
  onPullDownRefresh:function(){ //下拉刷新
    this.fetchConferenceData();
    wx.stopPullDownRefresh();
  }
})