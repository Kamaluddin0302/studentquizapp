import React from "react";
import Paper from "@material-ui/core/Paper";
import "./quizCard.css";
import Launch from "@material-ui/icons/Launch";

export default class QuziCard extends React.Component {
  render() {
    return (
      <>
        <Paper className="_quizCard_paper">
          <table className="_quizTable">
            <tr>
              <th>Quiz#</th>
              <th>Total Questions</th>
              <th>Marks</th>
              <th>Start</th>
            </tr>
            <tr>
              <td>01</td>
              <td>{this.props.questions}</td>
              <td>{this.props.questions * 10}</td>
              <td>
                <Launch className="_start_icon" onClick={()=>this.props.showQuiz(false)} />
              </td>
            </tr>
          </table>
        </Paper>
      </>
    );
  }
}
