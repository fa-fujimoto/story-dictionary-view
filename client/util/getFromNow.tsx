const getFromNow = (date: string): string => {
  const from = new Date(date)

  // 現在時刻との差分＝経過時間
  const diff = new Date().getTime() - from.getTime()
  // 経過時間をDateに変換
  const elapsed = new Date(diff)

  // 大きい単位から順に表示
  if (elapsed.getUTCFullYear() - 1970) {
    return elapsed.getUTCFullYear() - 1970 + '年前'
  } else if (elapsed.getUTCMonth()) {
    return elapsed.getUTCMonth() + 'ヶ月前'
  } else if (elapsed.getUTCDate() - 1) {
    return elapsed.getUTCDate() - 1 + '日前'
  } else if (elapsed.getUTCHours()) {
    return elapsed.getUTCHours() + '時間前'
  } else if (elapsed.getUTCMinutes()) {
    return elapsed.getUTCMinutes() + '分前'
  } else {
    return 'たった今'
  }
}

export default getFromNow