Page({
  data: {
    info: null,
    markers: []
  },
  onLoad(opt) {
    this.initData({})
  },
  initData(info) {
    this.setData({
      info,
      markers: [{
        latitude: info.latitude || 30.498636,
        longitude: info.longitude || 114.16837
      }]
    })
  },
  //定位自己的位置
  position() {
    const MapContext = wx.createMapContext('map')
    MapContext.moveToLocation()
  }
})