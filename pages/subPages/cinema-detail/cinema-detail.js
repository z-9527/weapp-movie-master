const util = require('../../../utils/util.js')
const formatNumber = util.formatNumber
Page({
  data: {
    cinemaId: '',
    movieId: '',
    cinemaDetail: {}, //影院详情
    movie: '', //选中的电影
    days: [], //该电影的排片日期列表
    timeList: [], //当天播放电影的时间段
    divideDealList: [] //影院分类零食列表
  },
  onLoad(query) {
    const cinemaId = query.cinemaId || 23975 //测试
    const movieId = query.cinemaId || 1203575 //测试
    const day = query.day
    this.initPage({
      movieId,
      cinemaId
    })
  },
  initPage(obj) {
    const {
      movieId,
      cinemaId
    } = obj
    const _this = this
    this.setData({
      cinemaId,
      movieId
    })
    wx.request({
      url: `http://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`,
      success(res) {
        _this.setData({
          cinemaDetail: res.data,
          divideDealList: _this.formatUrl(res.data.dealList.divideDealList)
        }, () => {
          _this.selectMovie(movieId)
        })
        console.log(res.data)
      }
    })
  },
  //选择电影
  selectMovie(movieId) {
    if (movie && movie.id === movieId) {
      return
    }
    const movies = this.data.cinemaDetail.showData.movies
    let movie = movies.find(item => item.id === movieId) || movies[0]
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
    console.log(divideDealList)
    return divideDealList
  },
})