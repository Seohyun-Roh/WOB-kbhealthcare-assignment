import { processHealthManageCardData } from './utils'
import { IHealthManageCardData } from 'types/health'
import { cx } from 'styles'
import styles from './healthManageCard.module.scss'

const HealthManageCard = ({
  healthManageCardData,
  idx,
}: {
  healthManageCardData: IHealthManageCardData
  idx: number
}) => {
  const { tag } = healthManageCardData
  const boj = healthManageCardData.boj.slice(1)

  const { title, value, isSmkDrnkExerciseDetail, standardOfNormal, svg } = processHealthManageCardData(
    healthManageCardData.title,
    healthManageCardData
  )

  return (
    <li className={styles.healthCard}>
      <div className={styles.icon}>{svg}</div>
      <div className={styles.info}>
        <h3>0{idx}</h3>
        <p className={cx(styles.healthTitle, styles[healthManageCardData.title])}>{title}</p>
        <p className={styles.detail}>
          {isSmkDrnkExerciseDetail || (
            <>
              {title} {value}로 <br />
              <mark>{healthManageCardData.boj[0]}</mark> 입니다.
            </>
          )}
        </p>
        {standardOfNormal && <p className={styles.normal}>{standardOfNormal}</p>}
        <ul className={styles.tag}>
          {tag.map((el) => {
            if (el) {
              return <li key={`key_${el}`}>#{el}</li>
            }
            return null
          })}
        </ul>
      </div>
      <div className={styles.manage}>
        <h4 className={styles[healthManageCardData.title]}>이렇게 관리해 보세요!</h4>
        <ul>
          {boj.map((el) => {
            return <li key={`key_${el}`}>{el}</li>
          })}
        </ul>
      </div>
    </li>
  )
}

export default HealthManageCard
