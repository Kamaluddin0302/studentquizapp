import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import firebaseApp from "./../../../Config/Firebase/Firebase";
var database = firebaseApp.database().ref("/");
export default class quizCode extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      error: false,
      helperText: "Enter key",
    };
  }

  handleRadioChange = (event) => {
    this.setState({
      value: event.target.value,
      helperText: "Enter key",
      error: false,
    });
  };

  handleSubmit = () => {
    let quizKey = this.state.value;
    let sutdentId = localStorage.getItem("studenId");
    // event.preventDefault();
    if (quizKey) {
      database.child("Quiz/").on("child_added", (res) => {
        let data = res.val();
        if (data.randomId === quizKey) {
          console.log(data);
          database.child("Students/"+sutdentId+"/").update({ quizKey: quizKey });
          this.setState({
            helperText: "success",
            error: false,
          });

          this.props.props.push("/quiz", { data: data,quizKey:quizKey });
          localStorage.setItem("quizKey",quizKey)
        } else {
          this.setState({
            helperText: "please enter correct key",
            error: true,
          });
        }
      });
    } else if (quizKey === "") {
      this.setState({
        helperText: "please enter quiz key",
        error: false,
      });
    }
  };
  render() {
    console.log(this.props.props);
    return (
      <Paper
        style={{
          width: 270,
          margin: "auto",
          marginTop: 120,
          textAlign: "center",
          padding: 15,
        }}
      >
        <FormControl component="fieldset" error={this.state.error}>
          <FormLabel style={{ textAlign: "center", paddingBottom: 10 }}>
            ENTER QUIZ KEY
          </FormLabel>

          <TextField
            id="outlined-basic"
            variant="outlined"
            type = "password"
            onChange={(e) => this.handleRadioChange(e)}
            style={{ width: "100%" }}
          />

          <FormHelperText>{this.state.helperText}</FormHelperText>
          <p style={{ textAlign: "center", margin: "0px" }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              SUBMIT
            </Button>
          </p>
        </FormControl>
      </Paper>
    );
  }
}
