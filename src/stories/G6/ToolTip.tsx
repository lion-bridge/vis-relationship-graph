import G6 from "@antv/g6";
import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";


export const Tooltip = function() {
  return new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    fixToNode: [1, 0.5],
    trigger: 'click',
    // 允许出现 tooltip 的 item 类型
    itemTypes: ["node", "edge"],
    // 自定义 tooltip 内容
    getContent: (e) => {
      const model = e?.item?.getModel();
      console.log('model=',model)
      const type = e?.item?.getType();
      const html = (
        <div key="sss">
          {type === "node" ? `节点id:${model?.id}` : `边id：${model?.source}`}
        </div>
      );
      return renderToStaticMarkup(html);
    },
  })
};