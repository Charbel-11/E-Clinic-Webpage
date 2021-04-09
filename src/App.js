import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { useState} from "react";
import UserCredentialDialog from "./UserCredentialsDialog/UserCredentialsDialog";
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
  


  // Helper Functions
  function createUser(username, password) {
    return fetch(`${SERVER_URL}/addUser`, {
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
    return fetch(`${SERVER_URL}/authenticate`, {
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
            <SideBar className = "sideBar"></SideBar>
            <div className = "Feed">
              Hello World 
            </div>
          </div>
        ) : <div className = "home"><img src={homepage} className = "homeImage" width = '500' height = '500'></img> </div>
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
