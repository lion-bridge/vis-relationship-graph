import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import axios from "axios";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { GraphChart, GraphSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GraphSeriesOption
>;
interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}
function EchartsGraph() {
  const init = async () => {
    var ROOT_PATH =
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

    var chartDom = document.getElementById("id_echarts")!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    myChart.showLoading();
    const {data: graph}: any = await axios.get(
      ROOT_PATH + "/data/asset/data/les-miserables.json"
    );
    console.log('graph=', graph)
    myChart.hideLoading();

    graph.nodes.forEach(function (node: GraphNode) {
      node.label = {
        show: node.symbolSize > 30,
      };
    });
    option = {
      title: {
        text: "Les Miserables",
        subtext: "Default layout",
        top: "bottom",
        left: "right",
      },
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          }),
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "Les Miserables",
          type: "graph",
          layout: 'force',
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          // draggable: true,
          label: {
            position: "right",
            formatter: "{b}",
          },
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10,
            },
          },
        },
      ],
    };
    myChart.setOption(option);
    console.log('xxxxxxxx')
    // option && myChart.setOption(option);
    

    
  };

  useEffect(() => {
    init()
  },[])

  return <div id="id_echarts" style={{height: 1000}}></div>;
}

export default EchartsGraph;