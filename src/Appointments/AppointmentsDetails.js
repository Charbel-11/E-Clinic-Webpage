import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./AppointmentsDetails.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Component that presents a dialog to collect credentials from the user
function AppointmentsDetails({
  open,
  onSubmit,
  onClose,
  title,
  submitText
}) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
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
          onClick={() => onSubmit(username, password, remember)}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}

export default UserCredentialsDialog