import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Launch from "@material-ui/icons/Launch";
import Paper from "@material-ui/core/Paper";

import { AppBar } from "../../../Components";
import "./QuizSelected.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <>
      <AppBar props={this.props.history} />
      <div>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Paper style={{ marginTop: 50 }}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemAvatar>
                      {/* <Avatar> */}1{/* </Avatar> */}
                    </ListItemAvatar>
                    <ListItemText>Single-line item</ListItemText>
                    <ListItemSecondaryAction divider>
                      <IconButton
                        edge="end"
                        onClick={() => props.history.push("/quiz")}
                      >
                        <Launch color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
