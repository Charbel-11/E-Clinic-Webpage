import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from 'react-awesome-calendar';

const events = [{
    id: 0,
    color: '#fd3153',
    from: '2021-05-02T18:00',
    to: '2021-05-05T19:00',
    title: 'This is an event'
}, {
    id: 1,
    color: '#1ccb9e',
    from: '2021-05-01T13:00',
    to: '2021-05-05T14:00',
    title: 'This is another event'
}, {
    id: 2,
    color: '#3694DF',
    from: '2021-05-05T13:00',
    to: '2021-05-05T20:00',
    title: 'This is also another event'
}];

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
  let [state, setState] = useState(0);

  function createAppointment() {
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
    }).then(response => {console.log(response)});
  };

  const classes = useStyles();
  return (
    <div>
      <div>
      <Paper className={classes.root}>
          {state === 0 && 
           <TextField
            label="Doctor"
            id="margin-normal"
            name="doctor"
            className={classes.textField}
            helperText="Username"
            onChange={ ({ target: { value } }) => setDoctorName(value) }
          />
          }
         { state === 1 &&
          <Calendar 
          events={events} 
          onClickEvent={(event)=> setAppointmentTime(events[event]["from"])}
          />
          }
          {state === 2 && 
            <TextField
            label="Description"
            id="margin-normal"
            name="appointment_description"
            className={classes.textField}
            helperText="e.g., severe headache"
            onChange={ ({ target: { value } }) => setAppointmentDescription(value) }
          />
          }          
          { state > 0 && 
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick = {() => {
              setState(state-1); 
              if(state === 1) {setAppointmentTime("");}
            }
          }
          >
            Back
          </Button>
          }
          { ((state === 0 && doctorName !== "") || (state === 1 && appointmentTime !== "")) &&
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick = {() => setState(state+1)}
          >
            Next
          </Button>
          }
      </Paper> 
      </div>
      <div>
        <br/> <br/>
      <Paper className={classes.root}>
        <Typography variant="body1">Doctor Name: {doctorName}</Typography>
        <Typography variant="body1">Time: {appointmentTime} </Typography>
        <Typography variant="body1"> Description: {appointmentDescription} </Typography>

        { state === 2 && appointmentDescription !== "" &&
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={()=>createAppointment()}
          >
            Create
          </Button>
          }
        </Paper>
      </div>
    </div>
  );
}