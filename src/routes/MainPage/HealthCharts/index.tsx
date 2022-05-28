import styles from './healthCharts.module.scss'
import YearsChart from './YearsChart'
import AverageChart from './AverageChart'
import ForecastChart from './ForecastChart'

const HealthCharts = () => {
  return (
    <>
      <section className={styles.container}>
        <h2>
          나의 건강점수 <br /> 분석결과
        </h2>
        <p className={styles.detail}>검진결과 자세히</p>
        <p className={styles.compare}>
          총점이
          <br />
          지난해 보다 <mark>13점 낮아졌어요</mark>
        </p>
        <YearsChart />
        <p className={styles.compare}>
          10년 후 예상 건강점수는
          <br />
          현재보다 <mark>85점 낮아요</mark>
        </p>
        <AverageChart />
      </section>
      <section className={styles.container}>
        <h2>나의 10년 후 건강 예측</h2>
        <p className={styles.compare}>
          10년 후 예상 건강점수는
          <br />
          현재보다 <mark>85점 낮아요</mark>
        </p>
        <ForecastChart />
      </section>
    </>
  )
}

export default HealthCharts
