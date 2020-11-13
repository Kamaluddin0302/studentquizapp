import React from "react";
import "./RenderQuiz.css";
import { AppBar } from "../../../Components";
import { QuizCard, Result } from "../../Component";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

import firebaseApp from "../../../Config/Firebase/Firebase";
let database = firebaseApp.database().ref("/");

export default class RenderQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      activate: true,
      quiz: null,
      show: true,
      num: 0,
      completed: true,
      selected: true,
      result: true,
      correct: 0,
      wrong: 0,
    };
  }

  componentDidMount() {

    let quizKey = localStorage.getItem("quizKey");
    let studenId = localStorage.getItem("studenId");
    database
      .child("Students/" + studenId + "/" + "Result/" + quizKey)
      .once("value", (res) => {
        let data = res.val();
        if(data) {
          this.setState({result: false})
        }
      });

    this.setState({
      quiz: this.props.location.state.data.quiz,
    });
  }

  showQuiz = (isShow) => {
    this.setState({
      show: isShow,
    });
  };
  handleChange = (event) => {
    let quiz = this.state.quiz;
    let qnum = this.state.num;
    quiz[qnum].selectedValue = event.target.value;
    this.setState({ quiz: quiz, selected: false });
  };
  blanksFunc = (value) => {
    let quiz = this.state.quiz;
    let qnum = this.state.num;
    quiz[qnum].selectedValue_a = value;
    quiz[qnum].selectedValue_b = value;

    this.setState({
      quiz: quiz,
      selected: false,
    });
  };

  paragraph = (event) => {
    let quiz = this.state.quiz;
    let qnum = this.state.num;
    quiz[qnum].selectedValue = event.target.value;
    this.setState({ quiz: quiz, selected: false });
    console.log(quiz);
  };

  submitQuestion = () => {
    let studenId = localStorage.getItem("studenId");
    let quizKey = this.props.location.state.quizKey;
    let quiz = this.props.location.state.data.quiz;

    console.log(this.props.location.state.quizKey);
    console.log(this.state.num);
    if (this.state.num < quiz.length-1) {
      this.setState({ num: this.state.num + 1, selected: true });
    } else {
      this.setState({ completed: false });
      alert("quiz end");
      let check = window.confirm("quiz end are you want to submit?");
      if (check) {
        // this.quizSubmit()
        // let result = {
        //   correct: this.state.correct,
        //   wrong: this.state.wrong,
        // }
        // console.log(this.state)
        this.quizSubmit();
        // database
        //   .child("Students/" + studenId + "/" + "Result/" + quizKey + "/").set({ result });
        // this.setState({ result: false });
      }
    }
  };

  quizSubmit = () => {
    let teacherEamil = localStorage.getItem("teacherEmail");
    var correct = 0;
    var wrong = 0;
    let studenId = localStorage.getItem("studenId");
    let quizKey = this.props.location.state.quizKey;
    let quiz = this.props.location.state.data.quiz;
    let attemptedQuiz = this.state.quiz;
    let result;
    console.log(attemptedQuiz);
    for (var i = 0; i < attemptedQuiz.length; i++) {
      if (attemptedQuiz[i].selectedValue) {
        if (
          attemptedQuiz[i].category !== "blank" &&
          attemptedQuiz[i].selectedValue === attemptedQuiz[i].correct
        ) {
          correct++;
          this.setState({ correct: correct });
          console.log("reamaining types =========>", correct);
        }
      }
      if (this.state.num === quiz.length-1) {
        console.log(correct);
        result = {
          correct: correct,
          wrong: quiz.length - correct,
        };
       
        }
    }
    fetch("https://studentquiz1.herokuapp.com/route/sendemail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tomail: teacherEamil,
        title: `your result is  ${result.correct * 10} / ${quiz.length * 10}`,
      }),
    }).then(()=>
    database
      .child("Students/" + studenId + "/" + "Result/" + quizKey + "/")
      .set({ result }));
    this.setState({ result: false });
  };

  render() {
    let { show, num, correct, wrong } = this.state;
    let quiz = this.props.location.state.data.quiz;
    let q_category = quiz[num].category;
    console.log("dmkmsk",quiz.length)
    console.log(correct, wrong);

    return (
      <>
        <AppBar props={this.props.history} />
        {this.state.result ? (
          <>
            {show ? (
              <QuizCard questions = {quiz.length} showQuiz={this.showQuiz} />
            ) : (
              <div id="_mainDiv">
                <div className="_quiz">
                  <div id="_renderquiz">
                    <div id="_container">
                      <h5 id="counter"></h5>
                      <div>
                        <p>
                          <b>Question</b> <b id="q_num">{num + 1}</b>
                          <b id="total_q"></b> <br />
                          <span id="_question">{quiz[num].question}</span>
                        </p>

                        {/* conditons for render blank category questions */}
                        {q_category === "blank" ? (
                          <>
                            <TextField
                              label="a"
                              id="outlined-size-small"
                              variant="outlined"
                              size="small"
                              className="_blankField"
                              onChange={(e) => this.blanksFunc(e.target.value)}
                            />
                            <TextField
                              label="b"
                              id="outlined-size-small"
                              variant="outlined"
                              size="small"
                              className="_blankField"
                              onChange={(e) => this.blanksFunc(e.target.value)}
                            />

                            <p className="_hintsOptions">
                              Hint:
                              {quiz[num].options.map((hints) => {
                                return <span>{hints}\</span>;
                              })}
                            </p>
                          </>
                        ) : (
                          ""
                        )}

                        {/* conditons for render Matching category questions */}
                        {q_category === "Question with one answer" ||
                        q_category === "Open question" ? (
                          <>
                            <textarea
                              className="_write_in_detail"
                              onChange={(e) => this.paragraph(e)}
                            ></textarea>
                          </>
                        ) : (
                          ""
                        )}

                        {/* conditons for render these category questions */}
                        {q_category === "Multiple Choice" ||
                        q_category === "True/False" ? (
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={this.state.value}
                            onChange={(e) => this.handleChange(e)}
                          >
                            {quiz[num].options.map((val, i) => {
                              return (
                                <>
                                  <FormControlLabel
                                    className="options"
                                    value={val}
                                    control={<Radio color="primary" key={i} />}
                                    label={val}
                                  />
                                </>
                              );
                            })}
                          </RadioGroup>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="btn_section">
                        <button
                          id="next"
                          onClick={() => this.submitQuestion()}
                          disabled={this.state.selected}
                        >
                          Save & Next
                        </button>

                        <button
                          id="next"
                          // disabled={this.state.completed}
                          onClick={() => this.quizSubmit()}
                        >
                          quiz submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Result quizKey={this.props.location.state.quizKey} questions = {quiz.length}/>
        )}
      </>
    );
  }
}
