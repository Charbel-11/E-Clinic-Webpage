import React, { useState } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function MakeAppointment({SERVER_URL, token}) {
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

  let [doctorName, setDoctorName] = useState("");
  let [appointmentTime, setAppointmentTime] = useState("");
  let [appointmentDescription, setAppointmentDescription] = useState("");

  function createAppointment(event) {
    event.preventDefault();
    return fetch(`${SERVER_URL}/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        doctor_name: doctorName,
        appointment_date: appointmentTime,
        appointment_description : appointmentDescription
      })
    }).then(response => {console.log(response)});  //todo, add it to all the appointment?
  };

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <form onSubmit={createAppointment}>
           <TextField
            label="Doctor"
            id="margin-normal"
            name="doctor"
            className={classes.textField}
            helperText="Username"
            onChange={ ({ target: { value } }) => setDoctorName(value) }
          />
          <TextField
            label="Appointment time"
            id="margin-normal"
            name="appointment_time"
            className={classes.textField}
            helperText="YYYY-MM-DDTHH:MM, e.g. 2017-01-12T14:12"
            onChange={ ({ target: { value } }) => setAppointmentTime(value) }
          />
          <TextField
            label="Description"
            id="margin-normal"
            name="appointment_description"
            className={classes.textField}
            helperText="e.g., severe headache"
            onChange={ ({ target: { value } }) => setAppointmentDescription(value) }
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