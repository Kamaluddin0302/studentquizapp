import React from "react";
import Appbar from "./../../Components/Appbar/Appbar";
import "./creatTest.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebaseApp from "../../Config/Firebase/Firebase";
let database = firebaseApp.database().ref("/");
class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      success: true,
    };
  }
  logout = () => {
    alert("");
    firebaseApp
      .auth()
      .signOut()
      .then((res) => {
        // Sign-out successful.
        console.log(" Sign-out successful.");
        this.props.history.push("/");
      })
      .catch(function (error) {
        console.log(error.message);
        // An error happened.
      });
  };

  render() {
    const userData = this.props.location.state.userData;
    return (
      <div>
        <Appbar userData={userData} props={this.props.history} />

        <Grid container justify="center">
          <Grid>
            <Paper className="sent_email">
              <br />
              <br />
              <p>Quiz created successfully</p>
              <p>quiz key sent on you Email</p>

              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "darkcyan",
                  color: "white",
                  widht: "200px",
                }}
                onClick={() => this.logout()}
              >
                LOGOUT
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateTest;
