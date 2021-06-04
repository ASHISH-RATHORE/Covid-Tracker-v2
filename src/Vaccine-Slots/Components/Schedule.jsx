import React from 'react';
import {Tag, Card,Typography,Badge,Tabs} from 'antd';
import './Schedule.css'; 
import { IoIosTime} from 'react-icons/io';
import {GiLoveInjection  } from "react-icons/gi";
const { TabPane } = Tabs;
const {Title,Text}=Typography;


function Schedule({table_data}){

      
return(

    <div className="display-box">

<Title level={3} className="title-center">Available Centers</Title>
     
        <div className="site-card-wrapper">
        
      {
          table_data&&table_data.map((item,key)=>(
           <div key={key}>
        
                  <div >
                    {console.log(item)}
        <Card  title={`${item.block_name}(${item.pincode})`} hoverable={true} style={{borderWidth:1 ,borderRadius:35,borderColor:'black',
        width:410, marginTop: 10 }}

        >
          
    <div>
    <Text strong={true}>{item.name}</Text>
    <Tag color={item.fee_type==='Free'? '#87d068':"#cd201f" }>
    {item.fee_type}
    </Tag>
    
    <div>Available Dates</div>
       
      
       <Tabs  animated={true} type="card" tabBarGutter={-20} style={{color:"black"}} size="small"  >

       {
        item.sessions.map((element,key)=>(
      
        
        
    <TabPane  style={{color:"black"}} tab={<Badge color={element.available_capacity!==0? 'green':'red'}  status="processing" text={element.date}/>} key={key}>
    <div className="tab-data">
    <Badge  size="small"  count={element.available_capacity} showZero>
    <Tag icon={<IoIosTime/>}  color="#3b5999">
    {item.from}-{item.to}
    </Tag>
    </Badge>
    
    <div>
        <Badge  size="small" count={`${element.min_age_limit}+`}>
           <Tag color="#3b5999" ><GiLoveInjection/>{element.vaccine}</Tag>
        </Badge>
      </div>
    </div>
    </TabPane>
    ))
      }
       
  </Tabs>
  </div>
          
        </Card>
        </div>
        
        </div>      
             
          ))
      }
        </div>
    </div>



)
}

export default React.memo(Schedule)
