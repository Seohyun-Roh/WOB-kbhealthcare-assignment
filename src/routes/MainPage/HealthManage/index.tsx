import { HealthIcon2 } from 'assets/svgs'
import styles from './healthManage.module.scss'

const HealthManage = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>맞춤 건강관리</h2>
      <p className={styles.subText}>
        O Care와 함께 건강관리해보세요.
        <br />
        건강점수를 최대 <span>917점</span>까지 올릴 수 있어요.
      </p>
      {/* 카드 컴포넌트를 위해 ul, li태그로 나타내었습니다. */}
      <ul>
        <li className={styles.healthCard}>
          <div className={styles.icon}>
            <HealthIcon2 />
          </div>
          <div className={styles.info}>
            <h3>01</h3>
            <p className={styles.healthTitle}>체질량 지수</p>
            <p className={styles.detail}>
              체질량 지수는 24.8kg/㎡로
              <br />
              <span>과체중</span>입니다.
            </p>
            <p className={styles.normal}>정상: 20 ~ 22kg/㎡</p>
            <ul className={styles.tag}>
              <li>#현상유지</li>
              <li>#근력운동</li>
              <li>#유산소운동</li>
            </ul>
          </div>
          <div className={styles.manage}>
            <h4>이렇게 관리해 보세요!</h4>
            <ul>
              <li>
                최소한 현 체중보다 증가하지 않도록 하시되 가능하면 일차적으로 현 체중에서 5%정도를 3-6개월 이내에
                감량하시면 심뇌혈관 질환 예방에 더욱 도움이 됩니다.
              </li>
              <li>
                전체적인 에너지 섭취는 줄이되 영양적 적절성은 유지하는 개인별 영양펑가에 기반을 둔 식이요법과 하루 30분
                이상 주 5회 이상 중등도 강도의 유산소 운동을 기본으로 하되 점진적으로 하루 1시간, 고강도 운동을 포함하는
                운동 요법이 병행되어야 합니다. 또한 음주 슴관, 야식, 폭식 등 관련된 행동 습관도 파악하여 조절해야
                합니다.
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default HealthManage
