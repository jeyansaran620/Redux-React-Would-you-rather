import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {handleAddQuestion} from '../actions/questions';

class NewQuestion extends React.Component
{
    state ={
        optionOne :'',
        optionTwo:''
    }
   handleChange = (value,option) =>
   {
       if (option ==='optionOne')
       {
           this.setState({optionOne:value})
       }
       else if (option ==='optionTwo')
       {
           this.setState({optionTwo:value})
       }
   }
   onSubmit = () =>
   {
       if (this.state.optionOne.length >0 && this.state.optionTwo.length >0)
       {
        this.props.dispatch(handleAddQuestion(this.state.optionOne,this.state.optionTwo));
        this.props.history.push(`/unanswered`)
       }
   }
    render()
    {
        const {user} = this.props
        return(
        <div>
       <div className='question-box'>   
      <div className='author'>
      <img src={user.avatarURL} alt='avatar' className='avatar' />
        <h4>{user.id}</h4> </div> 
      <h2>Would you rather</h2>
      <div className='options'>
       
       <input className='option' placeholder='option 1' value={this.state.optionOne} onChange={(e) => this.handleChange(e.target.value,'optionOne')} />
    
        <input  className='option' placeholder='option 2' value={this.state.optionTwo} onChange={(e) => this.handleChange(e.target.value,'optionTwo')}/>
        <button className='submit clk' onClick={()=>this.onSubmit()}>Submit</button>
            </div>
       </div> 
            </div>
        )
    }
}

function mapStateToProps ({authedUser,users}) {

       return {
         user:users[authedUser]
       }
     }
   
   export default withRouter(connect(mapStateToProps)(NewQuestion))