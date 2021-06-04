import React from 'react';
import {Layout} from 'antd';
import CheckAvailability from './Components/CheckAvailability';
import Header from './Components/Header';
import './Slots.css'
const {  Footer } = Layout;

 function Slots() {
    return (
        <div id="center1">
          <div>
               <Header/>
         </div>
         
          <div>
            <CheckAvailability/>
          
        </div>
        <Footer style={{ textAlign: 'center' }}>Covid 19 Tracker ©2020-2021 Created by Ashish Rathore</Footer>
        </div>
    )
}

export default React.memo(Slots);

