import data from 'assets/jsons/user_info.json'

interface IHealthManageData {
  [key: string]: string
}

export const getHealthManageData = () => {
  const property = [
    'resBMI',
    'resBloodPressure',
    'resTotalCholesterol',
    'smkQty',
    'resFastingBloodSuger',
    'drnkQty',
    'resGFR',
    'exerciQty',
  ]

  const { healthTagList, userInfo, wxcResultMap } = data

  const userScore = Number(userInfo.healthScore)
  const wMymaxHscoreDy = JSON.parse(wxcResultMap.wMymaxHscoreDy).filter((val: number) => val > userScore)

  const { boj, paramMap }: { boj: IHealthManageData; paramMap: IHealthManageData } = wxcResultMap

  const healthManageCardData = property.map((value) => {
    const tag: string[] = []
    healthTagList.forEach((currentValue) => {
      if (currentValue.tagId === value) tag.push(currentValue.tag1, currentValue.tag2, currentValue.tag3)
    })

    const splitedBoj = boj[value].split(' - ')
    if (value === 'smkQty') splitedBoj[0] = '비흡연 중입니다.'
    else if (value === 'drnkQty') splitedBoj[0] = '1주일간 음주를 하지 않고 있습니다.'
    else if (value === 'exerciQty') splitedBoj[0] = '1주일간 운동을 하지 않고 있습니다.'

    return {
      title: value,
      value: paramMap[value],
      boj: splitedBoj,
      tag,
    }
  })

  return {
    wMymaxHscoreDy,
    healthManageCardData,
  }
}
