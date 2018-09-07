const util = require('../../../utils/util.js')

Page({
  data: {
    days: util.getSevenDay(), //获取7天
    isShow: false, //导航下拉框是否展开
    cityCinemaInfo: {}, //影院过滤菜单
    day: util.getToday(), //观影日期（默认为今天）
    params: {      //影院搜索条件
      movieId: 0,
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
      updateShowDay: true,
      cityId: ''
    }  

  },
  onLoad(options) {
    const movieId = options.movieId || 341737 //测试
    const movieName = options.movieName || '碟中谍6：全面瓦解' //测试
    wx.setNavigationBarTitle({
      title: movieName
    })
    this.setData({
      params: { ...this.data.params, movieId }
    },()=>{
      this.initPage(movieId)
    })
  },
  //初始化页面
  initPage(movieId) {
    const {
      day
    } = this.data
    const _this = this
    wx.request({
      url: `http://m.maoyan.com/ajax/filterCinemas?movieId=${movieId}&day=${day}`,
      success(res) {
        _this.setData({
          cityCinemaInfo: res.data
        })
      }
    })
    wx.request({
      url: `http://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
      data:_this.data.params,
      method: 'POST',
      success(res) {
        console.log(res.data)
      }
    })

  },
  selectDay(e){
    const day = e.currentTarget.dataset.day
    this.setData({
      day
    })
  },
  
})