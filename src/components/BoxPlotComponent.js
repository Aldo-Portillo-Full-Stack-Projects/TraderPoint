import React from 'react'
import * as d3 from 'd3'
import { useD3 } from '../hooks/useD3';

const data = [{"v":1.52045562e+09,"vw":331.6864,"o":360.3833,"c":290.2533,"h":384.29,"l":273.9,"t":1648785600000,"n":16271603},{"v":1.94537874e+09,"vw":252.2519,"o":286.9233,"c":252.7533,"h":318.5,"l":206.8567,"t":1651377600000,"n":19471621},{"v":2.010256812e+09,"vw":234.557,"o":251.72,"c":224.4733,"h":264.21,"l":208.6933,"t":1654056000000,"n":17047578},{"v":1.744949172e+09,"vw":251.1238,"o":227,"c":297.15,"h":298.32,"l":216.1667,"t":1656648000000,"n":14373708},{"v":1.694911809e+09,"vw":296.8066,"o":301.275,"c":275.61,"h":314.6667,"l":271.81,"t":1659326400000,"n":17865216},{"v":1.298828191e+09,"vw":288.9942,"o":272.575,"c":265.25,"h":313.8,"l":262.47,"t":1662004800000,"n":18180830},{"v":1.732993205e+09,"vw":223.4887,"o":254.5,"c":227.54,"h":257.5,"l":198.5863,"t":1664596800000,"n":21808048},{"v":1.884537364e+09,"vw":190.8179,"o":234.05,"c":194.7,"h":237.3951,"l":166.185,"t":1667275200000,"n":21594488},{"v":2.943242097e+09,"vw":146.0149,"o":197.08,"c":123.18,"h":198.92,"l":108.24,"t":1669870800000,"n":29614759},{"v":3.895877357e+09,"vw":135.0728,"o":118.47,"c":173.22,"h":180.68,"l":101.81,"t":1672549200000,"n":32665325},{"v":3.625368736e+09,"vw":199.1807,"o":173.89,"c":205.71,"h":217.65,"l":169.93,"t":1675227600000,"n":32294930},{"v":3.311189475e+09,"vw":188.2745,"o":206.21,"c":207.46,"h":207.79,"l":163.91,"t":1677646800000,"n":30441655},{"v":2.38174453e+09,"vw":177.0209,"o":199.91,"c":160.19,"h":202.6897,"l":152.37,"t":1680321600000,"n":23580247}]

export default function BoxPlotComponent({stockData}) {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.t))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
        
      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.c)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) => g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.t))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.c))
        .attr("height", (d) => y1(0) - y1(d.c));

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
