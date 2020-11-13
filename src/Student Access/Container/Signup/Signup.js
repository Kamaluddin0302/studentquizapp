import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Navbar from "./../../../Components/Appbar/Appbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import "./Signup.css";
import firebaseApp from "../../../Config/Firebase/Firebase";
import ButtonGroup from "@material-ui/core/ButtonGroup";
let database = firebaseApp.database().ref("/");

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      value: "",
      helperText: "",
    };
  }
  signup = () => {
    let value = this.state.value;
    let data = this.state;
    if (data.password && data.name && data.password) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          let obj = {
            user: data.name,
            email: res.user.email,
            uid: res.user.uid,
          };

          this.setState({ helperText: "signup successfully!", error: false });
          database.child("Students/" + res.user.uid + "/").set(obj);
          console.log("Student Signup")
          this.props.history.push("./studentlogin");
        })
        .catch((err) => {
          this.setState({ helperText: err.message, error: true });
        });
    } else {
      this.setState({ helperText: "Please complete fill form !", error: true });
    }
  };

  handleRadioChange = (event) => {
    this.setState({ value: event.target.value, helperText: "", error: false });
  };

  // handleSubmit = event => {

  // };

  render() {
    return (
      <div>
        <Navbar />
        <Grid container justify="center">
          <Grid item xs={11} sm={10} md={6} lg={4}>
            <Paper
              style={{
                textAlign: "center",
                marginTop: 60,
              }}
            >
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
                style={{ width: "90%", marginTop: 20 }}
              >
                <Button
                  // style={{ backgroundColor: "darkcyan", color: "white" }}
                  className="_tabbtn"
                  onClick={() => this.props.history.push("/signup")}
                >
                  SIGNUP AS TEACHER
                </Button>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "darkcyan",
                    color: "white",
                  }}
                  className="_tabbtn"
                >
                  SIGNUP AS SUTUDENT
                </Button>
              </ButtonGroup>
              <h3>STUEDENT SIGNUP</h3>

              <FormControl
                component="fieldset"
                error={this.state.error}
                style={{ width: "90%", textAlign: "center" }}
              >
                <TextField
                  id="outlined-dense"
                  label="Full Name"
                  type="text"
                  className="text"
                  margin="dense"
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({
                      name: e.target.value,
                      error: false,
                      helperText: "",
                    })
                  }
                />
                <br />
                <TextField
                  id="outlined-dense"
                  label="Email"
                  type="email"
                  margin="dense"
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({
                      email: e.target.value,
                      error: false,
                      helperText: "",
                    })
                  }
                />
                <br />
                <TextField
                  id="outlined-dense"
                  label="Password"
                  type="password"
                  margin="dense"
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                      error: false,
                      helperText: "",
                    })
                  }
                />
                <FormHelperText>{this.state.helperText}</FormHelperText>
                <br />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "darkcyan", width: "100%" }}
                  onClick={() => this.signup(this.state)}
                >
                  SignUp
                </Button>
                <p className="signupText">
                  Already Have an acount &nbsp;
                  <span
                    className="blue-text ml-1"
                    style={{ color: "blue",cursor: "pointer" }}
                    onClick={() => this.props.history.push("./studentlogin")}
                  >
                    <u> Login</u>
                  </span>
                </p>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default SignUp;
