function friendlyDate(datsStr){
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''
  switch (true){
    case space < 60000 :
      str = '刚刚'
      break;
    case space < 3600*1000 :
      str = Math.floor(space/60000) + '分钟前'
      break;
    case space < 3600*1000*24 :
      str = Math.floor(space/(3600*1000)) + '小时前'
      break;
    case space < 3600*1000*24*30 :
      str = Math.floor(space/(3600*1000*24)) + '天前'
      break;
    case space < 3600*1000*24*30*12 :
      str = Math.floor(space/(3600*1000*24*30)) + '个月前'
      break;
    default: break;
  }
  return str
}

export default {
  friendlyDate
} ;