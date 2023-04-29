import React from 'react'

export default function TickerForm({searchParams, setStockData, setSearchParams}) {

    
    async function callAPI () {

      const milliseconds = {
        day: 86400000,
        week: 604800000,
        month: 2628000000,
        quarter: 7884000000,
        year: 31536000000,
      }

        const {ticker, multiplyer, timeUnit, startDate, endDate, apiKey} = searchParams
        try{
          const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplyer}/${timeUnit}/${startDate}/${endDate}?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`)
          const data = await res.json()
          setStockData(data.results)
          console.log(data)
        } catch(err){
          console.log(err);
        }
      }

      const searchStock = (e) => {
        e.preventDefault()

        console.log(searchParams)
        callAPI()
      }

      const modifySearchParams = (e) => {


        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })

        console.log(searchParams)
      }
    

  return (
    <form onSubmit={searchStock}>
        <input type="text" name="ticker" onChange={modifySearchParams}/>
        <label htmlFor="timeUnit">Time Span:</label>
        <select name="timeUnit" onChange={modifySearchParams}>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
        </select>
        <input type="date" name="startDate" onChange={modifySearchParams}></input>
        <input type="date" name="endDate" onChange={modifySearchParams}></input>
        <button type="submit">Search</button>
    </form>
  )
}
