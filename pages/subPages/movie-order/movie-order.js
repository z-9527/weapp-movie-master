Page({
  data:{
    orderList:[]
  },
  onLoad(){
    this.initData()
  },
  initData(){
    const orderList = wx.getStorageSync('movieOrder') || []
    this.setData({
      orderList
    })
  },
  //删除订单
  deleteOrder(e){
    const index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList.slice();
    orderList.splice(index,1)
    wx.showModal({
      title: '提示',
      content: '确认删除订单吗？',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            orderList
          })
          wx.setStorageSync('movieOrder', orderList)
        }
      }
    })
  }
})