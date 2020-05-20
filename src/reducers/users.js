  
import { RECEIVE_USERS,ADD_QUESTION_TO_USER ,ADD_ANSWER_TO_USER} from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION_TO_USER :
      return {
        ...state,
        [action.uid] : { 
          ...state[action.uid],
          questions : state[action.uid].questions.concat([action.qid])
        }
      }
      case ADD_ANSWER_TO_USER :
        const {uid,qid,option} = action
        return {
          ...state,
          [uid] : { 
            ...state[uid],
            answers :{
              ...state[uid].answers ,
              [qid] : option
            } 
          }
        }
    default :
      return state
  }
}