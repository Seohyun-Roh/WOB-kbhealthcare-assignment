import data from 'assets/jsons/user_info.json'
import { getScoreDiffMessage } from 'utils/message'

const getScoreDatas = () => {
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

export { getScoreDiffMessageAll }
