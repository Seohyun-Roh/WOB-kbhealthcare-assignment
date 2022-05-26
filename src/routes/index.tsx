import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import LoginPage from './LoginPage'
import MainPage from './MainPage'

const App = () => {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </main>
  )
}

export default App
