const util = require('../../../utils/util.js')
const formatNumber = util.formatNumber
Page({
  data: {
    cinemaId: '',
    movieId: '',
    cinemaDetail: null, //影院详情
    movie: null, //选中的电影
    movies:null, //电影列表
    days: [], //该电影的排片日期列表
    timeList: [], //当天播放电影的时间段
    divideDealList: [] //影院分类零食列表
  }, 
  onLoad(query) {
    const { cinemaId='908', movieId = '', day=''} = query
    this.setData({
      cinemaId,
      movieId,
      day
    },()=>{
      this.initPage()
    })
  },
  //初始化页面
  initPage(obj) {
    const {
      movieId,
      cinemaId
    } = this.data
    const _this = this
    wx.request({
      url: `http://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`,
      success(res) {
        _this.setData({
          cinemaDetail: res.data,
          movies: _this.formatMovie(res.data.showData.movies),
          divideDealList: _this.formatUrl(res.data.dealList.divideDealList)
        })
      }
    })
  },
  //选择电影
  selectMovie(e) {
    const movie = e.detail.movie
    let days = []
    movie.shows.forEach(item => {
      days.push({
        title: item.dateShow,
        day: item.showDate
      })
    })
    this.setData({
      movie,
      days,
      timeList: this.createEndTime(movie.shows[0].plist, movie.dur)
    })
  },
  //选择时间
  selectDay(e) {
    const day = e.detail.day
    const movie = this.data.movie
    const index = movie.shows.findIndex(item => item.showDate === day)
    this.setData({
      timeList: this.createEndTime(movie.shows[index].plist, movie.dur)
    })
  },
  //跳转到“套餐详情”页面
  goSnackPage(e){
    const info = e.currentTarget.dataset.info;
    const paramsStr = util.ObjToString({
      cinemaName: this.data.cinemaDetail.cinemaData.nm,
      cinemaId: this.data.cinemaId,
      dealId: info.dealId
    })
    wx.navigateTo({
      url: `/pages/subPages/snack-page/snack-page?${paramsStr}`,
    })
  },
  //购票
  buyTicket(e){
    const info = e.currentTarget.dataset.info;
    wx.showModal({
      title: '提示',
      content: '此小程序仅为学习，不会产生任何支付',
      success:(res)=>{
        if (res.confirm){
          
        }
      }
    })
  },
  //处理散场时间
  createEndTime(arr, dur) {
    let timeList = []
    if (Array.isArray(arr)) {
      timeList = arr.map(item => {
        let temp = { ...item
        }
        let time = new Date(`${item.dt} ${item.tm}`)
        time = time.setMinutes(time.getMinutes() + dur)
        const endTime = new Date(time)
        temp.endTime = `${formatNumber(endTime.getHours())}:${formatNumber(endTime.getMinutes())}`
        return temp
      })
    }
    return timeList
  },
  //处理电影图片的url
  formatMovie(arr){
    let list = []
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        list.push({
          ...item,
          img: item.img.replace('w.h', '148.208')
        })
      })
    }
    return list
  },
  //处理零食图片的url
  formatUrl(arr) {
    let divideDealList = []
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        let temp = {
          ...item
        }
        temp.dealList = temp.dealList.map(i => ({
          ...i,
          imageUrl: i.imageUrl.replace('w.h', '440.0')
        }))
        divideDealList.push(temp)
      })
    }
    return divideDealList
  },
})