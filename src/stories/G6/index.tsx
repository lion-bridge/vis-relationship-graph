import React, { useEffect, useRef, useMemo } from 'react';
import { EdgeConfig, NodeConfig, Graph, Item as G6Item } from '@antv/g6';
import { createOption } from './GraphOption';
export { createG6IconConfig, createNode } from './NodeConfig'

export interface G6DataType {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
}

export interface G6Props {
  data: G6DataType;
  id?: string;
}

const G6Graph = ({ data }: G6Props) => {
  const ref = useRef<Graph>();
  const containerId = useMemo<string>(() => `${Date.now()}`, []);
  const init = () => {
    return new Graph(createOption({ container: containerId }));
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
      graph.setItemState(node, 'dark', true);
    });
    graph.setItemState(item, 'dark', false);
    graph.setItemState(item, 'highlight', true);
    graph.getEdges().forEach(function (edge) {
      if (edge.getSource() === item) {
        graph.setItemState(edge.getTarget(), 'dark', false);
        graph.setItemState(edge.getTarget(), 'highlight', true);
        graph.setItemState(edge, 'highlight', true);
        edge.toFront();
      } else if (edge.getTarget() === item) {
        graph.setItemState(edge.getSource(), 'dark', false);
        graph.setItemState(edge.getSource(), 'highlight', true);
        graph.setItemState(edge, 'highlight', true);
        edge.toFront();
      } else {
        graph.setItemState(edge, 'highlight', false);
      }
    });
    graph.paint();
    graph.setAutoPaint(true);
  };
  // 初始化高亮设置
  const initHilightSetting = (graph: Graph) => {
    graph.on('node:mouseenter', (e) => highListNodes(graph, e.item!));
    graph.on('node:mouseleave', () => clearAllStats(graph));
    graph.on('canvas:click', () => clearAllStats(graph));

    // setActive(graph);
  };

  const setActive = (graph: Graph) => {
    graph.on('node:mouseenter', (e) => {
      graph.setItemState(e.item!, 'active', true);
    });
    graph.on('node:mouseleave', (e) => {
      graph.setItemState(e.item!, 'active', false);
    });
  };

  useEffect(() => {
    const _graph = init();
    ref.current = _graph;
    initHilightSetting(_graph);
    _graph.data(data);
    _graph.render();

    return () => {
      _graph.clear()
      _graph.destroy()
    }
  }, []);

  return <div key={containerId} id={containerId}></div>;
};

export default G6Graph;
