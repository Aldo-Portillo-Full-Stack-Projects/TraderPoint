import React from 'react'
import * as d3 from 'd3'
import { useD3 } from '../hooks/useD3';
import { scaleLinear } from 'd3';

const data = [{"v":1.52045562e+09,"vw":331.6864,"o":360.3833,"c":290.2533,"h":384.29,"l":273.9,"t":1648785600000,"n":16271603},{"v":1.94537874e+09,"vw":252.2519,"o":286.9233,"c":252.7533,"h":318.5,"l":206.8567,"t":1651377600000,"n":19471621},{"v":2.010256812e+09,"vw":234.557,"o":251.72,"c":224.4733,"h":264.21,"l":208.6933,"t":1654056000000,"n":17047578},{"v":1.744949172e+09,"vw":251.1238,"o":227,"c":297.15,"h":298.32,"l":216.1667,"t":1656648000000,"n":14373708},{"v":1.694911809e+09,"vw":296.8066,"o":301.275,"c":275.61,"h":314.6667,"l":271.81,"t":1659326400000,"n":17865216},{"v":1.298828191e+09,"vw":288.9942,"o":272.575,"c":265.25,"h":313.8,"l":262.47,"t":1662004800000,"n":18180830},{"v":1.732993205e+09,"vw":223.4887,"o":254.5,"c":227.54,"h":257.5,"l":198.5863,"t":1664596800000,"n":21808048},{"v":1.884537364e+09,"vw":190.8179,"o":234.05,"c":194.7,"h":237.3951,"l":166.185,"t":1667275200000,"n":21594488},{"v":2.943242097e+09,"vw":146.0149,"o":197.08,"c":123.18,"h":198.92,"l":108.24,"t":1669870800000,"n":29614759},{"v":3.895877357e+09,"vw":135.0728,"o":118.47,"c":173.22,"h":180.68,"l":101.81,"t":1672549200000,"n":32665325},{"v":3.625368736e+09,"vw":199.1807,"o":173.89,"c":205.71,"h":217.65,"l":169.93,"t":1675227600000,"n":32294930},{"v":3.311189475e+09,"vw":188.2745,"o":206.21,"c":207.46,"h":207.79,"l":163.91,"t":1677646800000,"n":30441655},{"v":2.38174453e+09,"vw":177.0209,"o":199.91,"c":160.19,"h":202.6897,"l":152.37,"t":1680321600000,"n":23580247}]

export default function BoxPlotComponent({stockData}) {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      //{ top: 20, right: 30, bottom: 30, left: 40 };
      const marginTop = 20 
      const marginRight = 30
      const marginBottom = 30
      const marginLeft = 20
      const xPadding = 0.2

      const xRange = [marginLeft, width - marginRight]
      const yRange = [height - marginBottom, marginTop]

      const xFormat = "%b %-d"
      const yType = scaleLinear()
      
      //Compute Variables
      /** 
      const X = d3
        .scaleBand()
        .domain(data.map((d) => d.t))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
        
      const Yo = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.o)])
        .rangeRound([height - margin.bottom, margin.top]);
      */

        const X = d3.map(data, d => d.t)
        const Yo = d3.map(data, d => d.o)
        const Yc = d3.map(data, d => d.c)
        const Yh = d3.map(data, d => d.h)
        const Yl = d3.map(data, d => d.l)
        const L = d3.range(X.length)

        const weeks = (start, stop, stride) => d3.utcMonday.every(stride).range(start, +stop + 1);
        const weekdays = (start, stop) => d3.utcDays(start, +stop + 1).filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6);
        
        /*Default Domain and Ticks*/
        const xDomain = weekdays(d3.min(X), d3.max(X))
        const yDomain = [d3.min(Yl), d3.max(Yh)]
        const xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2)


        /*Write scales and axis*/
        const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding)
        const yScale = yType(yDomain, yRange)
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.utcFormat(xFormat)).tickValues(xTicks)
      

        //Write title
        const formatDate = d3.utcFormat("%B %-d, %Y")
        const formatValue = d3.format(".2f")
        const formatChange = (f => (y0, y1) => f((y1-y0) / y0))(d3.format("+.2%"))
        const title = i => `${formatDate(X[i])} 
                            Open: ${formatValue(Yo)[i]}
                            Close: ${formatValue(Yc)[i]}
                            Low: ${formatValue(Yl)[i]}
                            High: ${formatValue(Yh)[i]}` // Might need to only do this if default doesnt exist during rerender
      // const xAxis = (g) => g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      //     d3
      //       .axisBottom(X)
      //       .tickValues(
      //         d3
      //           .ticks(...d3.extent(X.domain()), width / 40)
      //           .filter((v) => X(v) !== undefined)
      //       )
      //       .tickSizeOuter(0)
      //   );
      // const YoAxis = (g) =>
      //   g
      //     .attr("transform", `translate(${margin.left},0)`)
      //     .style("color", "steelblue")
      //     .call(d3.axisLeft(Yo).ticks(null, "s"))
      //     .call((g) => g.select(".domain").remove())
      //     .call((g) =>
      //       g
      //         .append("text")
      //         .attr("x", -margin.left)
      //         .attr("y", 10)
      //         .attr("fill", "currentColor")
      //         .attr("text-anchor", "start")
      //         .text(data.Yo)
      //     );


      // svg.select(".x-axis").call(xAxis);
      // svg.select(".y-axis").call(YoAxis);

      // svg
      //   .select(".plot-area")
      //   .attr("fill", "steelblue")
      //   .selectAll(".bar")
      //   .data(data)
      //   .join("rect")
      //   .attr("class", "bar")
      //   .attr("x", (d) => X(d.t))
      //   .attr("width", X.bandwidth())
      //   .attr("y", (d) => Yo(d.c))
      //   .attr("height", (d) => Yo(0) - Yo(d.c));

    },
    [data.length]
  );

  return (
    <>
      <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
    </svg>
    </>
  );
}
