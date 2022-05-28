import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import PrivateRoute from 'layouts/PrivateRoute'

const App = () => {
  return (
    <div className={styles.container}>
      <header>header</header>
      <main className={styles.app}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<MainPage />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
