import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button, Paper
} from "@material-ui/core";
import { useState, useEffect } from "react";
import UserCredentialDialog from "./UserCredentialsDialog/UserCredentialsDialog";
import SignUpDialog from "./SignUpDialog/SignUpDialog"
import { MakeAppointment } from "./Appointments/MakeAppointment";
import Doctors from "./Doctors/Doctors"
import ViewAppointments from "./Appointments/ViewAppointments"
import { getUserToken, saveUserToken, saveUserType, getUserType } from "./localStorage";
import Register from './Register/Register'
import Users from './Users/Users'

import SideBar from "./SideBar/Sidebar"
import homepage from './homepage.png'


const States = {
  PENDING: "PENDING",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED"
};

export const SERVER_URL = "http://127.0.0.1:5000";

function App() {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2)
    },
  }));

  // States
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [appointmentsVariable, setAppointmentsVariable] = useState(false);
  let [make_app, set_make_app] = useState(false);
  let [view_docs, set_view_docs] = useState(false);
  let [view_stats, set_view_stats] = useState(false);
  let [register, setRegister] = useState(false);
  let [userType, setUserType] = useState(getUserType());  // 0 - Admin,  1 - User
  let [errorMsg, setErrorMsg] = useState("");
  let [numUsers, setnumUsers] = useState("");
  let [numDocs, setnumDocs] = useState("");
  let [numPat, setnumPats] = useState("");
  let [numAppts, setnumAppts] = useState("")
  
  function closeAllPanels(){
    setAppointmentsVariable(false);
    set_make_app(false);
    set_view_docs(false);
    setRegister(false);
    set_view_stats(false);
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

  function changePanel(){
    closeAllPanels(); setAppointmentsVariable(true);
  }

  function getNumberofAppointments(){
    try {
      fetch("http://127.0.0.1:5000/appointments/number")
        .then(response => response.json())
        .then(data => {
          setnumAppts(data.appointments_number)
        });
    } catch (err) {
      console.log(err);
    }
  }

  function getNumberofUsers(){
    try {
      fetch("http://127.0.0.1:5000/users/number", {
        headers: {
        "Authorization": "Bearer " + userToken
      }})
        .then(response => response.json())
        .then(data => {
          setnumDocs(data.doctors_number);
          setnumPats(data.patients_number);
          setnumUsers(data.users_number);
        });
    } catch (err) {
      console.log(err);
    }
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
        setUserType(body.is_doctor);
        closeAllPanels();
        if (remember) { saveUserToken(body.token); saveUserType(body.is_doctor); }
        else { saveUserToken(null); saveUserType(null); }
      })
      .catch(()=>setErrorMsg("Wrong Username/Password"))
      ;
  }

  function logout(){
    setUserToken(null);
    saveUserToken(null);
    saveUserType(null);
    setErrorMsg("");
  }

  useEffect(getNumberofUsers, [])
  // useEffect(getNumberofAppointments,[])

  const classes = useStyles();
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
                 userType = {userType}
                 register = {() => {closeAllPanels(); setRegister(true)}}
                 showStats = {() => {closeAllPanels(); set_view_stats(true); }}
                 className = "sideBar">
            </SideBar>
            <div className = "Feed">
              {
                appointmentsVariable === true && 
                <div className = "FeedBox">
                   <h1>Select an appointment for more details</h1>
                   <ViewAppointments userType = {userType} token={userToken}></ViewAppointments>     
                </div>
              }
              {
                make_app === true && userType == 2 &&
                <div className = "FeedBox">
                   <h1>Create an Appointment!</h1>
                   <MakeAppointment SERVER_URL={SERVER_URL} token={userToken} changePanel = {changePanel}></MakeAppointment>    
                </div>
              } 
              {
                view_docs === true && 
                <div className = "FeedBox">
                   {userType > 0 && <h1>View Doctors in the Table Below!</h1>}
                   {userType === 0 && <h1>View Users in the Table Below!</h1>}
                   
                   {userType === 0 && <Users token = {userToken}></Users>}
                   {userType > 0 && <Doctors token = {userToken}></Doctors>}
                </div>
              } 
              {
                register === true && 
                <div className = "FeedBox">
                   <h1>Register a User by Filling the Form Below!</h1>
                   <Register SERVER_URL={SERVER_URL} token = {userToken}></Register>     
                </div>
              }
              {
                view_stats === true && 
                <div className = "stats">
                  <Paper className={classes.root}>
                    <Typography> Total number of users: {numUsers}</Typography>
                    <Typography> Total number of doctors: {numDocs}</Typography>
                    <Typography> Total number of patients: {numPat}</Typography>
                    <Typography> Total number of appointments: {numAppts}</Typography>
                  </Paper>      
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
          setErrorMsg("");
        }}
        title={"Login"}
        submitText={"Login"}
        errorMsg={errorMsg}
      />
    </div>
  );
}

export default App;
