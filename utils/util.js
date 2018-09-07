const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getToday = (day) => {
  const today = new Date()
  return formatTime(new Date()).split(' ')[0]
}

//获取从“今天开始的7天”。本来这数据是由接口返回的，但是缺少城市ID参数，就没有返回，所以自己模拟7天
const todayTomorrow = ['今天', '明天', '后天']
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const getSevenDay = () => {
  let days = []
  const todayNum = new Date().getDate()
  for (let i = 0; i < 7; i++) {
    //获取日期
    let day = new Date()
    day.setDate(todayNum + i)
    //获取类似 “后天9月1日” 的字符串
    const title = `${i < 3 ? todayTomorrow[i] : week[day.getDay()]}${day.getMonth() + 1}月${day.getDate()}日`
    days.push({
      title,
      day: formatTime(day).split(' ')[0]
    })
  }
  return days
}

module.exports = {
  formatTime: formatTime,
  getToday,
  getSevenDay
}