var app = getApp();
var servsers = getApp().globalData.baseUrl;
Page({
  data: {
    list: [],
    servsers: servsers,
    activitydata:{},
    spaceimgs:[],
    currentIndex:1
  },
  onLoad: function (options) {
    console.log(options);

    var that = this
    wx.request({
      url: servsers+'/khtj/json/base/tabInformation/getDetails',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res);
        console.log(1234);
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
          activitydata: res.data.result,
          spaceimgs: list,
        })
      }
    })

    wx.setNavigationBarTitle({
        title: "活动详情"
    })
  },
  setCurrent: function(e){
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  imgPreview: function(){ //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex-1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  }

})
