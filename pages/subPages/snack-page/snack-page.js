Page({
  data: {
    info: null,
    cinemaName: ''
  },
  onLoad(obj) {
    this.initPage(obj)
  },
  initPage(obj) {
    wx.showLoading({
      title: '正在加载',
    })
    const data = {
      dealId: obj.dealId,
      quantity: 1,
      cinemaId: obj.cinemaId,
    }
    wx.request({
      url: 'http://m.maoyan.com/deal/goods/price?_v_=yes&token=_Rpc-H8U5JCblI4hGuJyrBtkd1cAAAAAdQYAADhpD2UCdaExkvgi4bFJcnWhlfI6rc7ilxZE_SENva6l8EU_L8_hQE-hXUB7l21d1w',
      method: 'POST',
      data: data,
      success: (res) => {
        wx.hideLoading()
        this.setData({
          cinemaName: obj.cinemaName,
          info: res.data.data
        })
      }
    })
  }
})