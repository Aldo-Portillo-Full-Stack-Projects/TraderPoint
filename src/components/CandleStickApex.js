import React from "react";
import Chart from "react-apexcharts";

function CandleStickApex () {
    const options = {
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
    }

    const [series, setSeries] = React.useState([{data: [
        [1538856000000, 6593.34, 6600, 6582.63, 6600], 
        [1538856900000, 6595.16, 6604.76, 6590.73, 6593.86]
      ]}])

    return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type="candlestick"
                width="500"
              />
            </div>
          </div>
        </div>
      );
  }



export default CandleStickApex;