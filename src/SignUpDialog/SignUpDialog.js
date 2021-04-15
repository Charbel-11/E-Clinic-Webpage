import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./SignUpDialog.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Component that presents a dialog to collect credentials from the user
function SignUpDialog({
  open,
  onSubmit,
  onClose,
  title,
  submitText
}) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [information, setInformation] = useState("");
  let [remember, setRemember] = useState("");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        <div className="form-item">
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
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
            onChange={({ target: { checked } }) => setRemember(checked)}
          />
        }
        label="Remember Me"
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit(username, password, firstName, lastName, information)}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}

export default SignUpDialog