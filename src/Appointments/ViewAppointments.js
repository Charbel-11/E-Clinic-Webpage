import React from 'react';
import { useState, useEffect} from "react";
import { Typography } from "@material-ui/core";
import  {DataGrid}  from "@material-ui/data-grid";

function ViewAppointments({token}){
    let [appointments, setAppointments] = useState([])

    function fetchAppointments(){
        return fetch('http://127.0.0.1:5000/appointment', {
            headers: {
              Authorization: "Bearer " + token,
            },
        })
            .then((response) => response.json())
            .then((appointments) => setAppointments(appointments));
    }

    useEffect(fetchAppointments, [])

    return <div >
            <DataGrid className = "appointments_grid"
              columns={[
                { field: "doctor_id", headerName: "Doctor", width: 150 },
                { field: "appointment_time", headerName: "Time", width: 175 },
                { field: "appointment_description", headerName: "Description", width: 175 }
              ]}
              rows={appointments}
              autoHeight
              spacing = {1}
            />
    </div>
}

export default ViewAppointments