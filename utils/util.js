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

const getToday = () => {
  const today = new Date()
  return formatTime(new Date()).split(' ')[0]
}

const calcTime = (time) => {
  const day = new Date(time)
  const now = new Date()
  const result = now.getTime() - day.getTime()
  if (now.getFullYear() !== day.getFullYear()) {
    return day.split(' ')[0]
  }
  //一分钟前评论
  if (result < 60000) {
    return '刚刚'
  }
  if (60000 <= result && result < 3600000) {
    return `${Math.floor(result / 60000)}分钟前`
  }
  if (3600000 <= result && result < 86400000){
    return `${Math.floor(result / 3600000)}小时前`
  }
  if (86400000 <= result && result < 604800000) {
    return `${Math.floor(result / 86400000)}天前`
  }
  return `${formatNumber(day.getMonth() + 1)}-${formatNumber(day.getDate())}`
 
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  getToday,
  calcTime
}