import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { useState, useEffect} from "react";
import UserCredentialDialog from "./UserCredentialsDialog/UserCredentialsDialog";
import { MaterialUIFormSubmit } from "./Form/MaterialUIFormSubmit";

import SideBar from "./SideBar/Sidebar"
import homepage from './homepage.png'


const States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED"
};

var SERVER_URL = "http://127.0.0.1:5000";

function App() {
  // States
  let [userToken, setUserToken] = useState(null);
  let [authState, setAuthState] = useState(States.PENDING);
  let [appointmentsVariable, setAppointmentsVariable] = useState(false);
  let [make_app, set_make_app] = useState(false);
  


  // Helper Functions
  function createUser(username, password) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: username,
        password: password
      })
    }).then(response => login(username, password));
  }

  function login(username, password) {
    return fetch(`${SERVER_URL}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(body => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
      });
  }


  return (
    <div className="App">

      <AppBar position="static" color = "primary" className = "appBar">
        <Toolbar className="header">
          <Typography variant="h5" className="header_title">
            CSE CLINIC
          </Typography>
          <div>
            {userToken !== null ? (
              <Button color="inherit" onClick = {() => setUserToken(null)}>
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_CREATION)}
                >
                  {" "}
                  Register{" "}
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_LOG_IN)}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>


      {
        userToken !== null ? (
          <div className = "loggedInHome"> 
            <SideBar
                 setAppointmentsVariable = {() => {setAppointmentsVariable(true)}} 
                 make_app = {() => {set_make_app(true)}}
                 className = "sideBar">
            </SideBar>
            <div className = "Feed">
              {
                appointmentsVariable === true && 
                <div>
                   Appointments 
                </div>
              }
              {
                make_app === true && 
                <div className = "FeedBox">
                   <h1>Create an Appointment by filling the Form Below!</h1>
                   <MaterialUIFormSubmit></MaterialUIFormSubmit>    
                </div>
              } 
            </div>
          </div>
        ) : <div className = "home">
        <img src={homepage} className = "homeImage" width = '500' height = '500'></img> </div>
      }

























      <UserCredentialDialog
        open={authState == States.USER_CREATION ? true : false}
        onSubmit={(username, password) => {
          createUser(username, password);
        }}
        onClose={() => {
          setAuthState(States.PENDING);
        }}
        title={"Register"}
        submitText={"Register"}
      />

      <UserCredentialDialog
        open={authState == States.USER_LOG_IN ? true : false}
        onSubmit={(username, password) => {
          login(username, password);
        }}
        onClose={() => {
          setAuthState(States.PENDING);
        }}
        title={"Login"}
        submitText={"Login"}
      />



    </div>
  );
}

export default App;
