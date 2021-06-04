import React from 'react'
import { Table, } from 'antd';
import {SafetyCertificateTwoTone}  from '@ant-design/icons'
import './StateDetails.css';
import commaNumber from 'comma-number';

function StateDetails({stateStats,vaccine}) {
const count=(vaccine&&Object.values(vaccine.timeline)[0])
    const columns = [
        {
          title: 'State/UT',
          dataIndex: 'state',
          
          
        },
        {
          title: 'Confirmed',
          dataIndex: 'cases',
          
        },
        {
          title: 'Active',
          dataIndex: 'active',
          
        },
        {
          title: 'Recovered',
          dataIndex: 'recovered',
        },
        {
          title: 'Deaths',
          dataIndex: 'deaths',
        },
        {
          title: 'Today Confirmed',
          dataIndex: 'todayCases',
          
        },
        {
          title: ' Today Recovered',
          dataIndex: 'todayRecovered',
        },
        {
          title: 'Today Deaths',
          dataIndex: 'todayDeaths',
        },
      ];


      
      const data = [];
      let key=1
      stateStats&&stateStats.forEach(element=> {
        
        data.push({
          key:key++,
          state:element.state,
          cases: thousands_separators(element.cases),
          active: thousands_separators(element.active),
          recovered:thousands_separators(element.recovered),
          deaths:thousands_separators(element.deaths),
          todayCases:thousands_separators(element.todayCases),
          todayRecovered:thousands_separators(element.todayRecovered),
          todayDeaths:thousands_separators(element.todayDeaths)
        });
      });
      
      function thousands_separators(num)
      {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      }

    return (
        <div className="table-data">
         <div className="vaccine-info">
            <SafetyCertificateTwoTone className="logo"/> 
            <div>{commaNumber(count)} Vaccine doses administered</div>
            </div>
  <div>
      <Table className="table-data" size='medium' pagination={false} columns={columns} dataSource={data} scroll={{ y: 240 }} />           
</div>
        
        
        </div>
  
  
    )
}

export default React.memo(StateDetails)
