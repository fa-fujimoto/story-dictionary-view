const dayList = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
]

function zeroPadding(num: number): string {
  return ('0' + num).slice(-2)
}

export const dateFormat = (date: Date): string => {
  const year = date.getFullYear()
  const month = zeroPadding(date.getMonth() + 1)
  const day = zeroPadding(date.getDate())
  const week = dayList[date.getDay()]
  const hour = zeroPadding(date.getHours())
  const min = zeroPadding(date.getMinutes())
  const sec = zeroPadding(date.getSeconds())
  return (
    `${year}-${month}-${day} ${week} ${hour}:${min}:${sec}`
  )
}