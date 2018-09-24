
Component({
  properties: {
    movies: {
      type: Array,
      value: [],
      observer: function(movies) {
        if (Array.isArray(movies) && movies.length) {
          this.setData({
            movies
          }, () => {
            this.selectMovie()
          })
        }
      }
    },
    defaultSelect: {
      type: Object,
      value: null,
      observer: function(movie) {
        movie && this.setData({
          movie
        })
      }
    }
  },
  data: {
    movies: [],
    movie: null, //选中的电影
    scrollLeft: 0, //设置滚动条位置
    size: 0, //电影item的大小（包括margin）
    i: 0 //当前电影的索引,下面的函数传递了事件对象后就不能传递其他参数了，所以只能放在data中传递
  },
  methods: {
    //选中电影
    selectMovie(e) {
      const movie = (e && e.currentTarget.dataset.movie) || this.properties.defaultSelect || this.data.movies[this.data.i]
      if (this.data.movie && movie.id === this.data.movie.id) {
        return
      }
      const index = this.data.movies.findIndex(item => item.id === movie.id)
      if (this.data.size) {
        this.setData({
          movie,
          scrollLeft: this.data.size * index
        })
      } else {
        this.calcSize().then((size) => {
          this.setData({
            movie,
            size,
            scrollLeft: size * index
          })
        })
      }
      this.triggerEvent('selectMovie', {
        movie
      })
    },
    //计算节点大小
    calcSize() {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this)
        query.select(`#item1`).fields({
          size: true,
          computedStyle: ['margin-left']
        }, function(res) {
          let size = 0
          if (res) {
            size = res.width + parseFloat(res['margin-left'])
          }
          resolve(size)
        }).exec()
      })
    },
    handleScroll(e) {
    },
    /**
     * 本来想用touchend事件来做滚动结束后“选择电影”功能，但是获取scrollOffset有两三秒的延迟，所以就放弃了这种方法
    handleTouchend(e) {
      const size = this.data.size
      const query = wx.createSelectorQuery().in(this)
      query.select('.swiper-wrapper').scrollOffset((res) => {
        const scrollLeft = res.scrollLeft
        let index = Math.ceil(scrollLeft / size)
        if ((index * size - size / 2) < scrollLeft && (index * size + size / 2)) {

        } else {
          index--
        }
        this.setData({
          i: index
        }, () => {
          this.selectMovie()
        })
      }).exec()
    }
     */
  }
})