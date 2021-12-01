import React, { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import G6, { EdgeConfig, NodeConfig, Graph, Item as G6Item } from "@antv/g6";

export interface DataType {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
}

export interface Props {
  data: DataType;
}

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  trigger: 'click',
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ["node", "edge"],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const model = e?.item?.getModel();
    const type = e?.item?.getType();
    const html = (
      <div key="sss">
        {type === "node" ? `节点id:${model?.id}` : `边id：${model?.source}`}
      </div>
    );
    return renderToStaticMarkup(html);
  },
});
const Drag = ({ data }: Props) => {
  const ref = useRef<Graph>();

  const init = () => {
    return new Graph({
      container: "id_g6",
      width: 1000,
      height: 1500,
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          "drag-node",
          "activate-relations",
        ],
      },
      layout: {
        type: 'force',
        linkDistance: 50,         // 可选，边长
        nodeStrength: 30,         // 可选
        edgeStrength: 0.1,        // 可选
        collideStrength: 0.8,     // 可选
        nodeSize: 30,             // 可选
        alpha: 0.3,               // 可选
        alphaDecay: 0.028,        // 可选
        alphaMin: 0.01,           // 可选
        forceSimulation: null,    // 可选
      },
      plugins: [tooltip],
      defaultNode: {
        // 节点
        // type: "image",
        size: [60, 60],
      },
      defaultEdge: {
        type: "line", // 弧线
        style: {
          stroke: "#F6BD16",
          endArrow: true,
        },
        labelCfg: {
          // 边上的文字
          style: {
            stroke: "red",
          },
        },
      },
      nodeStateStyles: {
        highlight: {
          opacity: 1,
        },
        dark: {
          opacity: 0.2,
        },
      },
      edgeStateStyles: {
        highlight: {
          stroke: "#999",
        },
      },
    });
  };
  // 清除所有高亮
  function clearAllStats(graph: Graph) {
    graph.setAutoPaint(false);
    graph.getNodes().forEach(function (node) {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach(function (edge) {
      graph.clearItemStates(edge);
    });
    graph.paint();
    graph.setAutoPaint(true);
  }
  // 高亮周围一度节点
  const highListNodes = (graph: Graph, item: G6Item) => {
    graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
        graph.setItemState(node, "dark", true);
      });
      graph.setItemState(item, "dark", false);
      graph.setItemState(item, "highlight", true);
      graph.getEdges().forEach(function (edge) {
        if (edge.getSource() === item) {
          graph.setItemState(edge.getTarget(), "dark", false);
          graph.setItemState(edge.getTarget(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else if (edge.getTarget() === item) {
          graph.setItemState(edge.getSource(), "dark", false);
          graph.setItemState(edge.getSource(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else {
          graph.setItemState(edge, "highlight", false);
        }
      });
      graph.paint();
      graph.setAutoPaint(true);
  }
  // 初始化高亮设置
  const initHilightSetting = (graph: Graph) => {
    graph.on("node:mouseenter", (e) => highListNodes(graph, e.item!));
    graph.on("node:mouseleave", () => clearAllStats(graph));
    graph.on("canvas:click", () => clearAllStats(graph));

    setActive(graph)

  };

  const setActive = (graph: Graph) => {
    graph.on('node:mouseenter', (e) => {
      graph.setItemState(e.item!, 'active', true);
    });
    graph.on('node:mouseleave', (e) => {
      graph.setItemState(e.item!, 'active', false);
    });
    graph.on('edge:mouseenter', (e) => {
      graph.setItemState(e.item!, 'active', true);
    });
    graph.on('edge:mouseleave', (e) => {
      graph.setItemState(e.item!, 'active', false);
    });
  }

  useEffect(() => {
    const _graph = init();
    ref.current = _graph;
    initHilightSetting(_graph);
    _graph.data(data);
    _graph.render();
  }, []);

  const onSearch = () => {
    const nodes = ref.current?.getNeighbors("3");
    console.log("所有兄弟节点=", nodes);
  };
  return (
    <div>
      <button onClick={onSearch}>搜索</button>
      <div id="id_g6"></div>
    </div>
  );
};

export default Drag;
