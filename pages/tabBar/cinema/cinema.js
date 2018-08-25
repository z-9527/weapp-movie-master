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
      updateShowDay: false
    },
    first: true,
    cinemas: [], //影院列表
    cityCinemaInfo: {} //城市影院信息
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
  //初始化页面
  initPage() {
    wx.showLoading({
      title: '正在加载...'
    })
    const _this = this;
    this.getCinemas().then(()=>{
      wx.hideLoading()
      _this.setData({
        first:false
      })
    })
    wx.request({
      url: 'http://m.maoyan.com/ajax/filterCinemas',
      success(res) {
        _this.setData({
          cityCinemaInfo: res.data
        })
      }
    })
  },
  //获取影院列表
  getCinemas() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://m.maoyan.com/ajax/cinemaList',
        data: _this.data.params,
        success(res) {
          resolve()
          _this.setData({
            cinemas: res.data.cinemas,
          })
        }
      })
    })
  },
  //当过滤条件变化时调用的函数
  changeCondition(e){
    const obj = e.detail
    this.setData({
      params: { ...this.data.params,...obj}
    },()=>{
      this.getCinemas()
    })
  }
})