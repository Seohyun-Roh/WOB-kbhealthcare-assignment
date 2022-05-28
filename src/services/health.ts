import data from 'assets/jsons/user_info.json'
import { getScoreDiffMessage } from 'utils/message'
import { calculation } from 'utils/math'
import { YearsType } from 'types/health'

interface IHealthManageData {
  [key: string]: string
}

const YEARLY_SCORE = data.healthScoreList
const USER_SCORE = data.wxcResultMap.wHscore

const removeStringifiedArray = (array: string) => {
  return JSON.parse(array)
}

export const fetchUserIdInfo = () => {
  return data.userInfo.userId
}

export const fetchPersonalHealthInfo = () => {
  let gender = '남자'

  if (data.wxcResultMap.paramMap.sex === '1') gender = '남자'
  else if (data.wxcResultMap.paramMap.sex !== '1') gender = '여자'
  else gender = 'Error'

  console.log('1번', [
    {
      name: data.userInfo.name,
      healthScore: Number(data.userInfo.healthScore),
      userGender: gender,
      age: Number(data.wxcResultMap.paramMap.age),
      height: Number(data.wxcResultMap.paramMap.resHeight),
    },
  ])

  return [
    {
      name: data.userInfo.userId,
      healthScore: Number(data.userInfo.healthScore),
      userGender: gender,
      age: Number(data.wxcResultMap.paramMap.age),
      height: Number(data.wxcResultMap.paramMap.resHeight),
    },
  ]
}

export const fetchYearsChartInfo = () => {
  const scoreComparedToPreviousYear = calculation(
    YEARLY_SCORE[YEARLY_SCORE.length - 1].SCORE,
    YEARLY_SCORE[YEARLY_SCORE.length - 2].SCORE
  )

  let minusOrPlus = '동일해요'

  if (scoreComparedToPreviousYear < 0) minusOrPlus = `${Math.abs(scoreComparedToPreviousYear)}점 낮아졌어요.`
  else if (scoreComparedToPreviousYear > 0) minusOrPlus = `${scoreComparedToPreviousYear}점 높아졌어요.`
  else if (scoreComparedToPreviousYear === 0) minusOrPlus = '동일해요.'
  else minusOrPlus = 'Error'

  const value = YEARLY_SCORE.map((score) => score.SCORE)
  const year = YEARLY_SCORE.map((date) => date.SUBMIT_DATE.slice(0, 4))

  const scoreAndYears: YearsType[] = []

  value.forEach((score, i) => {
    let obj: YearsType = {}
    obj.value = Number(score)
    obj.year = year[i]
    scoreAndYears.push(obj)
  })

  console.log('2번', {
    comparison: minusOrPlus,
    yearsInfo: scoreAndYears,
  })

  return {
    comparison: minusOrPlus,
    yearsInfo: scoreAndYears,
  }
}

export const fetchAverageInfo = () => {
  const calculatedPercent = Math.round(100 - Number(data.wxcResultMap.hscorePercent))

  let percent = `${calculatedPercent}%`

  if (calculatedPercent <= 49) percent = `하위 ${calculatedPercent}%`
  else if (calculatedPercent >= 50) percent = '상위 ${calculatedPercent}%'
  else percent = 'Error'

  const result = calculation(USER_SCORE, data.wxcResultMap.hscore_peer)

  let comparision = `${result}점`

  if (result < 0) comparision = `${Math.abs(result)}점 낮아요.`
  else if (result > 0) comparision = `${result}점 높아요.`
  else if (result === 0) comparision = '평균과 같아요'
  else comparision = 'Error'

  console.log('3번', {
    percent,
    comparision,
    score: [
      {
        myScore: Number(USER_SCORE),
        averageScore: Number(data.wxcResultMap.hscore_peer),
      },
    ],
  })

  return {
    percent,
    comparision,
    score: [
      {
        myScore: Number(USER_SCORE),
        averageScore: Number(data.wxcResultMap.hscore_peer),
      },
    ],
  }
}

const healthForecast = () => {
  const removeStringified = removeStringifiedArray(data.wxcResultMap.wHscoreDy)

  const forecastValue = removeStringified[removeStringified.length - 1]

  const compareToFuture = calculation(USER_SCORE, forecastValue)

  let comparison = `${compareToFuture}점`

  if (compareToFuture < 0) comparison = `${Math.abs(compareToFuture)}점 높아요.`
  else if (compareToFuture > 0) comparison = `${compareToFuture}점 낮아요.`
  else if (compareToFuture === 0) comparison = '현재와 같아요'
  else comparison = 'Error'

  return {
    comparison,
    score: [
      {
        myScore: Number(USER_SCORE),
        forecastValue,
      },
    ],
  }
}

