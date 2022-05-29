import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import KB_LOGO from '../../assets/images/KB_logo.png'
import styles from './loginPage.module.scss'
import { login, validateUserInputId } from 'utils/login'

const LoginPage = () => {
  const [userInputId, setUserInputId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setUserInputId(e.currentTarget.value)
  }

  const handleLoginOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationResult = validateUserInputId(userInputId)

    if (validationResult !== true) {
      setErrorMessage(validationResult)
      return
    }

    login(userInputId)
      .then(() => navigate('/'))
      .catch((error) => setErrorMessage(error.message))
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

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
            ref={inputRef}
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
