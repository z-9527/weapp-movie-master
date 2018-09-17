Page({
  data: {
    cinemaId: '',
    movieId: '',
    cinemaDetail: {}, //影院详情
    movie:'', //选中的电影
    days:[],   //该电影的排片日期列表
    timeList:[], //当天播放电影的时间段
    divideDealList:[]  //影院分类零食列表
  },
  onLoad(query) {
    const cinemaId = query.cinemaId || 23975 //测试
    const movieId = query.cinemaId || 1203575 //测试
    const day = query.day
    this.initPage({ movieId, cinemaId })
  },
  initPage(obj){
    const { movieId, cinemaId } = obj
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
        },()=>{
          _this.selectMovie(movieId)
        })
        console.log(res.data)
      }
    })
  },
  //处理零食图片的url
  formatUrl(arr){
    let divideDealList = []
    arr.forEach(item=>{
      let temp = {...item}
      temp.dealList = temp.dealList.map(i => ({ ...i, imageUrl: i.imageUrl.replace('w.h','440.0')}))
      divideDealList.push(temp)
    })
    console.log(999, divideDealList)
    return divideDealList
  },
  //选择电影
  selectMovie(movieId){
    if(movie && movie.id===movieId){
      return 
    }
    const movies = this.data.cinemaDetail.showData.movies
    let movie = movies.find(item => item.id === movieId) || movies[0]
    let days = []
    movie.shows.forEach(item=>{
      days.push({
        title: item.dateShow,
        day: item.showDate
      })
    })
    this.setData({
      movie,
      days,
      timeList: movie.shows && movie.shows[0].plist
    })
    console.log(movie.shows && movie.shows[0].plist)
  },
  //选择时间
  selectDay(e){
    console.log(123123123123123123)
    const day = e.detail.day
    const movie = this.data.movie
    const index = movie.shows.findIndex(item => item.showDate === day)
    //让页面有个空白时间，防止用户以为页面没刷新
    this.setData({
      timeList:[]
    },()=>{
      this.setData({
        timeList: movie.shows[index].plist
      })
    })
  }
})