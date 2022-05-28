import styles from './userInfo.module.scss'
import { HealthInfoArrow } from 'assets/svgs'

const HealthScore = () => {
  return (
    <div className={styles.healthScoreContainer}>
      {/* HealthScore 차트 부분. 차트 크기: 250 x 250 */}
      <p className={styles.date}>2021.08.20</p>
      <p>
        건강검진결과 가져오기
        <HealthInfoArrow className={styles.healthInfoArrowIcon} />
      </p>
    </div>
  )
}

export default HealthScore
