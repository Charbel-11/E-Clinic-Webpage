import React from 'react';
import './SideBarRow.css'


function SidebarRow({fcn, Icon, title}){
    return <div className = "sideBarRow">
        {Icon && <Icon onClick = {fcn}></Icon>}
        <h4 >{title}</h4>
    </div>
}

export default SidebarRow