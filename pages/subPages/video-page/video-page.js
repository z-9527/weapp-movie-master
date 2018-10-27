const util = require('../../../utils/util.js')
const getRandom = util.getRandom
Page({
  data: {
    info: null,
    videoList: [], //播放列表
    current: -1 //当前播放视频索引
  },
  onLoad(opt) {
    const paramsObj = JSON.parse(opt.paramsStr)
    this.initData(paramsObj)
  },
  initData(obj) {
    //没有获取video列表的API，所以只能自己模拟一个播放列表
    const random = getRandom(1, 4)
    // const videoList = new Array(random).fill(obj.video)
    const videoList = [{
        ...obj.video
      },
      {
        videoImg: 'https://p0.meituan.net/movie/bf98c928c915aafe9b44a55c1d6b6d1025670.jpg',
        videoName: '今日爆燃上映 十月最爽解压大片没有之一',
        videourl: 'https://maoyan.meituan.net/movie/videos/854x4806c4105439189467588ce837ee08bc123.mp4',
      }, {
        videoImg: 'https://p0.meituan.net/movie/f87a64c44eaa0216d541fb6f013eba4123888.jpg',
        videoName: '小美好”版终极预告片 今年最减龄减压的青春片！',
        videourl: 'https://maoyan.meituan.net/movie/videos/854x48041256160be8947b182921987f3e9da4c.mp4',
      }, {
        videoImg: 'https://p1.meituan.net/movie/2e0b6243ca72bc212f5288be3d36f41225058.jpg',
        videoName: '悲伤逆流成河 终极预告片',
        videourl: 'https://maoyan.meituan.net/movie/videos/854x480ba7b338968d44f90a099254eea294ef0.mp4',
      }
    ]
    this.setData({
      videoList,
      info: obj,
    }, () => {
      this.setCurrent(0)
    })
  },
  //设置当前播放视频
  setCurrent(current) {
    const {
      info,
      videoList
    } = this.data
    wx.setNavigationBarTitle({
      title: `${info.movieName} ${videoList[current].videoName}`,
    })
    this.setData({
      current
    })
  },
  //播放列表的点击事件
  selectItem(e) {
    const index = e.currentTarget.dataset.index
    if (index !== this.data.current) {
      this.setCurrent(index)
    }
  },
  //视频播放结束
  endHandle() {
    const {
      current,
      videoList
    } = this.data
    let index = current + 1
    if (index === videoList.length) {
      index = 0
    }
    this.setCurrent(index)
  },
  //播放错误时
  errorHandle() {
    wx.showToast({
      title: '播放错误',
      icon: 'none'
    })
  },
  //购票
  goTo() {
    const info = this.data.info;
    const VideoContext = wx.createVideoContext('my-video', this);
    VideoContext.pause()
    wx.navigateTo({
      url: `../select-cinema/select-cinema?movieId=${info.id}&movieName=${info.movieName}&showTime=${info.rt}`,
    })
  }
})