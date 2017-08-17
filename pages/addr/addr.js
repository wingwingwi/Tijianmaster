
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var self = this;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var detail = e.detail.value.detail;
    if (name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (phone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    wx.setStorage({
        key: 'address',
        data: self.data.address,
        success() {
          wx.navigateBack();
        }
      })
  },
  bindName(e){
    this.setData({
      'address.name' : e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      'address.phone' : e.detail.value
    })
  },
  bindDetail(e){
    this.setData({
      'address.detail' : e.detail.value
    })
  }
})