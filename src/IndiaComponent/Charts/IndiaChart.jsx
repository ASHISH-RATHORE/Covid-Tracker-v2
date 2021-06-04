import React, { Component } from "react";
import Chart from "react-apexcharts";

class IndiaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {

         options:{
            series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
            chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
              'United States', 'China', 'Germany'
            ],
          }
          }
  }
}

  render() {

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.options.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IndiaChart;