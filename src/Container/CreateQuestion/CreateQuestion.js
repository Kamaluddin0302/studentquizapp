import React from "react";
import Button from "@material-ui/core/Button";
import "./CreateQuestion.css";
import AppBar from "./../../Components/Appbar/Appbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebaseApp from "../../Config/Firebase/Firebase";

import './CreateQuestion.css'
import {
    Blanks,
    MultipleChoice,
    Openquestion,
    QuestionwithOneAns,
    TrueFalse,
} from "./../../Components";
let database = firebaseApp.database().ref("/");


export default class CreateQustion extends React.Component {
  constructor() {
    super();
    this.state = {
        qustions: [],
        num: 1,
      category:""
    };
  }


  componentDidMount() {
    const uid = this.state.uid
    database.child("Users/" + uid).once("value", (res) => {
      let data = res.val();
      this.setState({ user: data });
      console.log(data);
    });


    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("currentuser", JSON.stringify(user.uid));
        this.setState({uid})
        console.log(user.email);
      } else {
        this.props.history.push("/")
      }
    });
  }


  makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };


  getOutput = (val) => {
    let questions = this.state.qustions;
    // console.log(val)
    val.question = this.state.question
    console.log(val)
      questions.push(val);
      this.setState({ questions: questions, num: this.state.num + 1,category:"",question:"" })
}


submit = (val)=> {

  let questions = this.state.qustions;
  // console.log(val)
  val.question = this.state.question
  console.log(val)
    questions.push(val);
    this.setState({ questions: questions, num: this.state.num + 1,category:"",question:"" })
  
  let check = window.confirm(
    "You added 10 qestions! Are you want to submit?"
  );
  let randomId = this.makeid(5);
  // this.setState({ randomId });
  if (check) {
    let uid = localStorage.getItem("currentuser");
    uid = JSON.parse(uid);
    let teacherEamil = localStorage.getItem("teacherEmail");
    console.log(teacherEamil, randomId);
    
    fetch("https://studentquiz1.herokuapp.com/route/sendemail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tomail: teacherEamil,
        title: randomId,
      }),
    })
      .then(
        (responece) =>
          database
            .child("Quiz/" + randomId)
            .set({ quiz: this.state.questions, randomId: randomId }),
        this.props.history.push({
          pathname: "./createTest",
          state: {
            userData: this.props.location.state.userData,
          },
        })
      )
      .then((err) => console.log(err));
  }

}

  render() {
    let {correct,category,num,questions } = this.state;
    console.log(questions)
    return (
      <>  
        <AppBar />

        <Grid container justify="center" className="_grid">
          <Grid item xs={11} sm={10} md={6} lg={6}>
            <Paper className="paper">
              <div className="_headingSection">
                <p className="_heading">
                  <span>
                    <span>{num} ) </span>
                  </span>{" "}
                </p>
              </div>
              <textarea
              col={12}
              className="create_question"
              value={this.state.question}
              placeholder="Enter your question here .."
              onChange={(e) => this.setState({ question: e.target.value })}
            >
            </textarea>
              <br/>
              {category === "Multiple choice" ?  <MultipleChoice num={num} submit = {this.submit}  onclick={this.getOutput}/>:""}
              {category === "True/False" ?  <TrueFalse num={num} submit = {this.submit}  onclick={this.getOutput}/>:""}
            
              <br />
              {category  === "" ?
              <> 
              <Button variant="outlined" size="small" color="primary" className="_catBtn" onClick={()=>this.setState({category:"Multiple choice"})}> Multiple choice</Button>
              <Button variant="outlined" size="small" color="primary" className="_catBtn" onClick={()=>this.setState({category:"True/False"})}> True/False</Button>
              <br />
              <br />
               

              {category ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({
                      category:""
                    });
                  }}
                  style={{ width: "100%", backgroundColor: "darkcyan" }}
                >
                  Select question Type
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  color="primary"
                  disabled
                  style={{ width: "100%", backgroundColor: "darkcyan" }}
                >
                  Select question Type
                </Button>
              )}
               </>
                :
                ""}
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}
