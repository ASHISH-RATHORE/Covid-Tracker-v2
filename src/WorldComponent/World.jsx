import React,{useEffect,useState}from 'react';
import { Layout, Typography,Select} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import axios from 'axios';
import './WorldComponent.css'
import WorldData from '../WorldComponent/Components/WorldData';
import WorldVaccine from './Components/WorldVaccine';
import CountryStats from '../Country Component/CountryStats';
import Map from '../Map';
import TopTenChart from '../TopTenChart';
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";

const {Option}=Select;
const { Content, Footer } = Layout;
const {Title}= Typography;




 function  World() {


  const [world_Vaccine_Data, setworld_Vaccine_Data] = useState([])
  const [CountryInfo, setCountryInfo] = useState([]);
  const [countries, setcountries] = useState([]);
  const [Global, setGlobal]=useState([]);
  const [countryCode, setcountryCode] = useState('IND');
  const [Vaccination, setVaccination] = useState()
  const [TopTen, setTopTen] = useState([]);
  const [status, setstatus] = useState(true);  //loader for country data component
  const [List_of_Countries, setList_of_Countries] = useState([]); //dropdown list
  const [global_Loader, setglobal_Loader] = useState(true); // loader for Global data component
  


  
  useEffect(()=>{            //covid status of the world
     setglobal_Loader(true)
    const fetchData=async()=>{
    const response=await axios.get('https://disease.sh/v3/covid-19/all');
    setGlobal(response?.data);
    setglobal_Loader(false)
  
    await axios.get("https://disease.sh/v3/covid-19/countries").then((data)=>{
      
    
    const list=data.data.map((country)=>({
        
      name:country.country,
      value:country.countryInfo.iso3,
    }));

    setList_of_Countries(list)
    
    const countries=data?.data?.map((country)=>({
        
        name:country?.country,
        value:country?.countryInfo.iso3,
        mapValue:country?.countryInfo.iso2,
        active:country?.active,
        confirmed:country?.cases,
        recovered:country?.recovered,
        death:country?.deaths

      }));
      setcountries(countries); 

      const topTen=data.data.map((country)=>({
        
        name:country.country,
        confirmed:country.cases,
        
            
      }))
      
      setTopTen(topTen)
    } ) ;
   
  }
     fetchData();

     
  },[]);


  



  const onCountryChange= async (e)=>{             //onCountry Change this method will invoked
    const countryCode= e;
    setcountryCode(e);
    setstatus(true);
    const url=`https://disease.sh/v3/covid-19/countries/${countryCode}`
  
     await fetch(url).then((response)=>response.json())
     .then((data)=>{
       
       setCountryInfo(data);
       setstatus(false)
     });

     const response=await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=1&fullData=false`);
     setVaccination(Object.values(response?.data?.timeline));
   };

  
   useEffect(() => {            // chart data api

  const fetchData=async()=>{
  
      const responseVaccine=await axios.get('https://api.caw.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=false');
      setworld_Vaccine_Data(responseVaccine.data);

    }
    fetchData();
  }, [])



  useEffect(() => {
   const fetchData=async()=>{
      await axios.get(`https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`).then((data)=>{setstatus(true);
       setCountryInfo(data.data)
       setstatus(false)
      });

      const response=await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=1&fullData=false`)
      setstatus(true);
      setVaccination(Object.values(response?.data?.timeline));
      setstatus(false);
    }
   fetchData();
  }, []);


  return (
    <div>
      
        <Layout className="layout">
      <header className="navbar">
        <div>
      <Title className="header-title" type="success" level={4}>Covid 19 Tracker</Title>
      </div>
      <Link to="/indiadetails">
      <div>
        <Title className="header-title" type="success" level={5}>Indian Region</Title>
      </div>
      </Link>
      <Select
      
      showSearch
          onChange={onCountryChange}
          style={{ width: 200 }}
          placeholder='India'>
            <Option value="India">India</Option>
            {
            
            List_of_Countries&&List_of_Countries.map((val,key)=>(
                <Option key={key} value={val.value}>{val.name}</Option>
              ))
              
              }
         </Select>
      </header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <div><WorldData apiData={Global} isLoading={global_Loader} /></div> 
            <div>  <WorldVaccine vaccine={world_Vaccine_Data}/> </div>        
               {/* <CountriesData countriesStats={countriesData} /> */}
              <div> <CountryStats Vaccine={Vaccination} Code={countryCode} loader={status} countryInfo={CountryInfo}/></div>
              
              <div><TopTenChart DataInfo={TopTen} /></div>
              <div><Map CountriesInfo={countries} /></div>
              
          </div>
      
          </Content>
          <Footer style={{ textAlign: 'center' }}>Covid 19 Tracker ©2020-2021 Created by Ashish Rathore</Footer>
        </Layout>
      
              
              </div>
    )
}

export default React.memo(World);


// {universalLoader? <div style={{marginTop:190,marginRight:80,display:'flex',justifyContent:'center'}}><PacmanLoader  size={80} />
{/* </div>:  */}