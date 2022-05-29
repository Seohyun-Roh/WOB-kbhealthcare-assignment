import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'
import PrivateRoute from 'layouts/PrivateRoute'

const App = () => {
  return (
    <div className={styles.container}>
      <header>
        <h1>마이헬스</h1>
      </header>
      <main className={styles.app}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<MainPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
