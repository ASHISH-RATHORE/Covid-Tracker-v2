import React,{useEffect,useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './TopTenChart.css'
import axios from 'axios';


function TopTenChart({DataInfo}) {
  

  
    const TopTenSorted=[];
    const sortedData=DataInfo.sort((a,b) => (a.confirmed < b.confirmed ? 1 : -1));
    for (let index = 0; index <10; index++) {
         TopTenSorted.push(
            {
             "network": sortedData[index]?.name,
           "MAU": sortedData[index]?.confirmed
           },
      )
    }



    am4core.useTheme(am4themes_animated);
    // Themes end

    
    let chart = am4core.create("top-ten-chart", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    
    let title = chart.titles.create();
    title.text = "Top 10 Countries";
    title.fontSize = 25;
    title.marginBottom = 30;
    title.fontWeight=1000

    let label = chart.chartContainer.createChild(am4core.Label);
    label.text = "on the basis of Confirmed Cases";
    label.align = "center";
    label.fontSize=10;
    label.marginTop = 10;
    label.fontWeight=800;




    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    
    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;
    
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });
    
    categoryAxis.sortBySeries = series;
    chart.data =TopTenSorted; 
    
    
    
    return (
      <div id="top-ten-chart">
          
         
        </div>
    )
}

export default React.memo(TopTenChart); 
