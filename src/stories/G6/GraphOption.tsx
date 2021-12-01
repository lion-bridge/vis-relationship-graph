import { GraphOptions } from '@antv/g6';
import { Tooltip } from './ToolTip';



interface G6Optoion {
  container: string;
}
export function createOption({ container }: G6Optoion): GraphOptions {
  return {
    container,
    renderer: 'canvas',// 'canvas',
    width: 1000,
    height: 1000,
    // 将图像居中, support by v3.5.1
    fitCenter: true,
    // 边从中心开始
    // linkCenter: true,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'activate-relations'],
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
    plugins: [Tooltip()],
    defaultNode: {
      // https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode#%E6%A0%B7%E5%BC%8F%E5%B1%9E%E6%80%A7-style
      type: 'circle',
      size: [64, 64],
      labelCfg: {
        position: 'top',
        offset: 10,
        style: {
          fill: '#333',
        },
      },
    },
    // https://g6.antv.vision/zh/docs/manual/middle/elements/edges/defaultEdge
    defaultEdge: {
      type: 'quadratic',
      style: {
        stroke: '#FFB72C',
        endArrow: true,
      },
      labelCfg: {
        refX: 10,
        refY: 10,
        autoRotate: true,
        // 边上的文字
        style: {
          stroke: '#999',
          fontSize: 12,
          fontWeight: 100,
          
        },
        
      },
    },
    // nodeStateStyles: {
    //   highlight: {
    //     opacity: 0.7,
    //   },
    //   dark: {
    //     opacity: 0.2,
    //   },
    // },
    // edgeStateStyles: {
    //   highlight: {
    //     stroke: '#999',
    //   },
    // },
  };
}
