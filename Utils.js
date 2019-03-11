const timestampToString = timestamp => {
  const dateIns = new Date(timestamp) //获取一个时间对象

  const fullYear = dateIns.getFullYear() // 获取完整的年份(4位,1970)
  const month = dateIns.getMonth() + 1 // 获取月份(0-11,0代表1月,用的时候记得加上1)
  const date = dateIns.getDate() // 获取日(1-31)
  const time = dateIns.getTime() // 获取时间(从1970.1.1开始的毫秒数)
  const hours = dateIns.getHours() // 获取小时数(0-23)
  const mins = dateIns.getMinutes() // 获取分钟数(0-59)
  const secs = dateIns.getSeconds() // 获取秒数(0-59)

  const nowDateIns = new Date() // 获取当前的时间

  const fullYearNow = nowDateIns.getFullYear() // 获取完整的年份(4位,1970)
  const monthNow = nowDateIns.getMonth() + 1 // 获取月份(0-11,0代表1月,用的时候记得加上1)
  const dateNow = nowDateIns.getDate() // 获取日(1-31)
  const timeNow = nowDateIns.getTime() // 获取时间(从1970.1.1开始的毫秒数)
  const hoursNow = nowDateIns.getHours() // 获取小时数(0-23)
  const minsNow = nowDateIns.getMinutes() // 获取分钟数(0-59)
  const secsNow = nowDateIns.getSeconds() // 获取秒数(0-59)

  let str = ''

  if (fullYear !== fullYearNow) {
    str += `${fullYear}年${month}月${date}日 `
  } else {
    if (month !== monthNow) {
      str += `${month}月${date}日 `
    } else {
      switch (dateNow - date) {
        case 2: {
          str += '前天 '
          break
        }
        case 1: {
          str += '昨天 '
          break
        }
        case 0: {
          break
        }
        default: {
          str += `${month}月${date}日 `
        }
      }
    }
  }
  str +=
    hours < 4
      ? '凌晨'
      : hours < 8
      ? '早上'
      : hours < 12
      ? '上午'
      : hours < 13
      ? '中午'
      : hours < 18
      ? '下午'
      : hours < 19
      ? '傍晚'
      : hours < 23
      ? '晚上'
      : '半夜'
  let hoursToShow = hours
  if (hoursToShow > 12) {
    hoursToShow -= 12
    if (hoursToShow === 0) {
      hoursToShow = 12
    }
  }
  str += `${hoursToShow.toString(10).padStart(2, '0')}:${mins
    .toString(10)
    .padStart(2, '0')}`

  return str
}

module.exports = exports = { timestampToString }
