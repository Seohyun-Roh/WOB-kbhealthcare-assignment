import store from 'storejs'

import styles from './userInfo.module.scss'
import HealthScore from './HealthScore'

import { HealthInfo } from 'assets/svgs'
import { fetchPersonalHealthInfo } from 'services/user'

const UserInfo = () => {
  const userName = store.get('userName')
  const getUserData = fetchPersonalHealthInfo()

  return (
    <section className={styles.container}>
      <h2>
        <span>{`${userName}님의 건강점수`}</span>
        <HealthInfo className={styles.healthInfoIcon} />
      </h2>
      <div className={styles.healthScoreWrapper}>
        <HealthScore healthScore={getUserData.healthScore} />
        <div className={styles.infoBox}>
          <span>기본 정보</span>
          <dl>
            <dt>성별</dt>
            <dd>{getUserData.userGender}</dd>
            <dt>나이</dt>
            <dd>{getUserData.age}세</dd>
            <dt>키</dt>
            <dd>{getUserData.height}cm</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default UserInfo
