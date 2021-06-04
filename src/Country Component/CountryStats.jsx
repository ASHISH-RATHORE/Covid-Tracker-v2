import React from 'react';
import Charts from './Country Charts/Charts';
import CountryDetails from './Country- Details/CountryDetails';
import CountryCovid from './Country-Covid-Details/CountryCovid';
import './CountryStats.css'

function CountryStats({countryInfo,Code,Vaccine,loader}) {
   
    return (
        <div id="Box">
       
           <div id='Country-Details'>
               <CountryDetails isLoading={loader} VaccineData={Vaccine} data={countryInfo} />
           </div>
           <div id="Country-Covid-Details">
               
              <div> <CountryCovid isLoading={loader}  data={countryInfo} /></div>
               
               <div><Charts CountryID={Code} isLoading={loader} data={countryInfo} /></div>
           </div>
           

        </div>
    )
}

export default React.memo(CountryStats)
