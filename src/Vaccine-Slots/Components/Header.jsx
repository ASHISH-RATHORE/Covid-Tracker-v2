import React from 'react'
import {Typography} from 'antd';
import './Header.css'


const {Title}=Typography;

function Header() {
    return (
        <div className="navbar">
 
        <Title type="success" className="title" >

        Check your nearest vaccination center and slots availability
        </Title>

        </div>
    )
}

export default React.memo(Header);
