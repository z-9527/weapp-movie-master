const app = getApp()

Page({
  data: {
    city: ''
  },
  onLoad() {
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
    // console.log(1,this.data.city)
    // console.log(2,app)
  }
})