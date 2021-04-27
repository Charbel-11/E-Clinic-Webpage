import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function Register({SERVER_URL, token}) {
 
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [information, setInformation] = useState("");
  let [is_doctor, setIsDoctor] = useState(0);
  let [successfull, setSuccessful] = useState("");


  function createUser(username, password, first_name, last_name, information,is_doctor) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
        first_name : first_name,
        last_name : last_name,
        information : information,
        is_doctor : is_doctor
      })
    }).then(response => {setSuccessful("Registered Successfully")})
    .catch(()=>setSuccessful("Invalid Input, Please try again!"))
  }

  return (
    <div className="container">
        <div className="form-item">
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={({ target: { value } }) => setUserName(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="First Name"
            type="text"
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Last Name"
            type="text"
            value={lastName}
            onChange={({ target: { value } }) => setLastName(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Information"
            type="text"
            value={information}
            onChange={({ target: { value } }) => setInformation(value)}
          />
        </div>
        <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            onChange={({ target: { checked } }) => setIsDoctor(checked)}
          />
        }
        label="is Doctor"
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => createUser(username, password, firstName, lastName, information,is_doctor)}
        >
            Create User
        </Button>
        <br></br>
        <br></br>
        {successfull}
      </div>
  );
}

export default Register