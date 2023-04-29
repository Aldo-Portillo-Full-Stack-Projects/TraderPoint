import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import BoxPlotComponent from "./components/BoxPlotComponent";
import CandleStickApex from "./components/CandleStickApex";
import CandleStickPlot from "./components/CandleStickPlot";
import TickerForm from "./components/TickerForm";
import { secretKey } from "./vars";


//const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplyer}/${timeUnit}/${startDate}/${endDate}}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`

const milliseconds = {
  day: 86400000,
  week: 604800000,
  month: 2628000000,
  quarter: 7884000000,
  year: 31536000000,
}


function App() {

  const [searchParams, setSearchParams] = React.useState({
    ticker: "TSLA",
    multiplyer: "1",
    timeUnit: "hour",
    startDate: Date.now()- 31536000000,
    endDate: Date.now(),
    apiKey: secretKey,
  })

  const [stockData, setStockData] = React.useState([])
  
  const formattedData = []
  

  // const renderLineChart = (
  //   <LineChart width={400} height={400} data={stockData}>
  //     <Line type="monotone" dataKey="o" stroke="#8884d8" />
  //     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  //     <XAxis dataKey="t" />
  //     <YAxis domain={[110, 132]}/>
  //     <Tooltip />
  //   </LineChart>
  // );

  React.useEffect(() => {
    stockData.length > 0 && stockData.map(object => {
      const tempArr = []
      tempArr.push(object.t)
      tempArr.push(object.o)
      tempArr.push(object.h)
      tempArr.push(object.l)
      tempArr.push(object.c)
      formattedData.push(tempArr)
      console.log(formattedData);
    })

    
  }, [stockData])


  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trader Point</h1>
      </header>
      
       <TickerForm searchParams={searchParams} setSearchParams={setSearchParams} setStockData={setStockData} />
       <CandleStickApex formattedData={formattedData} stockTicker={searchParams.ticker}/>

      {/*{renderLineChart}
      <BoxPlotComponent stockData={stockData} />
      <CandleStickPlot /> */}
    </div>
  );
}

export default App;
