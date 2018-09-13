const util = require('../../utils/util.js')

Component({
  properties: {
    startTime: {
      type:String,
      value: util.getToday(),
      observer:function(start){
        start && this.getWeek(start)        
      }
    },
    defaultSelect:{
      type:String,
      value: ''
    }
  },
  data:{
    selectDay:'',
    days:[]
  },
  methods:{
    //获取7天时间列表
    getWeek(startTime){
      const todayTomorrow = ['今天', '明天', '后天']
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let days = []
      //当开始时间大于今天时，日期从大的时间开始算（主要是为了“预售”时间）
      let start = util.getToday()
      if (startTime > start){  //都是“2018-09-12”的格式，所以可以直接相减，否则转化为毫秒在相减
        start = startTime
      }
      for(let i=0;i<7;i++){
        let day = new Date(start)
        day.setDate(day.getDate() + i)  //往后推几天
        const num = (day - new Date(util.getToday())) / (1000 * 60 * 60 * 24)  //计算相隔几天，减少必须是“今天”0时0分
        days.push({
            title: `${todayTomorrow[num] || week[day.getDay()]}${day.getMonth() + 1}月${day.getDate()}日`,   //获取类似 “后天9月1日” 的字符串
          day:util.formatTime(day).split(' ')[0]
        })
      }
      this.setData({
        days,
        selectDay: this.properties.defaultSelect || days[0].day
      },()=>{
        this.triggerEvent('selectDayEvent', { day: this.data.selectDay })        
      })
    },
    selectDay(e){
      const day = e.currentTarget.dataset.day
      if (day === this.data.selectDay){
        return
      }
      this.setData({
        selectDay:day
      })
      this.triggerEvent('selectDayEvent',{day})
    }
  }

})