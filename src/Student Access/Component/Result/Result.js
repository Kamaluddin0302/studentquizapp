import React from "react";
import Paper from "@material-ui/core/Paper";
// import "./quizCard.css";
import Launch from "@material-ui/icons/Launch";
import firebaseApp from "../../../Config/Firebase/Firebase";

let database = firebaseApp.database().ref("/");
export default class QuziCard extends React.Component {
  constructor() {
    super();
    this.state = {
    result:{}
    };
  }
  componentDidMount() {
    let quizKey = localStorage.getItem("quizKey");
    let studenId = localStorage.getItem("studenId");
    database
      .child("Students/" + studenId + "/" + "Result/" + quizKey)
      .once("value", (res) => {
        let data = res.val();
        
          console.log(data)
        this.setState({ result: data.result});
      });
  }
  render() {
    console.log(this.state.result);
    let {result} = this.state;
    return (
      <>
        <Paper className="_quizCard_paper">
          <table className="_quizTable">
            <tr>
              <th>Quiz#</th>
              <th>Total Questions</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Percentage</th>
            </tr>
            <tr>
              <td>01</td>
              <td>{this.props.questions}</td>
              <td>{result.correct}</td>
              <td>{result.wrong}</td>
              <td>{(result.correct/10)*100}%</td>
            </tr>
          </table>
        </Paper>
      </>
    );
  }
}
