Page({
  data: {
    navbar: ['公司简介', '宣传片', '环境展示', '联系我们'],
    currentTab: 0,
    titleA:'我们是谁?',
    titleB: 'who we are',
    markers: [{
      iconPath: "../../images/map.png",
      id: 0,
      latitude: 31.834260,
      longitude: 117.135150,
      width: 32,
      height: 32
    }]
  },
  onLoad: function () { //加载数据渲染页面
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
  })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '0551-63829889', //此号码并非真实电话号码，仅用于测试
      success: function () {},
      fail: function () {}
    })
  },
  //三点-分享
  onShareAppMessage: function () {
    return {
      title: '关于我们',
      desc: '体检就上康虹职业病体检中心,国内专业健康体检机构,在线购买体检套餐,在线预约咨询等',
      path: 'pages/index/index'
    }
  }
}) 