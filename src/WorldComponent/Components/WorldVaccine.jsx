import React,{useEffect,useState} from 'react';
import {SafetyCertificateTwoTone} from '@ant-design/icons'
import millify from "millify";
import axios from 'axios';
import './VaccineWorld.css'




function WorldVaccine() {
const [vaccineWorld, setvaccineWorld] = useState();

const totalVaccine=vaccineWorld&&millify(Object.values(vaccineWorld),{precision: 2,decimalSeparator: "." });
useEffect(() => {

    const fetchData=async()=>{
    await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false').then((data)=>setvaccineWorld((data.data)))
    
}
fetchData();
            
}, [])

return (
         <div>


<div className="main" >
        <div className="vaccine-info">
            <SafetyCertificateTwoTone className="logo"/> 
            <div className="text" >
           <span> {totalVaccine} </span>
                  Vaccine doses administered Worldwide</div>
            </div>
        
        </div>

        </div>
    )
}

export default React.memo(WorldVaccine)
