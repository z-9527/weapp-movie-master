const util = require('../../../utils/util.js')
const getRandom = util.getRandom
Page({
  data: {
    info: null,
    videoList:[],//播放列表
    current: -1 //当前播放视频索引
  },
  onLoad(opt) {
    const paramsObj = JSON.parse(opt.paramsStr)
    this.initData(paramsObj)
  },
  initData(obj) {
    //没有获取video列表的API，所以只能根据自己模拟一个列表
    const random = getRandom(1,10)
    let videoList = new Array(random).fill(obj.video)
    console.log(random)
    this.setData({
      videoList,
      info: obj,
    }, () => {
      this.setCurrent(0)
    })
  },
  //设置当前播放视频
  setCurrent(current) {
    const { info, videoList} = this.data
    wx.setNavigationBarTitle({
      title: `${info.movieName} ${videoList[current].videoName}`,
    })
    this.setData({
      current
    })
  },
  //播放列表的点击事件
  selectItem(e){
    const index = e.currentTarget.dataset.index
    this.setCurrent(index)
  },
  goTo() {
    const info = this.data.info;
    const VideoContext = wx.createVideoContext('my-video', this);
    VideoContext.pause()
    wx.navigateTo({
      url: `../select-cinema/select-cinema?movieId=${info.id}&movieName=${info.movieName}&showTime=${info.rt}`,
    })
  }
})