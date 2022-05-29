import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from 'storejs'

import { fetchUserIdInfo } from 'services/health'

import KB_LOGO from '../../assets/images/KB_logo.png'
import styles from './loginPage.module.scss'

const LoginPage = () => {
  const [userInputId, setUserInputId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const login = () => {
    const { id, name } = fetchUserIdInfo()
    if (id === userInputId) {
      store.set('userName', name)
      navigate('/')
    }
  }

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setUserInputId(e.currentTarget.value)
  }

  const validateUserId = () => {
    if (userInputId === '') {
      setErrorMessage('이 입력란을 작성해주세요')
      return false
    }
    if (userInputId !== 'kimhealth') {
      setErrorMessage('ID는 kimhealth 로 입력하세요')
      return false
    }
    return true
  }

  const handleLoginOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateUserId()) login()
  }

  return (
    <div className={styles.loginContainer}>
      <section className={styles.container}>
        <h2 className={styles.logo}>
          <img src={KB_LOGO} alt='KB_logo' />
        </h2>
        <form className={styles.loginForm} onSubmit={handleLoginOnSubmit}>
          <label className={styles.idInputLabel} htmlFor='idInput'>
            UserID
          </label>
          <input
            className={styles.idInput}
            id='idInput'
            type='text'
            placeholder='ID를 입력해주세요'
            onChange={handleUserIdInput}
            value={userInputId}
          />
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
          <button className={styles.loginButton} type='submit'>
            로그인
          </button>
        </form>
      </section>
    </div>
  )
}

export default LoginPage
