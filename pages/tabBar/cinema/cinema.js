const util = require('../../../utils/util.js')

const app = getApp();
Page({
  data: {
    city: '',
    params: { //url请求参数对象
      day: util.getToday(),
      offset: 0,
      limit: 20,
      districtId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId: -1,
      stationId: -1,
      item: '',
      updateShowDay: true
    },
    first:true,
    cinemas:[]
  },
  onLoad() {
    this.setData({
      city: app.globalData.city.city_name || '武汉'
    })
    this.initPage()
  },
  onShow() {
    if (this.data.city !== app.globalData.city.city_name) {
      city: app.globalData.city.city_name
    }
  },
  initPage() {
    wx.showLoading({
      title: '正在加载...'
    })
    const _this = this;
    wx.request({
      url: 'http://m.maoyan.com/ajax/cinemaList',
      data:_this.data.params,
      success(res){
        wx.hideLoading()
        _this.setData({
          cinemas:res.data.cinemas,
          first:false
        })
      }
    })
  }
})