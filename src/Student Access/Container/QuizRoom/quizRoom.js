import React from "react";
import { AppBar } from "../../../Components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import firebaseApp from "../../../Config/Firebase/Firebase";
import { QuizCode } from "./../../Component";
import "./quizRoom.css";
let database = firebaseApp.database().ref("/");

class QuizRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      activate: true,
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        this.props.history.push({
          state: {
            uid: user.uid,
          },
        });
        localStorage.setItem("teacherEmail", user.email);
      } else {
        this.props.history.push("/studentlogin")
        // No user is signed in.
        let studenId = localStorage.getItem("studenId");

      }
    });
  }
  acitivate = (isActivate) => {
    this.setState({ activate: isActivate });
  };

  render() {
    return (
      <div>
        <AppBar props={this.props.history} />
        {this.state.active ? (
          <Paper
            style={{
              width: 270,
              margin: "auto",
              marginTop: 120,
              textAlign: "center",
            }}
          >
            <div className="_bodySection">
              <List
                component="nav"
                aria-label="main mailbox folders"
                onClick={() => this.props.history.push("/selectedquiz")}
              >
                <ListItem button>
                  <ListItemText> Quiz selected</ListItemText>
                </ListItem>
              </List>

              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemText> Quiz taken</ListItemText>
                </ListItem>
              </List>
            </div>
          </Paper>
        ) : (
          <QuizCode code={this.state.activate} activate={this.acitivate} props={this.props.history} />
        )}
      </div>
    );
  }
}
export default QuizRoom;
