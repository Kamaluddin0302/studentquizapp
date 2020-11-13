import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Login,Category,SignUp,CreateTest,ForgotPassword,CreateQuestion} from './../../Container'
import { StudentLogin, StudentSignup,RenderQuiz,QuizSelected, QuizRoom } from './../../Student Access/Container'


export default class AppRouter extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route  path="/SignUp" component={SignUp} />
                    <Route  path="/category" component={Category} />
                    {/* <Route  path="/addQues" component={AddQues} /> */}
                    <Route  path="/createTest" component={CreateTest} />
                    <Route  path="/quizRoom" component={QuizRoom} />
                    <Route  path="/selectedquiz" component={QuizSelected} />
                    <Route  path="/quiz" component={RenderQuiz} />
                    <Route  path="/studentlogin" component={StudentLogin} />
                    <Route  path="/studentsignup" component={StudentSignup} />
                    <Route  path="/forgotpassword" component={ForgotPassword} />
                    <Route  path="/createquestion" component={CreateQuestion} />






                </div>
            </Router>
        )
    }
}