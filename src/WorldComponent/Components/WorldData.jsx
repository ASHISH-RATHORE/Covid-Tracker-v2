import React from 'react';
import { Divider,Typography,Badge } from 'antd';
import commaNumber from 'comma-number';
import './WorldData.css'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const {Text}=Typography;
function WorldData({apiData,isLoading}) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    return (
        <div id="covid-details">
             
             
             <div id="active-cases">    
    <div>
    <Divider dashed={true}>
    <Badge color="red"  status="processing" text="Active" />
    </Divider>
    </div>
    
   {isLoading?<Spin indicator={antIcon} />:<div className="data-values">
    <div>
    <Text  strong type="danger" >{commaNumber(apiData?.active)}</Text>
    </div>
    </div>}

        
        
        </div>



    <div id="confirm-cases"> 
        
    <div  >
        <Divider style={{color:'red'}} dashed={true}>
            <Badge color="red" size={20} status="processing" text="Confirmed" />
        </Divider>
    </div>

{isLoading?<Spin indicator={antIcon} />:<div className="data-values" >
    
<div>
    <Text  >{commaNumber(apiData?.cases)}</Text>
</div>
    <div>
        <Text type="danger" strong >+{commaNumber(apiData?.todayCases)}</Text>
        
    </div>

</div>}
    </div>



            <div id="recover-cases"> 
            
    <div >
    <Divider style={{color:'green'}} dashed={true} >
           <Badge color="green" size={20} status="processing" text="Recovered" />
    </Divider>
    </div>
    
   {isLoading?<Spin indicator={antIcon} />:<div className="data-values">

   <div>
       <Text >{commaNumber(apiData?.recovered)}</Text>
       </div>
  
  <div> 
       <Text type="success"  strong >+{commaNumber(apiData?.todayRecovered)}</Text>
       </div>
   
   </div>}

    </div>



    <div id="death-cases">

        <div >
    <Divider style={{color:'grey'}} dashed={true}>
        <Badge color="grey" size={20} status="processing" text="Fatal" />
    </Divider>
    </div>

   {isLoading?<Spin indicator={antIcon} />:<div className="data-values"> 
       
       <div>
           <Text >{commaNumber(apiData?.deaths)}</Text>
    </div>
<div>
    <Text strong type="secondary">+{commaNumber(apiData?.todayDeaths)}</Text></div>
 </div>}

</div>
   
        </div>
    )
}

export default React.memo(WorldData)
