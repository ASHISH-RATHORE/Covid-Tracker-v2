import React,{useEffect,useState} from 'react';
import { Layout,Typography,message,Modal,Button} from 'antd';
import {FileDoneOutlined,ReconciliationOutlined,GlobalOutlined,CloseOutlined} from '@ant-design/icons'
import IndiaCovidDetails from './Components/IndiaCovidDetails';
import StateDetails from './Components/StateDetails';
import './IndiaDetails.css';
import {Link,Redirect,useHistory} from 'react-router-dom'
import axios from 'axios';
import OTP from '../Vaccine-booking/Component/OTP';
import ConfirmOTP from '../Vaccine-booking/Component/ConfirmOTP';
import sha256 from 'sha256';
import TopTenChart from './../TopTenChart';
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Fragment } from 'react';
import IndiaChart from './Charts/IndiaChart';
import auth from './../Vaccine-booking/Protected Route/auth'



const { Content, Footer } = Layout;
const {Title}= Typography;

function IndiaDetails(props) {

  let history = useHistory();
  const [indiaDetails, setindiaDetails] = useState([]);
  const [indiaStates, setindiaStates] = useState([]);
  const [vaccineCount,setvaccineCount]=useState();
  const [loading, setloading] = useState(true);

  const [visible, setvisible] = useState(false);  //OTP LOGIN states
  const [TXN_ID, setTXN_ID] = useState();
const [universalLoader, setuniversalLoader] = useState(true);
  const [state, setstate] = useState(false);
  const [number, setnumber] = useState();
  const [ChartData, setChartData] = useState([]);
 

   useEffect(() => {
      setuniversalLoader(true);
    const fetchData=async()=>{
      const response= await axios.get('https://disease.sh/v3/covid-19/gov/in');
      const vaccineResponse=await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage/countries/in?lastdays=1&fullData=false');
      setindiaDetails(response?.data?.total);
      setindiaStates(response?.data?.states);
      setvaccineCount(vaccineResponse?.data);
      setChartData(response?.data?.states)
      setloading(false);
      setuniversalLoader(false)
    }
     fetchData();
   }, [])


   const onSubmit=async(number)=>{
     

     
       try{
        if(isNaN(Object.values(number))){
          throw 'Invalid Number';
         }
         setnumber(number);
       const response=await axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',{"mobile": Object.values(number) });
       message.success(`OTP sent to ${Object.values(number)}`);
       setstate(true);
       localStorage.setItem("txnId",response?.data?.txnId)
       }catch(Error){
        message.error((Error.toString())==='Invalid Number'?'Invalid Number':"Try after sometime")
      }
    }

   const onSubmitFailed=(errorInfo)=>{
   };
 

  const  showModal = () => {
    setvisible(true)
  };



  const handleCancel = () => {
    setvisible(false);
    setstate(false)
  };

  

  const  onHandleConfirm=async(value)=>{      //confirming otp

    
     
    try{
      const hashCode=sha256(...Object.values(value));
    const successResponse=await axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
                               {"otp":hashCode,"txnId":`${localStorage?.txnId}` });

                               localStorage.setItem("token",successResponse.data.token);
          message.success("Successfully Verified");
               
          auth.login(() => {
            props.history.push("/download");
          });
        //  props.history.push("/download");

    }catch(err){
      message.error('Wrong OTP')
    }
}
const onHandleError = (errorInfo) => {
   };
  
return (
<Fragment>
  <div>
      
  
  
            <Layout className="layout">
<header className="navbar">
<Link to='/'>
<Title className="header-title"  type="success" level={5}><GlobalOutlined style={{fontSize:25,marginRight:5}}/>Global</Title>
</Link>

<Link to="/slots">
<Title className="header-title" type="success" level={5} ><ReconciliationOutlined style={{fontSize:25,marginRight:5}} />Check your nearest vaccination center and slots availability</Title>
</Link>


<Button   onClick={showModal} className="header-title" type="link" level={5}><FileDoneOutlined style={{fontSize:21,marginRight:5}} />Download Vaccination Certificate</Button>
</header>


   
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
          <div>
            <IndiaCovidDetails stats={indiaDetails} status={loading}/>
            </div>
          
          
          <div>
          <div> <StateDetails stateStats={indiaStates} status={loading} vaccine={vaccineCount} className="state-chart" /></div>
          
          </div>

         
    </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Covid 19 Tracker ©2020-2021 Created by Ashish Rathore</Footer>
  </Layout>
  <Modal
          visible={visible}
          title="Enter Mobile no"
          onCancel={handleCancel}
         footer={false}
         
        >
         
         {state!==true?<OTP className="otp-modal" onFinish={onSubmit} onFinishFailed={onSubmitFailed}/>:<ConfirmOTP onFinish={onHandleConfirm} onFinishFailed={onHandleError} resend={onSubmit} Number={number} />}
        </Modal>
        </div>
      
</Fragment>   
 )
}

export default React.memo(IndiaDetails);


// {universalLoader? <div style={{marginTop:190,marginRight:80,display:'flex',justifyContent:'center'}}><PacmanLoader  size={80} />
  {/* </div>: */}