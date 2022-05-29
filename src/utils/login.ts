import { fetchUserIdInfo } from 'services/health'
import store from 'storejs'

export const login = async (userInputId: string) => {
  try {
    const { id, name } = await fetchUserIdInfo()

    if (id === userInputId) {
      store.set('userName', name)
    }
  } catch {
    throw new Error('아이디가 일치하지 않습니다')
  }
}

const VALIDATION_ERRORS = {
  emptyInput: '이 입력란을 작성해주세요',
  wrongInput: 'ID는 kimhealth로 입력하세요',
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
