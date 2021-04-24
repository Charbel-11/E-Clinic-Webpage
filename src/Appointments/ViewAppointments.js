import React from 'react';
import { useState, useEffect } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from 'react-awesome-calendar';
import "./ViewAppointments.css"

function ViewAppointments({ userType, token }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(10)
    },
  }));

  let [appointments, setAppointments] = useState([])
  let [appointmentDescription, setAppointmentDescription] = useState(null)
  let [events, setEvents] = useState([])
  let [focusEvent, setFocusEvent] = useState(-1)

  function fetchAppointments() {
    return fetch('http://127.0.0.1:5000/appointment', {
      headers: {
        Authorization: "Bearer " + token
      },
    })
      .then((response) => response.json())
      .then((appointments) => { setAppointments(appointments); updateCalendar(appointments); })
  }

  function deleteAppointment(appointmentId) {
    console.log(appointmentId)
    return fetch('http://127.0.0.1:5000/appointment', {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: appointmentId
      })
    })
      .then(() => fetchAppointments())
  }

  useEffect(fetchAppointments, [])

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updateCalendar(apptmnts) {
    var curEvents = [];
    for (var i = 0; i < apptmnts.length; i++) {
      var curEvent = {
        id: i.toString(),
        color: getRandomColor(),
        from: apptmnts[i]["appointment_time"],
        to: apptmnts[i]["appointment_time"],
        title: apptmnts[i]["doctor_id"]
      }
      curEvents.push(curEvent);
    }
    setEvents(curEvents);
  }

  const classes = useStyles();
  return <div >
    <Calendar
      events={events}
      onClickEvent={(event) => setFocusEvent(event)} />

    <Paper className={classes.root}>
      {focusEvent !== -1
        &&
        <div className="infoForm">
          <Typography variant="h4" align="center"> Appointment with {appointments[focusEvent]["doctor_id"]} </Typography>

          <Typography className="form" variant="h5"> Description </Typography>
          <Typography variant="body1"> {appointments[focusEvent]["description"]} </Typography>

          <Typography className="form" variant="h5">Update Appointment description</Typography>
          <TextField            
            label="New Description"
            type="text"
            value={appointmentDescription}
            onChange={({ target: { value } }) => setAppointmentDescription(value)}>
          </TextField>
            <Button className="button" variant="contained" size="small" color="primary">
              Update
            </Button>

          <Typography className="form" variant="h5">Change Appointment Time</Typography>
          <TextField            
            label="New Time"
            type="text"
            value={appointments[focusEvent]["appointment_time"]}
            onChange={({ target: { value } }) =>{}}>   
          </TextField>
          <Button className="button" variant="contained" size="small" color="primary">
              Update
            </Button>

            <Button className="button" variant="contained" size="small" color="primary" onClick={() => setFocusEvent(-1)}>
              Close
            </Button>

            <Button className="button" variant="contained" size="small" color="primary" 
              onClick={()=>{deleteAppointment(/* DONT FORGET */ 3); setFocusEvent(-1)}}>
              Cancel Appointment
            </Button>
        </div>
      }
    </Paper>
  </div>
}

export default ViewAppointments