const expenseForecast = () => {
  const currentExpenseString = data.wxcResultMap.medi

  const forecastArray = removeStringifiedArray(data.wxcResultMap.mediDy)

  const forecastValue = forecastArray[forecastArray.length - 1]

  const formatValue = forecastValue.toLocaleString()

  const expenseComparedToFuture = calculation(currentExpenseString, forecastValue)

  let comparison = `${expenseComparedToFuture}원`

  if (expenseComparedToFuture < 0) comparison = `${Math.abs(expenseComparedToFuture).toLocaleString()}원 많아요.`
  else if (expenseComparedToFuture > 0) comparison = `${expenseComparedToFuture.toLocaleString()}원 적어요.`
  else if (expenseComparedToFuture === 0) comparison = '현재와 같아요'
  else comparison = 'Error'

  const expense = Number(currentExpenseString).toLocaleString()

  return {
    comparison,
    score: [
      {
        myScore: expense,
        forecastValue: formatValue,
      },
    ],
  }
}

export const fetchForecastInfo = () => {
  console.log('4번', {
    health: healthForecast(),
    expense: expenseForecast(),
  })
  return { health: healthForecast(), expense: expenseForecast() }
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

  const healthMangeCardData = property.map((value) => {
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
    healthMangeCardData,
  }
}

export const getScoreDatas = () => {
  const { wxcResultMap, healthScoreList: yearData } = data
  const { wHscore, medi, hscore_peer: hscorePeer, wHscoreDy, mediDy, hscorePercent, paramMap } = wxcResultMap
  const { age, sex: sexCode } = paramMap

  const myScore = Number(wHscore)
  const currentCost = Number(medi)
  const groupAverage = Number(hscorePeer)
  const expectScoreAfterTenYears = Number(JSON.parse(wHscoreDy).pop())
  const expectCostAfterTenYears = Number(JSON.parse(mediDy).pop())
  const myScoreGroupPercent = 100 - Number(hscorePercent)
  const ageGroupNumber = Number(age) - (Number(age) % 10)
  const ageGroup = ageGroupNumber >= 10 ? `${ageGroupNumber}대` : `10대 미만`
  const sex = Number(sexCode) === 1 ? '남성' : '여성'
  const currentYear = new Date().getFullYear()
  const scoreLastYear = Number(yearData.find((d) => currentYear - 1 === Number(d.SUBMIT_DATE.slice(0, 4)))?.SCORE)

  const diffScoreLastYear = myScore - scoreLastYear
  const diffScoreGroupAverage = myScore - groupAverage
  const diffScoreAfterTenYear = expectScoreAfterTenYears - myScore
  const diffCostAfterTenYear = expectCostAfterTenYears - currentCost

  return {
    diffScoreLastYear,
    diffScoreGroupAverage,
    diffScoreAfterTenYear,
    diffCostAfterTenYear,
    yearData,
    myScoreGroupPercent,
    ageGroup,
    sex,
  }
}

const getScoreDiffMessageAll = () => {
  const {
    diffScoreLastYear,
    diffScoreGroupAverage,
    diffScoreAfterTenYear,
    diffCostAfterTenYear,
    yearData,
    myScoreGroupPercent,
    ageGroup,
    sex,
  } = getScoreDatas()

  let diffScoreLastYearMessage = getScoreDiffMessage('lastYear', diffScoreLastYear)
  const diffScoreGroupAverageMessage = getScoreDiffMessage('groupAverage', diffScoreGroupAverage, ageGroup, sex)
  const diffScoreAfterTenYearMessage = getScoreDiffMessage('scoreAfterTenYears', diffScoreAfterTenYear)
  const diffCostAfterTenYearMessage = getScoreDiffMessage('costAfterTenYears', diffCostAfterTenYear)
  const myScoreGroupPercentMessage = `상위 ${myScoreGroupPercent}%`

  if (yearData.length === 1)
    diffScoreLastYearMessage = `${yearData[0].SUBMIT_DATE.slice(0, 4)}년 건강 점수는 ${yearData[0].SCORE}점 입니다`
  if (yearData.length === 0) diffScoreLastYearMessage = '연도별 건강 점수가 아직 없습니다'

  return {
    diffScoreLastYearMessage,
    diffScoreGroupAverageMessage,
    diffScoreAfterTenYearMessage,
    diffCostAfterTenYearMessage,
    myScoreGroupPercentMessage,
  }
}
