import styles from './healthManage.module.scss'
import { data } from '../_components/HealthManageCard/dummyHealthManageCardData'
import HealthManageCard from '../_components/HealthManageCard'

const HealthManage = () => {
  const { wMymaxHscoreDy, dummyHealthManageCardsData } = data
  const MymaxHscoreDy = wMymaxHscoreDy[Math.floor(Math.random() * 7)]

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>맞춤 건강관리</h2>
      <p className={styles.subText}>
        O Care와 함께 건강관리해보세요.
        <br />
        건강점수를 최대 <span>{MymaxHscoreDy}</span>까지 올릴 수 있어요.
      </p>
      {/* 카드 컴포넌트를 위해 ul, li태그로 나타내었습니다. */}
      {dummyHealthManageCardsData.map((healthManageCardData, idx) => {
        return (
          <HealthManageCard
            key={`key_${healthManageCardData.title}`}
            healthManageCardData={healthManageCardData}
            idx={idx}
          />
        )
      })}
    </section>
  )
}

export default HealthManage
