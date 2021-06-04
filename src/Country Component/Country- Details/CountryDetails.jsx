import React from 'react';
import './CountryDetails.css'
import {Spin,Typography, Card} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const {Text}=Typography;
const { Meta } = Card;
function CountryDetails({data,VaccineData,isLoading}) {
{/* <Spin size="small" /> */}
  const antIcon = <LoadingOutlined style={{ marginTop:150, fontSize: 24 }} spin />;

    function test (labelValue) {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"
    
        : Math.abs(Number(labelValue));
    
    }
    
    return (
        <div id="details">
           {isLoading ?<Spin indicator={antIcon} />:<Card
        className='country-card'
        hoverable={true}
        cover={
         <img
            alt="example"
            src={data&&data?.countryInfo?.flag}
          className="image"
          />
        }
      >
        <Meta
         
        />

        <div className="card-info">
       
       <div><Text strong>Population :{test(data?.population)??'null'}</Text></div>
       <div><Text strong>Active Cases :{test(data?.active)}</Text></div>
      <div> <Text strong>Vaccination :{`${test(VaccineData)}(${(VaccineData/data?.population*100).toFixed(1)}%)`}</Text></div>
       <div><Text strong>Tests :{test(data?.tests)}</Text></div> 
        </div>
      
      
      
      </Card>
}
        </div>
        
    )
}

export default React.memo(CountryDetails)


