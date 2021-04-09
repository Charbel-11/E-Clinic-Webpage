import React from 'react';
import './SideBarRow.css'


function SidebarRow({Icon, title}){
    return <div className = "sideBarRow">
        {Icon && <Icon></Icon>}
        <h4>{title}</h4>
    </div>
}

export default SidebarRow