//app.js
const QQMapWX = require('./assets/libs/qqmap-wx-jssdk.min.js');
let qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'MH2BZ-4WTK3-2D63K-YZRHP-HM537-HHBD3'
});

App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
          //获取用户的位置信息
          if (res.authSetting['scope.userLocation']) {
            wx.getLocation({
              type: 'wgs84',
              success: (res) => {
                const latitude = res.latitude
                const longitude = res.longitude
                qqmapsdk.reverseGeocoder({
                  success: (res) => {
                    let cityFullname = res.result.address_component.city
                    const city = cityFullname.substring(0, cityFullname.length - 1)
                    this.globalData.userLocation = {
                      latitude,
                      longitude,
                      city
                    }
                    this.globalData.city.city_name = city
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userLocationReadyCallback) {
                      this.userLocationReadyCallback()
                    }
                  }
                })
              }
            })
          }
      }
    })
  },
  globalData: {
    userLocation: null, //用户的位置信息
    city:{}   //用户切换的城市
  }
})