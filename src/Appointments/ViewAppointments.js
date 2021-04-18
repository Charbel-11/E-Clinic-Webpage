import React from 'react';
import { useState, useEffect} from "react";
import { Typography } from "@material-ui/core";
import  {DataGrid}  from "@material-ui/data-grid";
import {
  Button
} from "@material-ui/core";
import "./ViewAppointments.css"

function ViewAppointments({userType, token}){
    let [appointments, setAppointments] = useState([])
    let [appointmentId, setAppointmentId] = useState(null)
    let [appointmentDesctiption, setAppointmentDescription] = useState(null)

    function fetchAppointments(){
        return fetch('http://127.0.0.1:5000/appointment', {
            headers: {
              Authorization: "Bearer " + token,
            },
        })
            .then((response) => response.json())
            .then((appointments) => setAppointments(appointments));
    }

    function deleteAppointment(){
      return fetch('http://127.0.0.1:5000/appointment', {
        method : 'DELETE',
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id : appointmentId
        })
    })
        .then((response) => response.json())
        .then(response => console.log("Deleted"));
    }

    useEffect(fetchAppointments, [])


    return <div >
            <DataGrid className = "appointments_grid"
              columns={[
                { field: "doctor_id", headerName: "Doctor", width: 150 },
                { field: "appointment_time", headerName: "Time", width: 175 },
                { field: "appointment_description", headerName: "Description", width: 175}
              ]}
              rows={appointments}
              autoHeight
              spacing = {1}
            />
            {
              userType == 0 && <div className = "DeleteForm"> 
                <h2> Delete Appointment by Inserting the Corresponding Id</h2>
                <form className = "DeleteAppointment">
                    <label>Appointment Id</label>
                    <input
                      className="amount-box"
                      id="appointmentId"
                      type="number"
                      value={appointmentId}
                      onChange={e => setAppointmentId(e.target.value)}
                    />
                     <Button variant="contained" size = "small" color="primary">
                      Delete
                    </Button>
                </form>

                <h2 className = "UpdateAppointment">Update Appointment description below</h2>
                <form>
                    <label>Appointment Id</label>
                    <input
                      className="amount-box"
                      id="appointmentId"
                      type="number"
                      value={appointmentId}
                      onChange={e => setAppointmentId(e.target.value)}
                    />
                    <label>Appointment Description</label>
                    <input
                      className="amount-box"
                      id="appointmentDescription"
                      type="text"
                      value={appointmentDesctiption}
                      onChange={e => setAppointmentDescription(e.target.value)}
                    />
                     <Button variant="contained" size = "small" color="primary">
                      Update
                    </Button>
                </form>

              </div>
            }
    </div>
}

export default ViewAppointments