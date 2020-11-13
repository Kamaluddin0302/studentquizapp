import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "./../../Components/Navbar/Appbar";
import firebaseApp from "../../Config/Firebase/Firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "./login.css";
let database = firebaseApp.database().ref("/");
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      value: "",
      helperText: "",
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        database.child("Users/")
        // User is signed in.
        // this.props.history.push({
        //   pathname: "./category",
        //   state: {
        //     uid: user.uid,
        //   },
        // });
        localStorage.setItem("teacherEmail", user.email);
      } else {
        console.log("No user is signed in.");
      }
    });
  }

  login = () => {
    let data = this.state;
    if (data.email && data.password) {
      let data = this.state;
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          firebaseApp.database().ref("/").child(`Users/${res.user.uid}`).on("value", (data)=> {
            let value = data.val();
            if(value) {
          this.setState({ helperText: "signup successfully!", error: false });
          this.props.history.push({
            pathname: "/createquestion",
            state: {
              uid: res.user.uid,
            },
          });
     
      
          localStorage.setItem("teacherEmail", res.user.email);
        }
        else {
          this.setState({ helperText: "There is no user record on this email!", error: true });

        }
      })
      
        })
        .catch((err) => {
          if (
            err.message ===
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            this.setState({
              helperText: "There is no user record on this email!",
              error: true,
            });
          } else {
            this.setState({ helperText: err.message, error: true });
          }
        });
    } else {
      this.setState({ helperText: "Please complete fill form !", error: true });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <Grid container justify="center">
          <Grid item xs={11} sm={10} md={6} lg={4} style={{ marginTop: 100 }}>
            <Paper
              className="_grid"
              style={{
                textAlign: "center",
              }}
            >
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
                style={{ width: "90%", marginTop: 20 }}
              >
                <Button
                  style={{ backgroundColor: "darkcyan", color: "white" }}
                  className="_tabbtn"
                >
                  LOGIN AS TEACHER
                </Button>
                <Button
                  style={{ width: "100%" }}
                  className="_tabbtn"
                  onClick={() => this.props.history.push("/studentlogin")}
                >
                  LOGIN AS STUDENT
                </Button>
              </ButtonGroup>
              <h3>TEACHER LOGIN</h3>
              <FormControl
                component="fieldset"
                error={this.state.error}
                style={{ width: "90%", textAlign: "center" }}
              >
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
                  className="loginBtn"
                  style={{ backgroundColor: "darkcyan", width: "100%" }}
                  onClick={() => this.login()}
                >
                  Login
                  {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                </Button>
                <p className="signupText">
                  Don't Have an acount &nbsp;
                  <span
                    className="blue-text ml-1"
                    style={{ color: "blue",cursor: "pointer" }}
                    onClick={() => this.props.history.push("/signup")}
                  >
                   <u>  Sign Up</u>
                  </span>
                </p>
                {/* <p className="signupText"> */}
                <span
                  className="blue-text ml-1"       
                  style = {{cursor: "pointer"}}
                  onClick={() => this.props.history.push("/forgotpassword")}
                >
                  <u> forgot password </u> &nbsp;
                </span>
                {/* </p> */}
              </FormControl>
              <br />
              <br />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Login;
