import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './Map.css'
function Map({CountriesInfo}) {

  
    
   
    am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
let chart = am4core.create("map", am4maps.MapChart);

let title = chart.titles.create();
title.text = "[bold font-size: 20]Covid-19 affected countries around the world";
title.textAlign = "middle";




function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let mapData = [];
 


  CountriesInfo.map((item,key)=>{
    
    mapData.push({ "id":item.mapValue,
                        "name4":"Country","value4":item.name,                
                    "name":"Active Cases","value":item.active,
                    "name1":"Confirmed Cases", "value1":item.confirmed,
                    "name2":"Recovered Cases", "value2":item.recovered,
                    "name3":"Deaths Cases", "value3":item.death,
                     "color": chart.colors.getIndex(getRandomInt(3)) })
  })

  

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.nonScalingStroke = true;
polygonSeries.strokeWidth = 0.5;
polygonSeries.calculateVisualCenter = true;

let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.data = mapData;
imageSeries.dataFields.value = "value";

let imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true

let circle = imageTemplate.createChild(am4core.Circle);
circle.fillOpacity = 0.7;
circle.propertyFields.fill = "color";
circle.tooltipText = " [bold]  {name4}:{value4} \n{name}:{value} \n {name1}:{value1} \n {name2}:{value2} \n {name3}:{value3}";


imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
})

imageTemplate.adapter.add("latitude", function(latitude, target) {
  let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})

imageTemplate.adapter.add("longitude", function(longitude, target) {
  let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})



    return (
        <div id="map" >
          

        </div>
    )
}

export default React.memo(Map)
