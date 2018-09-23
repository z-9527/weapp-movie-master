Component({
  properties: {
    movies: {
      type: Array,
      value: [],
      observer: function(movies) {
        if (Array.isArray(movies) && movies.length){
          this.setData({
            movies
          }, () => {
            this.selectMovie()
          })
        }
      }
    },
    defaultSelect:{
      type:Object,
      value:null,
      observer: function (movie){
        movie && this.setData({
          movie
        })
      }
    }
  },
  data: {
    movies: [],
    movie:null //选中的电影
  },
  methods: {
    //选中电影
   selectMovie(e){
     const movie = (e && e.currentTarget.dataset.movie) || this.properties.defaultSelect || this.data.movies[0]
     if (movie === this.data.movie) {
       return
     }
     this.setData({
       movie
     })
     this.triggerEvent('selectMovie', {
       movie
     })
   }
  }
})