import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import TickerForm from "./components/TickerForm";
import { secretKey } from "./vars";


//const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplyer}/${timeUnit}/${startDate}/${endDate}}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`

function App() {

  const [searchParams, setSearchParams] = React.useState({
    ticker: "TSLA",
    multiplyer: "1",
    timeUnit: "hour",
    startDate: "2023-01-09",
    endDate: "2023-01-09",
    apiKey: secretKey,
  })

  const [stockData, setStockData] = React.useState([])

  const renderLineChart = (
    <LineChart width={400} height={400} data={stockData}>
      <Line type="monotone" dataKey="o" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="t" />
      <YAxis domain={[110, 132]}/>
      <Tooltip />
    </LineChart>
  );

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trader Point</h1>
      </header>
      <TickerForm searchParams={searchParams} setSearchParams={setSearchParams} setStockData={setStockData} />
      {renderLineChart}
    </div>
  );
}

export default App;
