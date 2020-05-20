import { RECEIVE_QUESTIONS, ANSWER_QUESTION,ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {

    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }


    case ANSWER_QUESTION :
      const {qid,uid,answer} = action
      console.log(uid)
      return {
        ...state,
        [qid] : {
          ...state[qid],
          [answer] : {
            ...state[qid][answer],
            votes :  state[qid][answer].votes.concat([uid])
          }
        }
      }


    case ADD_QUESTION :
        return {
          ...state,
          [action.question.id]: action.question
        }
    default :
      return state
  }
}