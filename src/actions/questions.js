import { saveQuestionAnswer, saveQuestion } from '../utils/API';
import {showLoading,hideLoading} from 'react-redux-loading';
import {addQuestionToUser ,addAnswerToUser} from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION';


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}


function SaveQuestionAnswer ( uid, qid, answer ) {
  return {
    type: ANSWER_QUESTION,
    uid,
    qid,
    answer
  }
}

export function handleSaveQuestionAnswer(qid,answer) {

  return(dispatch ,getState) =>
  {
    const { authedUser } = getState();
    
    dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(() => {
      dispatch(SaveQuestionAnswer(authedUser,qid,answer))  
      dispatch(addAnswerToUser(authedUser,qid,answer))  
    })
    .then(()=> dispatch(hideLoading()))
    
  }
}

function addQuestion (question)
{
  return {
    type:ADD_QUESTION,
    question
  }
}

export function handleAddQuestion( optionOneText, optionTwoText )
{
  return(dispatch ,getState) =>
  {
    const { authedUser }= getState()
    dispatch(showLoading())
    return saveQuestion({
      author:authedUser,
      optionOneText,
      optionTwoText
    }).then((question) => {
    dispatch(addQuestion(question)) 
    dispatch(addQuestionToUser(authedUser,question.id))
  } )
    .then(()=> dispatch(hideLoading()))
    
  }
}
