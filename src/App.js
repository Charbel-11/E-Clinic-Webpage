import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { useState } from "react";
import UserCredentialDialog from "./UserCredentialsDialog/UserCredentialsDialog";
import SignUpDialog from "./SignUpDialog/SignUpDialog"
import { MakeAppointment } from "./Appointments/MakeAppointment";
import Doctors from "./Doctors/Doctors"
import ViewAppointments from "./Appointments/ViewAppointments"
import { getUserToken, saveUserToken } from "./localStorage";


import SideBar from "./SideBar/Sidebar"
import homepage from './homepage.png'


const States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED"
};

export const SERVER_URL = "http://127.0.0.1:5000";

function App() {
  // States
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [appointmentsVariable, setAppointmentsVariable] = useState(false);
  let [make_app, set_make_app] = useState(false);
  let [view_docs, set_view_docs] = useState(false);
  let [userType, setuserType] = useState(0);  // 0 - Admin,  1 - Doctor  2 - Patient 
  
  function closeAllPanels(){
    setAppointmentsVariable(false);
    set_make_app(false);
    set_view_docs(false);
  }

  // Helper Functions
  function createUser(username, password, first_name, last_name, information, remember) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
        first_name : first_name,
        last_name : last_name,
        information : information
      })
    }).then(response => login(username, password, remember));
  }

  function login(username, password, remember) {
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
        if (remember) { saveUserToken(body.token); }
        else { saveUserToken(null); }
      });
  }

  function logout(){
    setUserToken(null);
    saveUserToken(null);
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
              <Button color="inherit" onClick = {() => logout()}>
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
                 setAppointmentsVariable = {() => {closeAllPanels(); setAppointmentsVariable(true);}} 
                 make_app = {() => {closeAllPanels(); set_make_app(true);}}
                 view_docs = {() => {closeAllPanels(); set_view_docs(true)}}
                 className = "sideBar">
            </SideBar>
            <div className = "Feed">
              {
                appointmentsVariable === true && 
                <div className = "FeedBox">
                   <h1>View Your Appointments in the Table Below!</h1>
                   <ViewAppointments userType = {userType} token={userToken}></ViewAppointments>     
                </div>
              }
              {
                make_app === true && 
                <div className = "FeedBox">
                   <h1>Create an Appointment by filling the Form Below!</h1>
                   <MakeAppointment SERVER_URL={SERVER_URL} token={userToken}></MakeAppointment>    
                </div>
              } 
              {
                view_docs === true && 
                <div className = "FeedBox">
                <h1>View Doctors in the Table Below!</h1>
                   <Doctors></Doctors>   
                </div>
              } 
            </div>
          </div>
        ) : <div className = "home">
        <img src={homepage} className = "homeImage" width = '500' height = '500'></img> </div>
      }

























      <SignUpDialog
        open={authState === States.USER_CREATION ? true : false}
        onSubmit={(username, password, first_name, last_name, information, remember) => {
          createUser(username, password, first_name, last_name, information, remember);
        }}
        onClose={() => {
          setAuthState(States.PENDING);
        }}
        title={"Register"}
        submitText={"Register"}
      />

      <UserCredentialDialog
        open={authState === States.USER_LOG_IN ? true : false}
        onSubmit={(username, password, remember) => {
          login(username, password, remember);
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
