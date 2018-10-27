Page({
  data: {
    value: '',
    stype: '',
    placeholder: '',
    movies: {},
    cinemas: {}
  },
  onLoad(query) {
   this.initPage(query)
  },
  initPage(query){
    //搜索类型，-1代表搜索影院或电影，2代表搜索影院
    const stype = query.stype
    let placeholder = ''
    if (stype === '-1') {
      placeholder = '搜电影、搜影院'
    } else {
      placeholder = '搜影院'
    }
    this.setData({
      stype,
      placeholder
    })
  },
  search(e) {
    const value = e.detail.value
    const _this = this
    this.setData({
      value
    })
    wx.request({
      url: `https://m.maoyan.com/ajax/search?kw=${value}&cityId=57&stype=${_this.data.stype}`, //没有获取猫眼城市ID的API，所以这里的城市ID只能写死，去掉城市ID会404
      success(res) {
        let movies = res.data.movies ? res.data.movies.list : []
        movies = movies.map(item=>{
          item.img = item.img.replace('w.h','128.180')
          return item
        })
        _this.setData({
          movies: movies,
          cinemas: res.data.cinemas ? res.data.cinemas.list : []
        })
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})