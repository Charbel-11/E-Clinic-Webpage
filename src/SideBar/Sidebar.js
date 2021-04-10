import React from 'react';
import SidebarRow from "./SidebarRow"
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HealingIcon from '@material-ui/icons/Healing';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InfoIcon from '@material-ui/icons/Info';

function Sidebar({setAppointmentsVariable, make_app}){
    return <div>
        <SidebarRow fcn = {setAppointmentsVariable} Icon = {LocalHospitalIcon} title = 'View Appointments'></SidebarRow>
        <SidebarRow fcn = {make_app} Icon = {ScheduleIcon} title = 'Make an Appointment'></SidebarRow>
        <SidebarRow Icon = {HealingIcon} title = 'View Doctors'></SidebarRow>
        <SidebarRow Icon = {FavoriteIcon} title = 'Donate'></SidebarRow>
        <SidebarRow Icon = {LocalPharmacyIcon} title = 'View Your Medications'></SidebarRow>
        <SidebarRow Icon = {MenuBookIcon} title = 'View Your Reports'></SidebarRow>
        <SidebarRow Icon = {InfoIcon} title = 'About Us'></SidebarRow>
    </div>
}

export default Sidebar