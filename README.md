Project : Would you Rather
  
   In this site the users can choose between the existing accounts and start polling.
   They can poll the questions previously asked by the users and they can also ask a new poll.
   In the poll there asre two option with which we can vote for on eof them.
   
Architechture:

   Database :
     It contains two main components that the Users and the Questions.
     
     Users : 
         In this section we are having the information of the users existing in the Site.
         It contains the user id,name,avatar, answers made by the user with the option , polls made by the user.
     
     Questions :
         In this section we are having data about the polls that are in the site.
         It contains the question id,timestamp, author id,options, answers by the users.
   
      API:
         To connect with the database we are having api function calls that can receive data and also can modify them.
         We can add a new poll and answer a poll as a existing user.
      
   Site:
      In the Front end we are using the Redux store to maintain the integrity of the site.

      Actions:
          AuthedUser:
            With this Action, we can pass a user as a Authorized user.

          Users:
            Here we are having Actions to Receive all existing user data and to add some extra inforamtion like adding answers and questions.
            When a user add a new question the handleAddQuestion function dispatches the addQuestionToUser Action call and also updates the store.
            WHen a user polls a question the handleSaveQuestionAnswer function dispathces the addAnswerToUser Action call and updates the store.

          Questions:
            Here we are having Actions to Receive all existing questions and to add some extra inforamtion like adding answers and questions.
            When a user add a new question the handleAddQuestion function dispatches the addQuestion Action call and also updates the store.
            WHen a user polls a question the handleSaveQuestionAnswer function dispathces the SaveQuestionAnswer Action call and updates the store.

          Shared:
            Here we are having handleInitialData function call to get the data from the database and to set initial data to the store using receive users and questions Actions.
         
      Middlewares:
          We are just using logger to log the type of dispatched action and the new state of the store.
          we are also using redux thunk to handle the functions in the Action calls.

      Reducers:
          AuthedUser:
            This reducer takes cares of the logged user.
            It changes the state of the authedUser to the id sent by the Action call.
            
          Users:
            This reducer takes care of the Users state of the store.
            We can receive all existing users from the store using Receive users action call.
            When we dispatch an action to Add Question to user, it updates the user questions with the question.    
            When we dispatch an action to Add Answer to user, it concats the user answers with the Answer.

          Questions:
            This reducer takes care of the Questions state of the store.
            We can receive all existing questions from the store using Receive Questions action call.
            When we dispatch an action to Add Question , it updates the questions with the question.    
            When we dispatch an action to Add Answer, it concats the user response with the votes of the option.

   Components:

     index.js:
          Here we are creating a store with the Reducers and the middlewares, and passing it to the App.js.

     App.js:
          Here we dispatch the handleInitialData function to set the store data.
          We are using router from the React-router-dom to manage the routes.
          when the App component is called the AuthedUser is set to empty.
          We are having Nav component to navigate the user to various routes.
          we also have the type state to controll the type of the tab rendered in the Dashboard Component.

     Nav.js:
          This component is for the navigation of the site having links to the routes the user can also login and logout using this. 

     Login.js:
          This is responsible for the authedUser state of the store.
          The user is given the choice of the Existing users and he/she can choose from them.
          On logging a user he/she is redirected to Dashboard component with unanswered tab.

     Dashboard.js:
          This is rendered in the root of the site.
          When the User is logged in we display the questions that he/she has answered and unanswered with the switching tab.
          The switching tab is controlled by the App component as this needs a specific condition of displaying answered and unanswered tabs.
          We are having a function from the App component to switch between tabs.
          In the Answered tab the questions that are answered by the user is displayed in the order(Desc) of timestamp on clicking them, the user is redirected to Question component having details of the questions.
          In the Unanswered tab the questions that are being Unanswered b the user is shown and he/she can vote them.
          On polling an unanswered question the changes are made and he/she is redirected to the Question component.
   
     Question.js
          This is rendered when the route is /question/:id.
          When the user is logged in, the Question with the id is rendered when it is there.
          The Details of the author of the Question,Option polled by the user,Votes for Each Option and the percentage of the votes polled for the option is rendered.
    
     NewQuestion.js
          This is rendered when the route is /new, this is a controlled Component having two input fields for the options.
          When the user is logged in the form is shown and the user can create new Polls.
          When the New poll is created the user is redirected to the root of the site.
    
     LeaderBoard.js:
          This is rendered when the route is /leaderboard.
          This displays the leaderboard having details of the users in an ordrder showing the number of questions created and polled by the user.
          The Leaderboard is ordered(Desc) by the count of the polls the user created and answered.