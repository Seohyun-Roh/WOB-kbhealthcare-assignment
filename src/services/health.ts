import data from 'assets/jsons/user_info.json'
import {
  getScoreDiffGroupAverageMessage,
  getScoreDiffLastYearMessage,
  getCostDiffAfterTenYearsMessage,
  getScoreDiffAfterTenYearsMessage,
  getStatusMessage,
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
  const scoreAndYears = YEARLY_SCORE.map((yearData) => ({
    value: Number(yearData.SCORE),
    x: yearData.SUBMIT_DATE.slice(0, 4),
  }))

  const currentYear = new Date().getFullYear()
  const targetYear = scoreAndYears?.[scoreAndYears.length - 2].x ?? 0
  const yearMessage = currentYear - 1 === Number(targetYear) ? '지난해' : `${targetYear}년`

  let scoreComparedToPreviousYear = 0
  let message = { startMessage: '', endMessage: '' }

  if (scoreAndYears.length > 2) {
    scoreComparedToPreviousYear = calculation(
      YEARLY_SCORE[YEARLY_SCORE.length - 1].SCORE,
      YEARLY_SCORE[YEARLY_SCORE.length - 2].SCORE
    )
    message = getScoreDiffLastYearMessage(scoreComparedToPreviousYear, yearMessage)
  } else if (scoreAndYears.length === 1) {
    const { x, value } = scoreAndYears[0]
    message.startMessage = `${x}년 건강점수는`
    message.endMessage = `${value}점입니다`
  } else {
    message.startMessage = '연도별 건강점수가 아직 없습니다'
    message.endMessage = ''
  }

  return {
    message,
    status: getStatusMessage(scoreComparedToPreviousYear),
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
    status: getStatusMessage(result),
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
    status: getStatusMessage(compareToFuture),
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
    status: getStatusMessage(expenseComparedToFuture),
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
