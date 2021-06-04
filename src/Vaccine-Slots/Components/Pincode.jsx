import React,{useState} from 'react';
import { Form, Input, Button } from 'antd';
import './Pincode.css'
import Nodata from './Nodata';
import Schedule from './Schedule'
import axios from 'axios';
const layout = {
  labelCol: {
    span:9,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 11,
    
  },
};

 function Pincode(){

  const date=new Date();
  const todayDate= `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
  
  const [Center, setCenter] = useState([]);
  const [visible,setvisible]=useState(false);
  const [isCenterAvailable,setisCenterAvailable]=useState(0);
  
  const onFinish = async(values) =>{
    const pin=Object.values(values)[0]
const response=await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${todayDate}`);
setisCenterAvailable(response.data.centers.length)
console.log(response.data.centers)
setCenter(response.data.centers);
setvisible(true) 

};

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:1', errorInfo);
  };






  return (
    <div id="form-input">
<div>
  <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
      
        label="Pincode"
        name="Pincode"
        rules={[
          {
            required: true,
            message: 'Enter 6 Digit Pincode',
            len:6,
            
          },
        ]}
      >
        <Input />
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

</div>
    <div id="data-table">
  { visible&&isCenterAvailable!==0?<Schedule table_data={Center}/>:<Nodata/>}
</div>
    </div>


  );
};

export default React.memo(Pincode)