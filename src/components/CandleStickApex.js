import dayjs from "dayjs";
import React from "react";
import Chart from "react-apexcharts";

function CandleStickApex ({formattedData}) {
    const options = {
        chart: {
          height: 350,
          type: 'candlestick',
        },
        title: {
          text: 'CandleStick Chart - Category X-axis',
          align: 'left'
        },
        annotations: {
          xaxis: [
            {
              x: 'Oct 06 14:00',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test'
              }
            }
          ]
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function(val) {
              return dayjs(val).format('MMM DD HH:mm')
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    const [series, setSeries] = React.useState([{name: 'candle', data: formattedData}])

    React.useEffect(() => {
        setSeries([{name: 'candle', data: formattedData}])
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
              />
            </div>
          </div>
        </div>
      );
  }



export default CandleStickApex;