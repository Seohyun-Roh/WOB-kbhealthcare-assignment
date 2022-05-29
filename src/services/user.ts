import data from 'assets/jsons/user_info.json'

export const fetchUserIdInfo = () => {
  return { id: data.userInfo.userId, name: data.userInfo.name }
}

export const fetchPersonalHealthInfo = () => {
  let gender = '남자'

  if (data.wxcResultMap.paramMap.sex === '1') gender = '남자'
  else if (data.wxcResultMap.paramMap.sex !== '1') gender = '여자'
  else gender = 'Error'

  const dateString = data.userInfo.healthDate

  const dateFormat = `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`

  return {
    name: data.userInfo.userId,
    healthScore: Number(data.userInfo.healthScore),
    userGender: gender,
    age: Number(data.wxcResultMap.paramMap.age),
    height: Number(data.wxcResultMap.paramMap.resHeight),
    date: dateFormat,
  }
}
