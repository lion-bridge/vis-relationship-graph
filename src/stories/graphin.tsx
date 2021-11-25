import React from 'react';
import Graphin from '@antv/graphin'


const data = {
  nodes: [
    {
      id: 'node-0',
      x: 100,
      y: 100,
    },
    {
      id: 'node-1',
      x: 200,
      y: 200,
    },
    {
      id: 'node-2',
      x: 100,
      y: 300,
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
  ],
};

const Simple = () => {
  return (
    <Graphin data={data}/>
  )
}
export default Simple