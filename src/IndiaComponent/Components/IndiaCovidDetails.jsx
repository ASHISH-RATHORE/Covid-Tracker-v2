import React from 'react';
import './IndiaCovidDetails.css';
import { Divider,Spin,Typography,Badge } from 'antd';
import commaNumber from 'comma-number';
import { LoadingOutlined } from '@ant-design/icons';

const {Text}=Typography;
function IndiaCovidDetails({stats,status}) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
 
    return (
        <div className="covid-details">

    <div>    
    <Divider style={{marginRight:130}} dashed={true}><Badge color="red" size={20} status="processing" text="Active" />
</Divider>
    <Text  strong={true} type="danger" className="cases-value" >{commaNumber(stats&&stats?.active)}</Text>
    </div>

    <div>    
    <Divider style={{color:'red'}} dashed={true}><Badge color="red" size={20} status="processing" text="Confirmed" /></Divider>
    <Text className="cases-value" >{commaNumber(stats&&stats?.cases)}</Text>
    <Text strong={true} type="danger" className="cases-value-today">+{commaNumber(stats&&stats?.todayCases)}</Text>
    </div>
            <div> 
            
    <Divider style={{color:'green'}} dashed={true} ><Badge color="green" size={20} status="processing" text="Recovered" /></Divider>
    <Text className="cases-value">{commaNumber(stats&&stats?.recovered)}</Text>
    <Text strong={true} type="success" className="cases-value-today">+{commaNumber(stats&&stats?.todayRecovered)}</Text>
    </div>


    <div>
    <Divider style={{color:'grey'}} dashed={true}><Badge color="grey" size={20} status="processing" text="Fatal" /></Divider>
    <Text className="cases-value">{commaNumber(stats&&stats?.deaths)}</Text>
    <Text strong={true} type="secondary" className="cases-value-today">+{commaNumber(stats&&stats?.todayDeaths)}</Text> 
    </div>
    
        </div>
    )
}

export default React.memo(IndiaCovidDetails)
