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
    num: 0, //设置滚动条位置
    size: 0 //电影item的大小（包括margin）
  },
  methods: {
    //选中电影
    selectMovie(e) {
      const movie = (e && e.currentTarget.dataset.movie) || this.properties.defaultSelect || this.data.movies[0]
      if (this.data.movie && movie.id === this.data.movie.id) {
        return
      }
      const index = this.data.movies.findIndex(item => item.id === movie.id)
      if (this.data.size) {
        this.setData({
          movie,
          num: this.data.size * index
        })
      } else {
        this.calcSize().then((size)=>{
          this.setData({
            movie,
            size,
            num: size * index
          })
        })
      }
      this.triggerEvent('selectMovie', {
        movie
      })
    },
    //计算节点大小
    calcSize() {
      return new Promise((resolve, reject)=>{
       const query = wx.createSelectorQuery().in(this)
       query.select(`#item1`).fields({
         size: true,
         computedStyle: ['margin-left']
       }, function (res) {
         let size = 0
         if (res) {
           size = res.width + parseFloat(res['margin-left'])
         }
         resolve(size)
       }).exec()
     })
    },
    test(e) {
      // console.log(e.detail)
    }
  }
})