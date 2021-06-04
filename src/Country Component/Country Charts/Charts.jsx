import React,{useEffect,useState,useMemo} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import {Spin} from 'antd'


 function Charts({CountryID}){
  
 const [confirmed, setconfirmed] = useState([]);
 const [recovered, setrecovered] = useState([]);
 const [deaths, setdeaths] = useState([]);
 const [date, setdate] = useState([]);
 const [loader, setloader] = useState(true)

 
 

 const antIcon = <LoadingOutlined style={{ fontSize: 44,marginTop:80,marginLeft:400,width:100}} spin />;

 
  useEffect(() => {

    setloader(true)
    const fetchData=async()=>{
       await axios.get(`https://disease.sh/v3/covid-19/historical/${CountryID}?lastdays=32`).then((data)=>{
        console.log(data,"kkk")
          let getDate = Object.keys(data.data.timeline.cases);
          let getCases = Object.values(data.data.timeline.cases);
          let getRecovered = Object.values(data.data.timeline.recovered);
          let getDeaths = Object.values(data.data.timeline.deaths);
          
           
          setconfirmed(getCases)
          setrecovered(getRecovered);
          setdeaths(getDeaths);
          setdate(getDate);
          setloader(false)
           
        })

    }
fetchData();    
  }, [CountryID])
 
  const LastDays=[];
  for(let i=1;i<date.length;i++){
   LastDays.push(date[i])
   }

   
   const options= {
    xaxis: {
      type: 'datetime',
        categories: LastDays,
         labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            
          },
          
          
        },
       
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return Math.abs(Number(value)) >= 1.0e+9

          ? (Math.abs(Number(value)) / 1.0e+9).toFixed(1) + "B"
          // Six Zeroes for Millions 
          : Math.abs(Number(value)) >= 1.0e+6
        
          ? (Math.abs(Number(value)) / 1.0e+6).toFixed(1) + "M"
          // Three Zeroes for Thousands
          : Math.abs(Number(value)) >= 1.0e+3
        
          ? (Math.abs(Number(value)) / 1.0e+3).toFixed(1) + "K"
        
          : Math.abs(Number(value));
        }
      },
    },
    legend: {
      position: 'right',
      
    
    },

        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            }},
        chart: {
          toolbar:{
            show:false
          },
          id: "basic-bar"
        },
       
        
        
        stroke: {
          curve: 'smooth',
        },
      };

      const dailyCases = [];   //confirmed cases
      for(let i=confirmed.length;i>0;i--){
        dailyCases.push(confirmed[i]-confirmed[i-1])
        }

      // const dailyCases = [];   //confirmed cases
      // for(let i=0;i<=confirmed.length;i++){
      //   dailyCases.push(confirmed[i+1]-confirmed[i])
      //   }
        
      const dailyRecover = [];   //confirmed cases
      for(let i=recovered.length;i>0;i--){
        dailyRecover.push(recovered[i]-recovered[i-1])
        }
      //  const dailyRecover=[];
      //  for(let i=0;i<=recovered.length;i++){
      //   dailyRecover.push(recovered[i+1]-recovered[i])
      //   }
        
      const dailyDeath = [];   //confirmed cases
      for(let i=deaths.length;i>0;i--){
        dailyDeath.push(deaths[i]-deaths[i-1])
        }

        // const dailyDeath=[];
        // for(let i=0;i<=deaths.length;i++){
        //  dailyDeath.push(deaths[i+1]-deaths[i])
        //  }


   

      const Series=[
        {
          name: "Confirmed",
          data:dailyCases.reverse(),
        },
        {
          name: "Recovered",
          data: dailyRecover.reverse(),
        },
        {
          name: "Deaths",
          data: dailyDeath.reverse(),
        },
      ]


    
    return(
      
      <div id="app" style={{backgroundColor:'white',height:210,borderRadius:25,marginTop:5,boxShadow:"0px 1px 16px 1px rgba(.5,.5,.5,.1)",width:"100%"}}>
      { loader?<Spin indicator={antIcon} />: <div className="row" >
          <div id="chart" >
           <Chart
            // stacked={true}
            
              options={options}
              series={Series}
              type="area"
              width="950"
              height="200"
              
              className="linechart"
             
            />
          </div>
        </div>}
      </div>
    );
  
}


export default React.memo(Charts)
