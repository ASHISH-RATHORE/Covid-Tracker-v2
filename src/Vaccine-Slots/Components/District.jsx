import React,{useState,useEffect} from 'react';
import { Select,Button,Form} from 'antd';
import './District.css'
import axios from 'axios';
import Schedule from './Schedule';
import Nodata from './Nodata';
const { Option } = Select;


function District() {



const date=new Date();
const todayDate= `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
const [indianStates, setindianStates] = useState([]);
const [district, setdistrict] = useState([]);
const [ID, setID] = useState();
const [district_ID, setdistrict_ID] = useState();
const [Center, setCenter] = useState([]);
const [visible,setvisible]=useState(false);
const [isCenterAvailable,setisCenterAvailable]=useState(0);


useEffect(() => {
    const fetchData=async()=>{
        const response=await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        setindianStates(response.data.states);     
    }
    fetchData();
}, []);


useEffect(() => {
    const fetchData= async()=>{
        const response=await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${ID}`);
        setdistrict(response.data.districts);
        
    }
    fetchData();
  
}, [ID]);

const onStateChange=(e)=>{
    setID(e);

}

const onDistrictChange=(e)=>{
    setdistrict_ID(e);

}

const onSubmitHandler=async(e)=>{
e.preventDefault();
const response=await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_ID}&date=${todayDate}`)
setCenter(response.data.centers);
setvisible(true);
setisCenterAvailable(response.data.centers.length)
}

    return (
        <div id="center-list" >
       
       <div className="select">
       <Form layout="inline" >
        <Select onChange={onStateChange} defaultValue="Select State" style={{ width: 120 }} >
        {
            indianStates&&indianStates.map((item,key)=>(
                 <Option key={key} value={item.state_id}>{item.state_name}</Option>
            ))
            }
      </Select>
    
    <div>

    <Select onChange={onDistrictChange} defaultValue="Select District" style={{ width: 120 }} >
    {

    district&&district.map((item,key)=>(
       
    <Option key={key} value={item.district_id}>{item.district_name}</Option>
    ))
    }
      </Select>
    
    </div>
    <div>
        <Button type="primary" htmlType="submit" onClick={onSubmitHandler} >
          Submit
        </Button>

        </div>
</Form>
       </div>
<div className="table">
  { visible&&isCenterAvailable!==0?<Schedule table_data={Center}/>:<Nodata/>}
</div>

        </div>
    )
}

export default React.memo(District)
