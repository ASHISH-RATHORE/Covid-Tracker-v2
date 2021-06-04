import React,{useState} from 'react';
import "./Login.css";
import {Typography,message} from 'antd';
import HowToDo from './Component/HowToDo';
import OTP from './Component/OTP';
import ConfirmOTP from './Component/ConfirmOTP';
import axios from 'axios';


const {Title}=Typography;

function Login() {

const [TXN_ID, setTXN_ID] = useState();
const [state, setstate] = useState(false);



const onSubmit = async(number) => {
       
    try{
       const response=await axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',{"mobile": Object.values(number) });
       message.success(`OTP sent to ${Object.values(number)}`);
       setstate(true)

    }catch(err){
        message.error("Try after Sometime")
    }

}


          const onSubmitFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        

    return (
        <div>
            <div className="navbar1">
        <Title code={79848}>Book a Coronavirus Vaccination </Title>  
        </div>
        <div className="animation">
            {/* <HowToDo/> */}
        </div>
        <div className="form">
          {state!==true?<OTP onFinish={onSubmit} onFinishFailed={onSubmitFailed}/>:<ConfirmOTP/>}  
            
        </div>
        </div>
    )
}

export default React.memo(Login)
