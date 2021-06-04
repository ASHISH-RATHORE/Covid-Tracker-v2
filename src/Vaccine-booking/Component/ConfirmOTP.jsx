import React,{useState,useEffect}from 'react';
import {Statistic, message,Space,Form, Input, Button, Checkbox } from 'antd';
import './ConfirmOTP.css'

const { Countdown } = Statistic;


// const layout = {
//   labelCol: {
//     span: 13,
//   },
//   wrapperCol: {
//     span: 15,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 12,
//     span: 16,
//   },
// };
export default function ConfirmOTP({onFinish,onFinishFailed,resend,Number}){

  const [Show, setShow] = useState(true)
   const [state, setstate] = useState(Date.now() + 180 * 1000);
  


  return (
    
     <div  className="form-data"> 
     <Form
    
    //  {...layout}
     name="basic"
     initialValues={{
       remember: true,
     }}
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
   >
     <Form.Item
       
       name="OTP"
       rules={[
         {
           required: true,
           message: '6 Digits only',
           len:6
         },
       ]}
     >
       <div className='form-input'><Input  /></div>
     </Form.Item>
     <Form.Item >
       <div className="form-button"><Button  type="primary" htmlType="submit">
         Confirm OTP
       </Button></div>
     </Form.Item>
     <div className="form-timer">
       <Countdown title="Send OTP again" value={state} onFinish={()=>setShow(false)} />
     </div>

<div className="form-resend"><Button onClick={()=>{setstate(Date.now() + 180 * 1000); setShow(true); resend(Number)}} disabled={Show}>Resend OTP</Button></div>
   </Form></div>


  );
};
