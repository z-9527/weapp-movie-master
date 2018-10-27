const util = require('../../../utils/util.js')
Page({
  data:{
    movieId:'',
    cmts:[], //最新评论
    hcmts:[], //热门评论
    loadComplete:false //是否加载完
  },
  onLoad(options){
    this.initPage(options)
  },
  //初始化页面
  initPage(options){
    const movieId = options.movieId
    const movieName = options.movieName
    wx.setNavigationBarTitle({
      title: `观众评论-${movieName}`
    })
    wx.showLoading({
      title: '正在加载...',
    })
    this.getComment(movieId)
    this.setData({
      movieId
    })
  },
  onReachBottom(){
    this.getComment(this.data.movieId)
  },
  //获取观众评论
  getComment(movieId) {
    if (this.data.loadComplete){
      return
    }
    const cmts = this.data.cmts
    const _this = this
    wx.request({
      url: `https://m.maoyan.com/mmdb/comments/movie/${movieId}.json?_v_=yes&offset=${cmts.length}`,
      success(res) {
        let comments = { ...res.data }    
        const newCmts = cmts.concat(_this.formatData(comments.cmts)) 
        wx.hideLoading() 
        _this.setData({
          hcmts: _this.formatData(comments.hcmts),
          cmts: newCmts,
          loadComplete: newCmts.length>=comments.total
        })
      }
    })
  },
  //处理数据
  formatData(arr){
    let list = []
    if(arr.length){
      list = arr.map(item => {
        let temp = { ...item }
        temp.avatarurl = temp.avatarurl || '/assets/images/avatar.png'
        temp.purchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id === 4))
        temp.stars = this.formatStar(temp.score)
        temp.calcTime = util.calcTime(temp.startTime)
        return temp
      })
    }
    return list
  },
  //处理评分星星
  formatStar(sc) {
    //1分对应满星，0.5对应半星
    let stars = new Array(5).fill('star-empty')
    const fullStars = Math.floor(sc)  //满星的个数
    const halfStar = sc % 1 ? 'star-half' : 'star-empty' //半星的个数，半星最多1个
    stars.fill('star-full', 0, fullStars)              //填充满星
    if (fullStars < 5) {
      stars[fullStars] = halfStar;           //填充半星
    }
    return stars
  },

})