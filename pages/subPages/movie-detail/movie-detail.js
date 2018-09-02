Page({
  data:{
    detailMovie:null    //电影详情
  },
  onLoad(options){
    const movieId = options.movieId
    this.initPage(movieId)
  },
  //初始页面
  initPage(movieId){
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `http://m.maoyan.com/ajax/detailmovie?movieId=${movieId}`,
      success(res) {
        wx.hideLoading()
        _this.setData({
          detailMovie: _this.handleData(res.data.detailMovie)
        })
        console.log(res.data.detailMovie)
      }
    })
  },
  //处理数据
  handleData(data){
    //小程序的{{}}中不能调用函数，只能在这里处理数据
    let obj = data
    obj.img = obj.img.replace('w.h','177.249')
    //将类似“v3d imax”转化为['3D','IMAX']
    obj.version = obj.version && obj.version.split(' ').map(item=>{
      return item.toUpperCase().replace('V','')
    })
    //将评分人数单位由个转化为万
    obj.snum = obj.snum/10000
    obj.snum = obj.snum.toFixed(1)
    //评分星星,满分10分，一颗满星代表2分
    let stars = new Array(5).fill('star-empty')
    let fullStars = Math.floor(obj.sc / 2)   //满心的个数
    let halfStar = obj.sc % 2 ? 'star-half' : 'star-empty'        //半星的个数，半星最多1个
    stars.fill('star-full', 0, fullStars)              //填充满星
    if (fullStars<5){
      stars[fullStars] = halfStar;
    }
    console.log(stars)
    obj.stars = stars
    console.log(123,obj)
    return obj
  }

})