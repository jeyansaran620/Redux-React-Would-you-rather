import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component
{
    render()
    {
        const {authedUser,question,author,user} =this.props
        
        if(authedUser===null || authedUser === '' )
       {
      return <div>You must be a logged as a user</div>
      }
        else if(!question)
        {
            return(<div>404 Error - question not found</div>)
        }
        return (
            <div>
      <div className='question-box'>   
      <div className='author'>
      <img src={author.avatarURL} alt='avatar' className='avatar' />
        <h4>{author.name}</h4> </div>
      <h3>Would you rather</h3>
      <div className='options'>
       <div className={`option ${user.answers[question.id]==='optionOne' ? 'selected' : 'unselected'}`}>
       <div> {question.optionOne.text}</div>
        </div>
       <div className={`option ${user.answers[question.id]==='optionTwo' ? 'selected' : 'unselected'}`}>
       <div> {question.optionTwo.text}</div>
         </div>
         <div className='option'>
          votes:{question.optionOne.votes.length} 
          <div>percentage:{(question.optionOne.votes.length * 100)/(question.optionTwo.votes.length + question.optionOne.votes.length)}%</div> 
         </div>
         <div className='option'>
         votes:{question.optionTwo.votes.length}
         <div>percentage:{(question.optionTwo.votes.length * 100)/(question.optionTwo.votes.length + question.optionOne.votes.length)}%</div>
         </div>
       </div></div> 
      
            </div>
        )
    }
}

function mapStateToProps ({authedUser,users, questions}, props) {

  if(authedUser === '')
    {
      return {
        authedUser
        }
    }
 const { id } = props.match.params
  const question = questions[id] 
    return {
      authedUser,
      user:users[authedUser],
      question,
      author: question ? users[question.author] : null
    }
  }

export default connect(mapStateToProps)(Question)