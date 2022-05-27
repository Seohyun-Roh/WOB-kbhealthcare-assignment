import UserInfo from './UserInfo'
import HealthCharts from './HealthCharts'
import HealthManage from './HealthManage'
import styles from './mainPage.module.scss'

const MainPage = () => {
  return (
    <div className={styles.contentsContainer}>
      <UserInfo />
      <HealthCharts />
      <HealthManage />
    </div>
  )
}

export default MainPage
