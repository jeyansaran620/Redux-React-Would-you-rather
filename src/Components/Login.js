import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component
{
    onselect = (id) =>
    { 
        this.props.dispatch(setAuthedUser(id))
        this.props.changeType('unanswered')
        this.props.history.push(`/`)
    }
    render()
    {
        console.log(this.props.users)
        return(
           <div>
               <h2>Login</h2>
               {this.props.users.length > 0 && this.props.users.map((user) => (
             <div key={user.id} className='author clk' onClick={() => this.onselect(user.id)}>
             <img src={user.avatarURL} alt='avatar' className='avatar' />
              <h4>{user.name}</h4>
             </div>
               ))}
           </div>
        )
    }
}

function mapStateToProps ({users } ,{changeType}) {
       return {
         users : Object.keys(users).map((key) => users[key]),
         changeType
       }
     }


   export default withRouter(connect(mapStateToProps)(Login))