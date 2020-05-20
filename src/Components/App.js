import React, { Component ,Fragment} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Question from './Question'; 
import NewQuestion from './NewQuestion';
import Nav from './Nav';
import Login from './Login'
import Leaderboard from './Leaderboard'

class App extends Component
{
 
  componentDidMount() {   
    const AUTHED_ID=''
    this.props.dispatch(handleInitialData(AUTHED_ID))
  }

  render()
  {
    return (
      <Router >
      <Fragment>      
      <LoadingBar />
      <Nav />
        {this.props.loading === true
        ? null
        : 
        <div>
        {this.props.authedUser === '' ? 
        <Route path='/'  component={Login}/> :
        <div>
        <Route path='/answered'  component={() => <Dashboard type={'answered'}/>}/>
        <Route path='/unanswered'  component={() => <Dashboard type={'unanswered'}/>}/>
        <Route path='/question/:id'   component={Question}/>
        <Route path='/leaderboard'   component={Leaderboard}/>
        <Route path='/new'   component={NewQuestion}/></div>
  }
        </div>
        }</Fragment>
        </Router>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
