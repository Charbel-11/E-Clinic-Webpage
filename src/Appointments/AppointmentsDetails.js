import { Button, Dialog, DialogTitle, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./AppointmentsDetails.css";

// Component that presents a dialog to collect credentials from the user
function AppointmentsDetails({
    open,
    onClose,
    appointment,
    deleteAppointment
}) {
    let [newAppointmentDescription, setAppointmentDescription] = useState(null)
    let [newAppointmentTime, setAppointmentTime] = useState(null)

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <div className="dialog-container">
                <Typography variant="h4" className="title"> Appointment with {appointment["doctor_id"]} </Typography>
 
                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Time: </Typography>
                    <Typography style={{marginLeft:20}}> {appointment["appointment_time"]} </Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Link: </Typography>
                    <Typography style={{marginLeft:20}}> ... </Typography>
                </div>

                <div className="form-item" style={{ display: "flex" }}>
                    <Typography style={{flexDirection:'column'}} > Description: </Typography>
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
                <Button className="button" variant="contained" size="small" color="primary" style={{marginLeft:20}}>
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
                    style={{flexDirection:'column'}}
                />
                <Button className="button" variant="contained" size="small" color="primary" style={{marginLeft:20}}>
                    Update
                </Button>
                </div>

                <Button className="button" variant="contained" size="small" color="primary"
                    onClick={() => { deleteAppointment(/* DONT FORGET */ 3); onClose(); }}>
                    Cancel Appointment
                </Button>
            </div>
        </Dialog>
    );
}

export default AppointmentsDetails