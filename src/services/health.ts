import data from 'assets/jsons/user_info.json'
import {
  getScoreDiffGroupAverageMessage,
  getScoreDiffLastYearMessage,
  getCostDiffAfterTenYearsMessage,
  getScoreDiffAfterTenYearsMessage,
} from 'utils/message'
import { calculation } from 'utils/math'
import { ScoreType } from 'types/health'

interface IHealthManageData {
  [key: string]: string
}

const YEARLY_SCORE = data.healthScoreList
const USER_SCORE = data.wxcResultMap.wHscore

const removeStringifiedArray = (array: string) => {
  return JSON.parse(array)
}

export const fetchUserIdInfo = () => {
  return { id: data.userInfo.userId, name: data.userInfo.name }
}

export const fetchPersonalHealthInfo = () => {
  let gender = '남자'

  if (data.wxcResultMap.paramMap.sex === '1') gender = '남자'
  else if (data.wxcResultMap.paramMap.sex !== '1') gender = '여자'
  else gender = 'Error'

  return {
    name: data.userInfo.userId,
    healthScore: Number(data.userInfo.healthScore),
    userGender: gender,
    age: Number(data.wxcResultMap.paramMap.age),
    height: Number(data.wxcResultMap.paramMap.resHeight),
  }
}

export const fetchYearsChartInfo = () => {
  const scoreComparedToPreviousYear = calculation(
    YEARLY_SCORE[YEARLY_SCORE.length - 1].SCORE,
    YEARLY_SCORE[YEARLY_SCORE.length - 2].SCORE
  )
  const currentYear = new Date().getFullYear()
  const scoreLastYear = Number(YEARLY_SCORE.find((d) => currentYear - 1 === Number(d.SUBMIT_DATE.slice(0, 4)))?.SCORE)

  const message = getScoreDiffLastYearMessage(scoreComparedToPreviousYear)

  const value = YEARLY_SCORE.map((score) => score.SCORE)
  const year = YEARLY_SCORE.map((date) => date.SUBMIT_DATE.slice(0, 4))

  const scoreAndYears: ScoreType[] = []

  if (year.length === 0) {
    message.startMessage = '연도별 건강점수가 아직 없습니다'
    message.endMessage = ''
  }

  if (year.length === 1) {
    message.startMessage = `${year[0]}년 건강점수는`
    message.endMessage = `${value[0]}점입니다`
  }

  value.forEach((score, i) => {
    const obj: ScoreType = {}

    obj.x = year[i]
    obj.value = Number(score)
    scoreAndYears.push(obj)
  })

  return {
    message,
    diff: scoreComparedToPreviousYear,
    yearsInfo: scoreAndYears,
  }
}

export const fetchAverageInfo = () => {
  const { userGender, age } = fetchPersonalHealthInfo()
  const dividedAge = age - (age % 10)
  const ageGroup = dividedAge >= 10 ? `${dividedAge}대` : '10대 미만'

  const calculatedPercent = Math.round(100 - Number(data.wxcResultMap.hscorePercent))

  let percent = `${calculatedPercent}%`

  if (calculatedPercent <= 49) percent = `하위 ${calculatedPercent}%`
  else if (calculatedPercent >= 50) percent = `상위 ${calculatedPercent}%`
  else percent = 'Error'

  const result = calculation(USER_SCORE, data.wxcResultMap.hscore_peer)

  const message = getScoreDiffGroupAverageMessage(result, ageGroup, userGender)

  return {
    percent,
    message,
    diff: result,
    score: [
      { x: '나', value: Number(USER_SCORE) },
      { x: '30대 남성', value: Number(data.wxcResultMap.hscore_peer) },
    ],
  }
}

export const healthForecast = () => {
  const removeStringified = removeStringifiedArray(data.wxcResultMap.wHscoreDy)

  const forecastValue = removeStringified[removeStringified.length - 1]

  const compareToFuture = calculation(forecastValue, USER_SCORE)

  const message = getScoreDiffAfterTenYearsMessage(compareToFuture)

  return {
    diff: compareToFuture,
    message,
    score: [
      { x: '나', value: Number(USER_SCORE) },
      { x: '10년 후', value: forecastValue },
    ],
  }
}

export const expenseForecast = () => {
  const currentExpenseString = data.wxcResultMap.medi

  const forecastArray = removeStringifiedArray(data.wxcResultMap.mediDy)

  const forecastValue = forecastArray[forecastArray.length - 1]

  const formatValue = forecastValue.toLocaleString()

  const expenseComparedToFuture = calculation(forecastValue, currentExpenseString)

  const message = getCostDiffAfterTenYearsMessage(expenseComparedToFuture)

  const expense = Number(currentExpenseString).toLocaleString()

  return {
    diff: expenseComparedToFuture,
    message,
    score: [
      { x: '나', value: expense },
      { x: '10년 후', value: formatValue },
    ],
  }
}

export const fetchForecastInfo = () => {
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
