const util = require('../../../utils/util.js')
const getRandom = util.getRandom
Page({
  data:{
    seat:''
  },
  onLoad(params){
    this.initData(params)
  },
  initData(params){
    this.setData({
      seat: `${getRandom(1, 21)}排${getRandom(1, 21)}座`
    })
  }
})