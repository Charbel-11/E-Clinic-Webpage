import React from 'react';
import { useState, useEffect} from "react";
import {
    Typography
  } from "@material-ui/core";
import  {DataGrid}  from "@material-ui/data-grid";
import './Doctors.css'

function Doctors(){

    let [doctors, setDoctors] = useState([])

    function fetchDoctors(){
        try {
            fetch("http://127.0.0.1:5000/doctors")
              .then(response => response.json())
              .then(doctors => {
                setDoctors(doctors)
              });
          } catch (err) {
            console.log(err);
          }
    }

    useEffect(fetchDoctors, [])



    return <div >
            <DataGrid className = "doctor_grid"
              columns={[
                { field: "first_name" },
                { field: "last_name" },
                { field: "user_name" },
                { field: "information" }
              ]}
              rows={doctors}
              autoHeight
              spacing = {1}
            />
    </div>
}

export default Doctors