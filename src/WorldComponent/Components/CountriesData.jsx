import React from 'react';
import {Table } from 'antd'; 

function CountriesData({countriesStats}) {


    const columns = [
        {
          title: 'Country Name',
          dataIndex: 'country',
          
          
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
      countriesStats&&countriesStats.forEach(element=> {
        
        data.push({
          key:key++,
          country:element.country,
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
        <div>
            <div>
      <Table className="table-data" size='medium' pagination={false} columns={columns} dataSource={data} scroll={{ y: 240 }} />           
</div>
        </div>
    )
}

export default React.memo(CountriesData)
