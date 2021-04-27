import React from 'react';
import { useState, useEffect } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from 'react-awesome-calendar';
import "./ViewAppointments.css"
import AppointmentsDetails from "./AppointmentsDetails"

function ViewAppointments({ userType, token }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(10)
    },
  }));

  let [appointments, setAppointments] = useState([])
  let [events, setEvents] = useState([])
  let [focusEvent, setFocusEvent] = useState(-1)

  function fetchAppointments() {
    if(userType == 1){
      return fetchDoctorAppointments();
    }
    return fetch('http://127.0.0.1:5000/appointment', {
      headers: {
        Authorization: "Bearer " + token
      },
    })
      .then((response) => response.json())
      .then((appointments) => { setAppointments(appointments); updateCalendar(appointments); })
  }

  function fetchDoctorAppointments() {
    return fetch('http://127.0.0.1:5000/appointment_drs', {
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
        from: apptmnts[i]["appointment_time"]+".000Z",
        to: apptmnts[i]["appointment_time"]+".000Z",
        title: (userType == 2 ? "Dr. " + apptmnts[i]["doctor_name"] : apptmnts[i]["patient_name"])
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


    {focusEvent !== -1 && 
    <AppointmentsDetails 
      open={focusEvent !== -1}
      onClose={() => {setFocusEvent(-1); fetchAppointments()}}
      appointment={appointments[focusEvent]}
      deleteAppointment={(id) => deleteAppointment(id)}
      token = {token}
      userType = {userType}
      />
    }
  </div>
}

export default ViewAppointments