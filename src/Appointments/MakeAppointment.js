import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from 'react-awesome-calendar';

// const events = [{
//     id: 0,
//     color: '#fd3153',
//     from: '2021-05-02T18:00',
//     to: '2021-05-05T19:00',
//     title: 'This is an event'
// }, {
//     id: 1,
//     color: '#1ccb9e',
//     from: '2021-05-01T13:00',
//     to: '2021-05-05T14:00',
//     title: 'This is another event'
// }, {
//     id: 2,
//     color: '#3694DF',
//     from: '2021-05-05T13:00',
//     to: '2021-05-05T20:00',
//     title: 'This is also another event'
// }];

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

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

  let [events, setEvents] = useState([])
  let [appointments, setAppointments] = useState([])
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
        appointment_date: appointmentTime.slice(0, -8),
        appointment_description : appointmentDescription
      })
    }).then(response => {console.log(response)});
  };

  function fetchAppointments() {
    return fetch('http://127.0.0.1:5000/appointment_dr', {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body : JSON.stringify({
        doctor_name : doctorName
      })
    })
      .then((response) => response.json())
      .then((appointments) => { console.log(appointments); setAppointments(appointments); updateCalendar(appointments, true); })
      .then(() => setState(state+1))
  }

  function updateCalendar(apptmnts, reverse = false) {
    if (reverse){
      var busyEvents = apptmnts;
      var n = busyEvents.length;
      apptmnts = [];

      var cur = new Date();
      cur.addHours(1);
      cur.setMinutes(0);
      cur.setSeconds(0);
      cur.setMilliseconds(0);
      var i = 0;
      while(i < n){
        var busyTime = new Date(busyEvents[i]["appointment_time"]+".000Z");
        if (cur.getTime() <= busyTime.getTime()){ break; }
        i++;
      }
      
      var busyTime = (i < n ? new Date(busyEvents[i]["appointment_time"]+".000Z"): 0);
      for(var j = 0; j < 24*30; j++, cur=cur.addHours(1)){    
        while(i < n && busyTime.getTime() + 1000 < cur.getTime()) { 
          i++;
          if (i < n) busyTime = new Date(busyEvents[i]["appointment_time"]+".000Z");
          else busyTime = 0;
        }
//        if (i<n){console.log(cur, busyTime, cur.getTime(), busyTime.getTime())}
        if (i < n && Math.abs(cur.getTime() - busyTime.getTime()) < 1000) { i++; continue; }
        if (cur.getHours() < 11|| cur.getHours() > 20) { continue; }
        
        apptmnts.push({ 
          "appointment_time": cur.toISOString(),
          "doctor_id": doctorName
        })
      }
    }
    
    var curEvents = [];
    for (var i = 0; i < apptmnts.length; i++) {
      var curEvent = {
        id: i.toString(),
        color: "#00FF00",
        from: apptmnts[i]["appointment_time"],
        to: apptmnts[i]["appointment_time"],
        title: apptmnts[i]["doctor_id"]
      }
      curEvents.push(curEvent);
    }
    setEvents(curEvents);
  }

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
          onClickEvent={(event) => {setAppointmentTime(events[event]["from"]); setState(state+1); }}
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
            onClick = {() => {fetchAppointments();}}
            //TODO: If going from 0 to 1, check that the doctor name is valid (otherwise provide feedback)
            //And change the events variable accordingly
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