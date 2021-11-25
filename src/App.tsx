import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import G6 from '@antv/g6';


const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};
function App() {

  useEffect(() => {
    const graph = new G6.Graph({
      container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
    });
    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.on('node:click', (evt) => {
      const item = evt.item; // 被操作的节点 item
      const target = evt.target; // 被操作的具体图形
      // ...
      console.log(item)
    });
    graph.render(); // 渲染图
  }, [])

  return (
    <div id="mountNode"></div>
  );
}

export default App;
