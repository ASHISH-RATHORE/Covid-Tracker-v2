import React,{useState,useEffect} from 'react';
import axios from 'axios';
import download from 'downloadjs';
import {message,Form, Input,Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import './Download.css';
import {Redirect, useHistory} from 'react-router-dom'
import auth from './../Protected Route/auth'


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 7,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };


export default function Download(props) {

  const history=useHistory();

const [PDF, setPDF] = useState(undefined);
const [isAvailable, setisAvailable] = useState(false);
const [Loading, setLoading] = useState(false);



// useEffect(() => {
  const pdf=async(value)=>{
       

    const Token=localStorage.getItem('token');
    const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${value.number}`, {responseType: 'blob',headers: {
                  'Authorization': `Bearer ${Token}`,'Accept': 'application/pdf'}}).then().then((data)=>{
                    setPDF(data.data)
                    setisAvailable(true)
                    // const blob = new Blob([data], { type: 'application/pdf' });  
                    download(new Blob([data.data],{type:'application/pdf'}), "VaccinationCertificate.pdf");            }).catch((err)=>message.error('no certificate found'))
                    
                 
    }
  //  pdf();
// }, []);


 const onFinish =async(values)=>{
    const Token=localStorage.getItem('token');
         const response= await axios.get(`https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${values.number}`,{responseType: 'blob',headers: { 
                  'Authorization': `Bearer ${Token}`,'content-type':'application/pdf','Access-Control-Allow-Origin':'*'}}).then((data)=>{
                    setLoading(true);  
                    setPDF(data.data);
                    setLoading(false);
                    setisAvailable(true);}).catch((err)=>{
                setLoading(true); 
                console.log(err)
                message.error('Reference_id does not exist or Certificate not issued');
                setLoading(false);        
            })
                    // const blob = new Blob([data], { type: 'application/pdf' });  
                    // download(new Blob([data.data],{type:'application/pdf'}), "dlTextBlob.pdf");
    }
    
  

  const onFinishFailed = (errorInfo) => {
      message.error('Empty Value Field')
    console.log('Failed:', errorInfo);
  };


// const jsPDFGenerator=(PDF)=>{
          
//        try{
//         download(new Blob([PDF],{type:'application/pdf'}), "VaccinationCertificate.pdf");
//        }catch(err){
//         message.error(err)
//         console.log(err)
//        }   
//     }



   
    

        



   
    return(
<div>
  <div className="logout-button">
  <Button onClick={()=>{ auth.logout(() => {
            props.history.push("/indiadetails");
          });
        }}
  size='large'
          type="primary"
          icon={<PoweroffOutlined />}
        />
  </div>
<div className="background">
            
            <Form
            className="form1"
                  {...layout}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={pdf}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Reference ID"
                    name="number"
                    
                    rules={[
                      {
                        required: true,
                        message: 'Enter Reference ID !',
                        
                        
                      },
                    ]}
                  >
                    <Input placeholder="Reference ID" />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button  loading={Loading} type="primary" htmlType="submit">
                      Download Certificate
                    </Button>
                  </Form.Item>
                </Form>    
     </div>
     
</div>
    )}
    