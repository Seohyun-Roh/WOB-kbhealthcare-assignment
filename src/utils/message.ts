type CompareTarget = 'lastYear' | 'groupAverage' | 'scoreAfterTenYears' | 'costAfterTenYears'
type Message = { increased: string; same: string; decreased: string }
type IWords = {
  [key in CompareTarget]: {
    startMessage: Message
    endMessage: Message
  }
}

const words: IWords = {
  lastYear: {
    startMessage: {
      increased: '건강 점수는 총점이 지난해 보다',
      same: '건강 점수는 총점이 지난해 평균과',
      decreased: '건강 점수는 총점이 지난해 보다',
    },
    endMessage: { increased: '점 높아졌어요', same: '같아요', decreased: '점 낮아졌어요' },
  },
  groupAverage: {
    startMessage: {
      increased: '평균점수보다',
      same: '평균점수와',
      decreased: '평균점수보다',
    },
    endMessage: { increased: '점 높아요', same: '같아요', decreased: '점 낮아요' },
  },
  scoreAfterTenYears: {
    startMessage: {
      increased: '10년 후 예상 건강점수는 현재 보다',
      same: '10년 후 예상 건강점수는 현재와',
      decreased: '10년 후 예상 건강점수는 현재 보다',
    },
    endMessage: { increased: '점 높아요', same: '같아요', decreased: '점 낮아요' },
  },
  costAfterTenYears: {
    startMessage: {
      increased: '10년 후 예상 의료비는 현재 보다',
      same: '10년 후 예상 의료비는 현재와',
      decreased: '10년 후 예상 의료비는 현재 보다',
    },
    endMessage: { increased: '원 높아요', same: '같아요', decreased: '원 낮아요' },
  },
}

export const getScoreDiffMessage = (compareTarget: CompareTarget, diff: number, ageGroup?: string, sex?: string) => {
  if (!Object.keys(words).includes(compareTarget)) return '-'

  let { startMessage, endMessage } = words[compareTarget]

  if (compareTarget === 'groupAverage') {
    startMessage = {
      increased: `${ageGroup} ${sex} ${startMessage.increased}`,
      decreased: `${ageGroup} ${sex} ${startMessage.decreased}`,
      same: `${ageGroup} ${sex} ${startMessage.same}`,
    }
  }

  if (diff === 0) return { startMessage: startMessage.same, endMessage: endMessage.same, diff }
  if (diff > 0) return { startMessage: startMessage.increased, endMessage: `${diff}${endMessage.increased}`, diff }
  return { startMessage: startMessage.decreased, endMessage: `${diff}${endMessage.decreased}`, diff }
}
