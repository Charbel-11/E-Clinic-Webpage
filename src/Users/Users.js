import React from 'react';
import { useState, useEffect} from "react";
import  {DataGrid}  from "@material-ui/data-grid";
import {  Button } from "@material-ui/core";
import './Users.css'

function Users({token}){
    let [users, setUsers] = useState([])
    let [userId, setUsedId] = useState("")
    let [user_name, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [information, setInformation] = useState("")



    function fetchUsers(){
        console.log(token)
        try {
            return fetch('http://127.0.0.1:5000/users', {
            headers: {
                Authorization: "Bearer " + token
            },
            })
              .then(response => response.json())
              .then(users => {
                setUsers(users)
              });
          } catch (err) {
            console.log(err);
          }
    }

    function deleteUser() {
        return fetch(`http://127.0.0.1:5000/user/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          },
        })
        .then(() => fetchUsers())
    }
    function getUserBody(){
        var userBody = {}
        if(user_name !== ''){
            userBody.user_name = user_name
        }
        if(password !== ''){
            userBody.password = password
        }
        if(firstName !== ''){
            userBody.first_name = firstName
        }
        if(lastName !== ''){
            userBody.last_name = lastName
        }
        if(information !== ''){
            userBody.information = information
        }
        return userBody
    }

    function updateUser() {
        console.log(getUserBody())
        return fetch(`http://127.0.0.1:5000/user/${userId}`, {
          method: 'PATCH',
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }, body: JSON.stringify(getUserBody())
        })
        .then(() => fetchUsers())
    }

    useEffect(fetchUsers, [])

    return <div >
            <DataGrid className = "doctor_grid"
              columns={[
                { field: "id", width: 150 },  
                { field: "first_name", width: 150 },
                { field: "last_name", width: 150 },
                { field: "user_name", width: 150 },
                { field: "information", width: 150 },
                { field: "is_doctor", width: 150 }
              ]}
              rows={users}
              autoHeight
              spacing = {1}
            />

            <div className = "DeleteUser">
                <h2>Delete User by Writing Id Below</h2>
                <form className = "DeleteUser">
                <label>
                    User Id:
                    <input
                        className="amount-box"
                        id="userId"
                        type="number"
                        value={userId}
                        onChange={e => setUsedId(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <Button className="button" variant="contained" size="small" color="primary" onClick = {deleteUser}>
                    Delete
                </Button>
                </form>
            </div>
            <br></br>

            <div className = "UpdateUser">
                <h2>Update User by Filling the Form Below</h2>
                <form className = "UpdateUser">
                <label>
                    User Id:
                    <input
                        className="amount-box"
                        id="userId"
                        type="number"
                        value={userId}
                        onChange={e => setUsedId(e.target.value)}
                    />
                </label>
                <h3 className = "UpdateUser">Change one or more of the following for the chosen Id</h3>

                <label>
                    Username:
                    <input
                        className="amount-box"
                        id="user_name"
                        type="text"
                        value={user_name}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <br></br>

                <label>
                    Password:
                    <input
                        className="amount-box"
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <br></br>

                <label>
                    First Name:
                    <input
                        className="amount-box"
                        id="first_name"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <br></br>

                <label>
                    Last Name:
                    <input
                        className="amount-box"
                        id="last_name"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <br></br>

                <label>
                    Information:
                    <input
                        className="amount-box"
                        id="information"
                        type="text"
                        value={information}
                        onChange={e => setInformation(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <Button className="UpdateUser" variant="contained" size="small" color="primary" onClick = {updateUser}>
                   Update
                </Button>
                <br></br>
                </form>
            </div>
    </div>




}

export default Users