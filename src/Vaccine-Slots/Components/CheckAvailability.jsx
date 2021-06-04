import React,{useState} from 'react';
import { Radio } from 'antd';
import './CheckAvailability.css'
import Pincode from './Pincode';
import District from './District';


function CheckAvailability() {
const [state, setstate] = useState('pincode')
    const ClickHandler = e => {
        setstate(e.target.value);
      };


    return (
        <div id="options-type">
        
        <div className="selector">
        <Radio.Group onChange={ClickHandler} defaultValue="pincode" buttonStyle="solid">
      <Radio.Button value="pincode">By Pincode</Radio.Button>
      <Radio.Button value="district">By District</Radio.Button>
    </Radio.Group>
        </div>
    <div>
        {state==="pincode" ?<Pincode/>:<District/>}
        
    </div>
    

        </div>
    )
}

export default React.memo(CheckAvailability)
