import React from 'react'
import './CountryCovid.css';
import {Card,Space,Typography} from 'antd';
import commaNumber from 'comma-number';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const {Text}=Typography



function CountryCovid({data,isLoading}) {
  

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <article id="box">


   <div className="cases">
   <Card  hoverable={true} className="card confirmed " size="small" bordered={false} title='Confirmed' >
      
    {
    isLoading?<Spin indicator={antIcon} />: <Space size={10}>
     <Text>{commaNumber(data?.cases)}</Text>
     <Text type="danger">+{commaNumber(data?.todayCases)}</Text>
      </Space>
       }
    </Card>
   </div>

   <div className="cases">
   <Card hoverable={true} className="card recovered"  bordered={false} size="small" title='Recovered' >
   {
   isLoading?<Spin indicator={antIcon} />: <Space size={10}>
     <Text>{commaNumber(data?.recovered)}</Text>
     <Text type="success">+{commaNumber(data?.todayRecovered)}</Text>
      </Space> 
      }
    </Card>
   </div>

   
   <div className="cases">
   <Card hoverable={true} className="card fatal" bordered={false} size="small"  title='Fatal' >
      
   {
   isLoading?<Spin indicator={antIcon} />: <Space size={10}>
     <Text >{commaNumber(data?.deaths)}</Text>
     <Text type="secondary">+{commaNumber(data?.todayDeaths)}</Text>
      </Space> 
      }
    </Card>
   </div>

        </article>
    )
}

export default React.memo(CountryCovid)
