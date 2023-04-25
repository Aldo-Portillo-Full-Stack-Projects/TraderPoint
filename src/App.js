import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { secretKey } from "./vars";
const data = [
  {
      "v": 577135,
      "vw": 115.2326,
      "o": 114.03,
      "c": 115.35,
      "h": 115.98,
      "l": 113.75,
      "t": 1673254800000,
      "n": 12587
  },
  {
      "v": 216840,
      "vw": 115.0353,
      "o": 115.35,
      "c": 114.86,
      "h": 115.35,
      "l": 114.63,
      "t": 1673258400000,
      "n": 5713
  },
  {
      "v": 151694,
      "vw": 115.0332,
      "o": 114.89,
      "c": 115.01,
      "h": 115.38,
      "l": 114.63,
      "t": 1673262000000,
      "n": 4306
  },
  {
      "v": 1341266,
      "vw": 116.7115,
      "o": 115.11,
      "c": 117.14,
      "h": 118.14,
      "l": 114.98,
      "t": 1673265600000,
      "n": 24579
  },
  {
      "v": 1810956,
      "vw": 116.7226,
      "o": 115.1001,
      "c": 116.8489,
      "h": 118.15,
      "l": 114.48,
      "t": 1673269200000,
      "n": 30101
  },
  {
      "v": 38851920,
      "vw": 119.655,
      "o": 116.8,
      "c": 122.4335,
      "h": 122.5,
      "l": 116.77,
      "t": 1673272800000,
      "n": 420369
  },
  {
      "v": 41922277,
      "vw": 121.9748,
      "o": 122.45,
      "c": 121.5,
      "h": 123.33,
      "l": 120.33,
      "t": 1673276400000,
      "n": 399538
  },
  {
      "v": 21331759,
      "vw": 121.7979,
      "o": 121.5,
      "c": 121.8478,
      "h": 122.51,
      "l": 120.875,
      "t": 1673280000000,
      "n": 189278
  },
  {
      "v": 15544924,
      "vw": 121.8809,
      "o": 121.84,
      "c": 122.1523,
      "h": 122.6,
      "l": 121.01,
      "t": 1673283600000,
      "n": 129963
  },
  {
      "v": 21904399,
      "vw": 122.1294,
      "o": 122.15,
      "c": 121.24,
      "h": 123.52,
      "l": 120.72,
      "t": 1673287200000,
      "n": 171941
  },
  {
      "v": 18347571,
      "vw": 121.3986,
      "o": 121.25,
      "c": 120.6001,
      "h": 122.01,
      "l": 120.48,
      "t": 1673290800000,
      "n": 139093
  },
  {
      "v": 22332884,
      "vw": 120.1796,
      "o": 120.6019,
      "c": 119.7999,
      "h": 121.01,
      "l": 117.67,
      "t": 1673294400000,
      "n": 192135
  },
  {
      "v": 2431740,
      "vw": 119.8091,
      "o": 119.77,
      "c": 119.8721,
      "h": 121.1868,
      "l": 119.43,
      "t": 1673298000000,
      "n": 7261
  },
  {
      "v": 183221,
      "vw": 119.9562,
      "o": 119.9,
      "c": 119.91,
      "h": 120.0895,
      "l": 119.77,
      "t": 1673301600000,
      "n": 2971
  },
  {
      "v": 239156,
      "vw": 120.1894,
      "o": 119.9281,
      "c": 120.3,
      "h": 120.68,
      "l": 119.92,
      "t": 1673305200000,
      "n": 5611
  },
  {
      "v": 367341,
      "vw": 119.8027,
      "o": 120.3,
      "c": 119.55,
      "h": 120.33,
      "l": 119.45,
      "t": 1673308800000,
      "n": 4461
  }
]


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
      <YAxis domain={[128, 132]}/>
      <Tooltip />
    </LineChart>
  );

  async function callAPI () {
    const {ticker, multiplyer, timeUnit, startDate, endDate, apiKey} = searchParams
    try{
      const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplyer}/hour/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`)
      const data = await res.json()
      setStockData(data.results)
      console.log(data)
    } catch(err){
      console.log(err);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trader Point</h1>
      </header>
      {renderLineChart}
      <button onClick={callAPI}>:)</button>
    </div>
  );
}

export default App;
