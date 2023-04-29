import React from "react";
import Chart from "react-apexcharts";

function CandleStickApex ({formattedData}) {
    const options = {
        xaxis:{
            labels: {
                format: 'dd/MM',
              }
        },
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
        },
    }
    const [series, setSeries] = React.useState([{data: formattedData}])

    React.useEffect(() => {
        setSeries([{data: formattedData}])
    }, [formattedData])
    return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type="candlestick"
                width="500"
                xaxis={options.xaxis}
              />
            </div>
          </div>
        </div>
      );
  }



export default CandleStickApex;