Page({
  data:{
    result:{},
    value:''
  },
  search(e){
    const value = e.detail.value
    const _this = this
    this.setData({
      value
    })
    wx.request({
      url: `http://m.maoyan.com/ajax/search?kw=${value}&cityId=57&stype=2`, //没有获取猫眼城市ID的API，所以这里的城市ID只能写死，去掉城市ID会404
      success(res){
        console.log(res.data.cinemas ? res.data.cinemas.list : [])
        _this.setData({
          result: res.data.cinemas ? res.data.cinemas.list : []
        })
      }
    })
  }
})