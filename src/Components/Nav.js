import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser'

 class Nav extends React.Component
 {
   handleClick =(to) =>
   {
    this.props.history.push(`/${to}`)
   }
   logout =() =>
   {  
    this.props.dispatch(setAuthedUser(''))
    this.props.history.push(`/`)
   }
   render()
   {
  return (
    <nav className='nav'>
      {
        this.props.authedUser !== '' &&
        <ul>
        <li> 
        <div className='clk' onClick={() => this.handleClick('answered')}>Answered</div>
        </li>
        <li>
        <div className='clk' onClick={() => this.handleClick('unanswered')}>Unanswered</div>
        </li>
        <li>
        <div className='clk' onClick={() => this.handleClick('new')}>New Question</div>
        </li>
        <li>
        <div className='clk' onClick={() => this.handleClick('leaderboard')}>Leader board</div>
        </li>
        <li>
        <div className='clk' onClick={() => this.logout()}>Logout</div>
        </li>
        <li>
        <div>{this.props.authedUser}</div>
        </li>
      </ul>
      }   
    </nav>
  )
}
 }
function mapStateToProps ({authedUser }) {
  return {  
    authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Nav))