import { fetchAverageInfo, fetchForecastInfo, fetchYearsChartInfo } from 'services/health'
import { ScoreType } from 'types/health'

import styles from './healthCharts.module.scss'
import ScoreChart from '../_components/Chart'

const HealthCharts = () => {
  const { yearsInfo } = fetchYearsChartInfo()
  const { score: averageScore } = fetchAverageInfo()
  const { score: healthScore } = fetchForecastInfo().health
  const { score: expenseScore } = fetchForecastInfo().expense

  // datum은 CallbackArgs 타입 안에 있는 값 중 any 타입
  const setColor = (data: ScoreType[], datum: any, myColor: string, elseColor: string, isYears: boolean) => {
    if (isYears) return datum.x === data[data.length - 1].x ? myColor : elseColor
    return datum.x === '나' ? myColor : elseColor
  }

  return (
    <>
      <section className={styles.container}>
        <h2>
          나의 건강점수 <br /> 분석결과
        </h2>
        <button type='button' className={styles.detail}>
          검진결과 자세히
        </button>
        <p className={styles.compare}>
          총점이
          <br />
          지난해 보다 <mark>13점 낮아졌어요</mark>
        </p>
        <ScoreChart data={yearsInfo} setColor={setColor} isYears />
        <p className={styles.compare}>
          10년 후 예상 건강점수는
          <br />
          현재보다 <mark>85점 낮아요</mark>
        </p>
        <ScoreChart data={averageScore} setColor={setColor} isYears={false} />
      </section>
      <section className={styles.container}>
        <h2>나의 10년 후 건강 예측</h2>
        <p className={styles.compare}>
          10년 후 예상 건강점수는
          <br />
          현재보다 <mark>85점 낮아요</mark>
        </p>
        <ScoreChart data={healthScore} setColor={setColor} isYears={false} />
        <p className={styles.compare}>
          10년 후 예상 의료비는 <br />
          현재보다 <mark>36,120원 낮아요</mark>
        </p>
        <ScoreChart data={expenseScore} setColor={setColor} isYears={false} />
      </section>
    </>
  )
}

export default HealthCharts
