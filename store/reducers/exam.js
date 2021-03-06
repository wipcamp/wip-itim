import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import cookie from '../../utils/cookie'

// Actions
const examAction = actionCreator('answer')
const SET_STEP = examAction('SET_STEP')
const SET_ANSWER = examAction('SET_ANSWER')
const SUBMIT_EXAM = examAction('SUBMIT_EXAM', true)
const FETCH_EXAM = examAction('FETCH_EXAM', true)
const SET_ISADMIN = examAction('SET_ISADMIN')

const initialState = {
  step: 1,
  exam: [],
  answers: [],
  error: false,
  isAdmin: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP: {
      return {
        ...state,
        step: action.step
      }
    }

    case SET_ANSWER: {
      return {
        ...state,
        ['question' + action.payload.questionId]: action.payload.answerId
      }
    }

    case SUBMIT_EXAM: {
      return {
        ...state,
        result: action.payload,
        answers: action.answers
      }
    }

    case SUBMIT_EXAM.PENDING: {
      return {
        ...state,
        answers: action.meta.answers
      }
    }

    case SUBMIT_EXAM.FULFILLED: {
      return {
        ...state,
        result: action.payload,
        step: 3
      }
    }

    case SUBMIT_EXAM.REJECTED: {
      return {
        ...state,
        error: true
      }
    }

    case FETCH_EXAM: {
      return {
        ...state,
        exam: action.payload
      }
    }

    case FETCH_EXAM.FULFILLED: {
      return {
        ...state,
        exam: action.payload.data.data,
        step: 2
      }
    }

    case FETCH_EXAM.REJECTED: {
      return {
        ...state,
        message: action.payload,
        error: true
      }
    }

    case SET_ISADMIN: {
      return {
        ...state,
        isAdmin: action.payload
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  setStep: (step) => ({
    type: SET_STEP,
    step
  }),
  fetchExam: () => {
    let {token} = cookie({req: false})
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const data = api.get('/exams', headers)
    return {
      type: FETCH_EXAM.ACTION,
      payload: data
    }
  },
  setAnswer: (data) => {
    return {
      type: SET_ANSWER,
      payload: data
    }
  },
  submitExam: (answers) => {
    let {token} = cookie({req: false})
    let data = {
      data: answers
    }
    const headers = {
      Authorization: `Bearer ${token}`
    }
    console.log('sending', data)
    const result = api.post('/exams', data, headers)
    let returning = {
      type: SUBMIT_EXAM.ACTION,
      payload: result,
      meta: {answers}
    }
    return returning
  },
  setIsAdmin: (isAdmin) => {
    return {
      type: SET_ISADMIN,
      payload: isAdmin
    }
  }
}
