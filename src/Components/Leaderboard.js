import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Leaderboard extends React.Component
{
    render()
    {
        const {authedUser,users,usersId} = this.props
        if(authedUser === '')
        {
          return <div>You must be a logged as a user</div>
        }
        return (
            <div className='leader-board'>
               <h2>Leader board</h2>
               {usersId.length > 0 && usersId.map((user) => (
             <div key={user} className='author'>
             <img src={users[user].avatarURL} alt='avatar' className='avatar' />
              <h4>{users[user].name}</h4>
              
              <div className='column'> <h4>Questions :{users[user].questions.length}</h4> </div>
               <div className='column'>  <h4>Answers :{Object.keys(users[user].answers).length} </h4></div>
             </div>
               ))}
           </div>
        )
    }
}

function mapStateToProps ({authedUser,users }) {
  if(authedUser === '')
  {
    return {
      authedUser
      }
  }
    return {  
      users,
      usersId : Object.keys(users).map((key) => key).sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
    }
  }


export default withRouter(connect(mapStateToProps)(Leaderboard))