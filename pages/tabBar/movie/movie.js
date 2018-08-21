const app = getApp()

Page({
  data: {
    city: '',
    movieList:[],
    movieIds:[],
    switchItem:0,   //默认选择‘最近上映’
    loadComplete:false  //‘正在上映’数据是否加载到最后一条
  },
  onLoad() {
    this.firstLoad()
    //https://www.jianshu.com/p/aaf65625fc9d   解释的很好
    if (app.globalData.userLocation){
      this.setData({
        city: app.globalData.city.city_name
      })
    } else {
      app.userLocationReadyCallback = ()=>{
        this.setData({
          city: app.globalData.city.city_name
        })
      }
    }
  },
  onShow(){
    if (app.globalData.city.city_name && this.data.city !== app.globalData.city.city_name){
      this.setData({
        city: app.globalData.city.city_name
      })
   }
  },
  //上拉触底刷新
  onReachBottom(){
    const { switchItem, movieList, movieIds, loadComplete} = this.data
    const _this = this
    if (this.data.switchItem===0){
      if (loadComplete){
        return 
      }
      const length = movieList.length
      if (length === movieIds.length){
        this.setData({
          loadComplete:true
        })
        return
      }
      let query = movieIds.slice(length, length + 10).join('%2C')
      const url = `http://m.maoyan.com/ajax/moreComingList?token=&movieIds=${query}`
      wx.request({
        url,
        success(res){
          const arr = movieList.concat(_this.formatImgUrl(res.data.coming))
          _this.setData({
            movieList: arr,
          })
        }
      })
    }
  },
  firstLoad(){
    const _this = this
    wx.request({
      url: 'http://m.maoyan.com/ajax/movieOnInfoList?token=',
      success(res){
        const movieList = _this.formatImgUrl(res.data.movieList)
        _this.setData({
          movieIds: res.data.movieIds,
          movieList
        })
      }
    })
  },
  //切换swtch
  selectItem(e){
    this.setData({
      switchItem: e.currentTarget.dataset.item
    })
  },
  //处理图片url
  formatImgUrl(arr,w=128,h=180){
    //小程序不能在{{}}调用函数，所以我们只能在获取API的数据时处理，而不能在wx:for的每一项中处理
    let newArr = []
    arr.forEach(item=>{
      let imgUrl = item.img.replace('w.h', `${w}.${h}`)
      newArr.push({ ...item, img: imgUrl})
    })
    return newArr
  }
})