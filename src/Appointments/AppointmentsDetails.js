import { Button, Dialog, DialogTitle, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./AppointmentsDetails.css";

// Component that presents a dialog to collect credentials from the user
function AppointmentsDetails({
    open,
    onClose,
    appointment,
    deleteAppointment,
    token
}) {
    let [newAppointmentDescription, setAppointmentDescription] = useState(null)
    let [newAppointmentTime, setAppointmentTime] = useState(null)

    function updateAppointmentDescription(){
        return fetch('http://127.0.0.1:5000/appointment', {
          method: 'PATCH',
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }, body: JSON.stringify({
              'id' : appointment['id'],
              'appointment_description' : newAppointmentDescription
          })
        }).then(response => response.json())
        .then(data => {appointment = data})
    }

    function updateAppointmentTime(){
        return fetch('http://127.0.0.1:5000/appointment_time', {
          method: 'PATCH',
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }, body: JSON.stringify({
              'id' : appointment['id'],
              'appointment_time' : newAppointmentTime
          })
        }).then(response => response.json())
        .then(data => {console.log(data)})
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <div className="dialog-container">
                <div className="title">
                    <Typography variant="h4"> Appointment with {appointment["doctor_name"]} </Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Time: </Typography>
                    <Typography style={{marginLeft:20}}> {appointment["appointment_time"].slice(0,-3)} </Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Link: </Typography>
                    <Typography style={{marginLeft:20}}> {appointment["appointment_zoom"]} </Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Description: </Typography>
                    <Typography style={{marginLeft:20}}> {appointment["appointment_description"]}</Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Report: </Typography>
                    <Typography style={{marginLeft:20}}> ... </Typography>
                </div>

                <Typography className="form-item">Update Appointment description</Typography>
                <div className="form-item">
                    <TextField
                        label="New Description"
                        type="text"
                        value={newAppointmentDescription}
                        onChange={({ target: { value } }) => setAppointmentDescription(value)}
                        style={{flexDirection:'column'}}
                        />
                    <Button  variant="contained" size="small" color="primary" style={{marginLeft:20}} onClick = {updateAppointmentDescription}>
                        Update 
                    </Button>
                </div>

                <Typography className="form-item">Change Appointment Time</Typography>
                <div className="form-item">
                    <TextField
                        label="New Time"
                        type="text"
                        value={newAppointmentTime}
                        onChange={({ target: { value } }) => setAppointmentTime(value)}
                        style={{flexDirection: 'column'}}
                    />
                    <Button variant="contained" size="small" color="primary" style={{marginLeft:20}} onClick = {updateAppointmentTime}>
                        Update
                    </Button>
                </div>

                <div className="button">
                <Button variant="contained" size="small" color="primary"
                    onClick={() => { deleteAppointment(appointment["id"]); onClose(); }}>
                    Cancel Appointment 
                </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default AppointmentsDetails