import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";

function CandleStickPlot() {
  const containerRef = useRef();
  const [data, setData] = useState();
  const color = { domain: [-1, 0, 1], range: ["#e41a1c", "#000000", "#4daf4a"] }

  useEffect(() => {
    setData( [{"v":1.52045562e+09,"vw":331.6864,"Open":360.3833,"Close":290.2533,"High":384.29,"Low":273.9,"Date":1648785600000,"n":16271603},{"v":1.94537874e+09,"vw":252.2519,"Open":286.9233,"Close":252.7533,"High":318.5,"Low":206.8567,"Date":1651377600000,"n":19471621},{"v":2.010256812e+09,"vw":234.557,"Open":251.72,"Close":224.4733,"High":264.21,"Low":208.6933,"Date":1654056000000,"n":17047578},{"v":1.744949172e+09,"vw":251.1238,"Open":227,"Close":297.15,"High":298.32,"Low":216.1667,"Date":1656648000000,"n":14373708},{"v":1.694911809e+09,"vw":296.8066,"Open":301.275,"Close":275.61,"High":314.6667,"Low":271.81,"Date":1659326400000,"n":17865216},{"v":1.298828191e+09,"vw":288.9942,"Open":272.575,"Close":265.25,"High":313.8,"Low":262.47,"Date":1662004800000,"n":18180830},{"v":1.732993205e+09,"vw":223.4887,"Open":254.5,"Close":227.54,"High":257.5,"Low":198.5863,"Date":1664596800000,"n":21808048},{"v":1.884537364e+09,"vw":190.8179,"Open":234.05,"Close":194.7,"High":237.3951,"Low":166.185,"Date":1667275200000,"n":21594488},{"v":2.943242097e+09,"vw":146.0149,"Open":197.08,"Close":123.18,"High":198.92,"Low":108.24,"Date":1669870800000,"n":29614759},{"v":3.895877357e+09,"vw":135.0728,"Open":118.47,"Close":173.22,"High":180.68,"Low":101.81,"Date":1672549200000,"n":32665325},{"v":3.625368736e+09,"vw":199.1807,"Open":173.89,"Close":205.71,"High":217.65,"Low":169.93,"Date":1675227600000,"n":32294930},{"v":3.311189475e+09,"vw":188.2745,"Open":206.21,"Close":207.46,"High":207.79,"Low":163.91,"Date":1677646800000,"n":30441655},{"v":2.382152114e+09,"vw":177.0178,"Open":199.91,"Close":160.19,"High":202.6897,"Low":152.37,"Date":1680321600000,"n":23586320}])
  }, []);

  useEffect(() => {
    if (data === undefined) return;
    const plot = Plot.plot({
        inset: 6,
        width: 960,
        grid: true,
        y: {
          label: "Stocks"
        },
        color,
        marks: [
          Plot.ruleY(data, Plot.selectFirst({
            y: d => d.Open,
            stroke: 'grey',
            strokeDasharray: "3,2",
          })),
          Plot.ruleX(data, {
            x: "Date",
            y1: "Low",
            y2: "High"
          }),
          Plot.ruleX(data, {
            x: "Date",
            y1: "Open",
            y2: "Close",
            stroke: (d) => Math.sign(d.Close - d.Open),
            strokeWidth: 4,
            strokeLinecap: "round"
          }),
        ]
      });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} />;
}

export default CandleStickPlot;