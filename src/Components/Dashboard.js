import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {handleSaveQuestionAnswer} from '../actions/questions';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component
{
 
  handleSelect = (qid,option) =>
  {
    this.props.changeType('answered')
    this.props.dispatch(handleSaveQuestionAnswer(qid,option));
    this.props.history.push(`/question/${qid}`)
  }
  
  changeRoute = (id) =>
  {
    this.props.history.push(`/question/${id}`)
  }
 
  render()
  {
    const {authedUser,questions,user,users,type,changeType} =this.props

    if(authedUser===null || authedUser === '' )
    {
      return <div>You must be a logged as a user</div>
    }

  const  questionIds = ( type === 'answered') ? Object.keys(questions).filter((key) => key in users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp) :
  Object.keys(questions).filter((key) => !(key in users[authedUser].answers)).sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    return (
      <div> 
    <div className='options'>
    <div className={`option ${type === 'answered' ? 'selected' : 'unselected'}`} 
    onClick={() => changeType('answered')}>
      Answered</div>   
    <div className={`option ${type === 'unanswered' ? 'selected' : 'unselected'}`}
     onClick={() => changeType('unanswered')}>
      Unanswered</div>
    </div>
        {type === 'answered' ? 
      <div>
      {questionIds.map((id) => (
     <div key={id} className='question-box clk'  onClick={() => this.changeRoute(id)}>
      <h3>Would you rather</h3>
      <div className='options'>
       <div className={`option ${user.answers[id]==='optionOne' ? 'selected' : 'unselected'}`}> {questions[id].optionOne.text} </div>
       <div className={`option ${user.answers[id]==='optionTwo' ? 'selected' : 'unselected'}`}> {questions[id].optionTwo.text} </div>
       </div></div> 
      )
        )} 
        </div> 
        :
        <div>
      {questionIds.map((id) => (
      <div key={id} className='question-box'>
      <h3>Would you rather</h3>
      <div className='options'>
       <div className='option clk' onClick={() => this.handleSelect(id,'optionOne')}> {questions[id].optionOne.text} </div>
       <div className='option clk' onClick={() => this.handleSelect(id,'optionTwo')}> {questions[id].optionTwo.text} </div>
       </div>
        </div> )
        )} 
        </div> 
        }
      
      </div>
    )
      }
}

function mapStateToProps ({authedUser,users,questions},{type,changeType}) {
 
  if(authedUser === '')
    {
      return {
        authedUser
        }
    }

  return {
    authedUser,
    type,
    changeType,
    questions,
    user:users[authedUser],  
    users
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));
