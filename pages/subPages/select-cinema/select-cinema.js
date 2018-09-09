const util = require('../../../utils/util.js')

Page({
  data: {
    days: util.getSevenDay(), //获取7天
    day: util.getToday(), //观影日期（默认为今天）
    isShow: false, //导航下拉框是否展开
    cityCinemaInfo: {}, //影院过滤菜单
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
      updateShowDay: false,
    },
    cinemas:[] //影院列表 

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
      this.initPage()
    })
  },
  //初始化页面
  initPage() {
   this.getData()
  },
  //获取数据
  getData(){
    const {day,params} = this.data
    const _this = this
    //获取过滤菜单
    wx.request({
      url: `http://m.maoyan.com/ajax/filterCinemas?movieId=${params.movieId}&day=${day}`,
      success(res){
        _this.setData({
          cityCinemaInfo:res.data
        })
      }
    })
    //获取影院列表
    wx.request({
      url: `http://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
      method:'POST',
      data: params,
      success(res){
        _this.setData({
          cinemas: res.data.cinemas
        })
        console.log(res)
      }
    })
  },
  selectDay(e){
    const day = e.currentTarget.dataset.day
    if (day === this.data.day){
      return
    }
    this.setData({
      day,
      params: { ...this.data.params,day}
    },()=>{
      this.getData()
    })
  },
  
})