import React, { useReducer } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function MaterialUIFormSubmit(props) {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      doctor: "",  
      appointment_time: "",
      appointment_description: ""
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };

    fetch("http://127.0.0.1:5000/exchangeRate/3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const classes = useStyles();

  console.log(props);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form onSubmit={handleSubmit}>
           <TextField
            label="Doctor"
            id="margin-normal"
            name="doctor"
            defaultValue={formInput.name}
            className={classes.textField}
            helperText="Ahmad Serhal"
            onChange={handleInput}
          />
          <TextField
            label="Appointment time"
            id="margin-normal"
            name="appointment_time"
            defaultValue={formInput.email}
            className={classes.textField}
            helperText="02/05/2021"
            onChange={handleInput}
          />
          <TextField
            label="Description"
            id="margin-normal"
            name="appointment_description"
            defaultValue={formInput.name}
            className={classes.textField}
            helperText="Severe Headache"
            onChange={handleInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create
          </Button>
        </form>
      </Paper>
    </div>
  );
}