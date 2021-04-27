import React from 'react';
import SidebarRow from "./SidebarRow"
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HealingIcon from '@material-ui/icons/Healing';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FunctionsIcon from '@material-ui/icons/Functions';
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function Sidebar({setAppointmentsVariable, make_app, view_docs, userType, register, showStats}){
    return <div>
        {userType !== 0 && <SidebarRow fcn = {setAppointmentsVariable} Icon = {LocalHospitalIcon} title = 'View Appointments'></SidebarRow>}
        {userType === 2 && <SidebarRow fcn = {make_app} Icon = {ScheduleIcon} title = 'Make an Appointment'></SidebarRow>}
        {userType !== 0 && <SidebarRow fcn = {view_docs} Icon = {HealingIcon} title = 'View Doctors'></SidebarRow>}
        {userType === 0 && <SidebarRow fcn = {view_docs} Icon = {HealingIcon} title = 'View Users'></SidebarRow>}
        {userType === 0 &&  <SidebarRow fcn = {register} Icon = {PersonAddIcon} title = "Register a User"></SidebarRow>}
        {userType === 0 && <SidebarRow fcn = {showStats} Icon = {FunctionsIcon} title = 'Statistics'></SidebarRow>}
    </div>
}

export default Sidebar