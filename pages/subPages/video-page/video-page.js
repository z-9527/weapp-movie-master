Page({
  data:{
    info:null,
    current:-1   //当前播放视频索引
  },
  onLoad(opt){
    const paramsObj = JSON.parse(opt.paramsStr)
    this.initData(paramsObj)
  },
  initData(obj){
    console.log(obj)
    this.setData({
      info:obj
    },()=>{
      this.setCurrent(0)
    })
  },
  //设置当前播放视频
  setCurrent(current){
    const info = this.data.info
    wx.setNavigationBarTitle({
      title: `${info.movieName} ${info.videoList[current].videoName}`,
    })
    this.setData({
      current
    })
  }
})