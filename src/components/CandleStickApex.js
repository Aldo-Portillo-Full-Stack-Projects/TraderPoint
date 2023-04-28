import React, { Component } from "react";
import Chart from "react-apexcharts";
import CandleStickPlot from "./CandleStickPlot";

class CandleStickApex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "candlestick"
        },
        candlestick: {
            colors: {
              upward: '#3C90EB',
              downward: '#DF7D46'
            },
            wick: {
                useFillColor: true,
              }
          }
      },
      series: [{
        data: [{
            x: 1538856000000,
            y: [51.98, 56.29, 51.59, 53.85]
          },
          {
            x: 1538856900000,
            y: [53.66, 54.99, 51.35, 52.95]
          },
          {
            x: 1538857200000,
            y: [52.76, 57.35, 52.15, 57.03]
          }]
    }]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CandleStickApex;