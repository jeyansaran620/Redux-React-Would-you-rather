import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {handleSaveQuestionAnswer} from '../actions/questions';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component
{
  handleSelect = (qid,option) =>
  {
    this.props.dispatch(handleSaveQuestionAnswer(qid,option));
    this.props.history.push(`/question/${qid}`)
  }
  
  changeRoute = (id) =>
  {
    this.props.history.push(`/question/${id}`)
  }
  render()
  {
    const {questions,questionIds,user} =this.props
    return (
      <div> {this.props.type === 'answered' ? 
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

function mapStateToProps ({authedUser,users,questions}, { type }) {
 
  const  questionIds = (type === 'answered') ? Object.keys(questions).filter((key) => key in users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp) :
  Object.keys(questions).filter((key) => !(key in users[authedUser].answers)).sort((a,b) => questions[b].timestamp - questions[a].timestamp)

  return {
    questionIds,
    questions,
    user:users[authedUser]
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));
