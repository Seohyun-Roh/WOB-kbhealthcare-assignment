import styles from './userInfo.module.scss'
import { HealthInfoArrow } from 'assets/svgs'
import { VictoryPie } from 'victory'

const HealthScore = ({ healthScore, date }: { healthScore: number; date: string }) => {
  const percent = (healthScore / 1000) * 100
  const total = 100 - percent

  return (
    <div className={styles.healthScoreContainer}>
      <div className={styles.healthScoreChartContainer}>
        <VictoryPie
          data={[
            { x: 1, y: total },
            { x: 2, y: percent },
          ]}
          labels={() => null}
          startAngle={130}
          endAngle={-130}
          animate={{
            duration: 1000,
            easing: 'bounce',
            onLoad: { duration: 1000 },
          }}
          innerRadius={120}
          colorScale={['#eeeeee', '#ffd300']}
        />
      </div>
      <div className={styles.scoreBox}>
        <h3 className={styles.score}>{healthScore}</h3>
        <span>점</span>
      </div>
      <p className={styles.date}>{date}</p>
      <button type='button'>
        건강검진결과 가져오기
        <HealthInfoArrow className={styles.healthInfoArrowIcon} />
      </button>
    </div>
  )
}

export default HealthScore
