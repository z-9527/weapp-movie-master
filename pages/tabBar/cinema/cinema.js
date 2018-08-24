const app = getApp();
Page({
  data:{
    city:'',
  },
  onLoad(){
    this.setData({
      city: app.globalData.city.city_name || '武汉'
    })
  },
  onShow(){
    if (this.data.city !== app.globalData.city.city_name){
      city: app.globalData.city.city_name
    }
  }
})