Page({
  data:{
    order:null,
    first:true //是否是第一次支付
  },
  onLoad(opt){
    const paramsObj = JSON.parse(opt.paramsStr)
    this.initData(paramsObj)
  },
  initData(order){
    this.setData({
      order
    })
  },
  //减少数量
  minus(){
    if(this.data.order.amount===1){
      return 
    } else {
      this.chanegAmount()
    }
  },
  //增加数量
  plus(){
    this.chanegAmount(1)
  },
  chanegAmount(flag){
    let order = { ...this.data.order }
    let amount = order.amount
    if(flag){
      amount++
    } else {
      amount--
    }
    let total = (amount * order.price).toFixed(1)
    this.setData({
      order: {
        ...order,
        amount,
        total
      }
    })
  },
  //模拟支付
  payment() {
    //避免重复支付
    if (this.data.first) {
      let snackOrder = wx.getStorageSync('snackOrder') || []
      snackOrder.unshift(this.data.order)
      wx.setStorageSync('snackOrder', snackOrder)
      wx.showToast({
        title: '支付成功',
      })
      this.setData({
        first: false
      })
    } else {
      wx.showToast({
        title: '已支付',
        icon: 'none'
      })
    }
  }

})