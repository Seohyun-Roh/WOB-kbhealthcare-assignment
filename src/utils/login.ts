import { fetchUserIdInfo } from 'services/user'

export const login = async (userInputId: string) => {
  try {
    const { id, name } = await fetchUserIdInfo()

    if (id === userInputId) {
      sessionStorage.setItem('userName', name)
    }
  } catch {
    throw new Error('아이디가 일치하지 않습니다')
  }
}

const VALIDATION_ERRORS = {
  emptyInput: '아이디를 입력해주세요.',
  wrongInput: '입력한 정보를 확인해주세요.',
}

export const validateUserInputId = (userInputId: string) => {
  if (userInputId === '') {
    return VALIDATION_ERRORS.emptyInput
  }

  if (userInputId !== 'kimhealth') {
    return VALIDATION_ERRORS.wrongInput
  }

  return true
}
