import React from "react";
import { Story, Meta } from "@storybook/react";
import Drag, { DataType, Props as DragProps } from "./g6Drag";
import person from '../assets/images/phone.png'
const Image = {
    phone: 'http://localhost:8080/images/phone.png',
    person: 'http://localhost:8080/images/person.png',

}

export default {
  title: "g6-drag",
  component: Drag,
} as Meta;

const Template: Story<DragProps> = (args) => {
  return <Drag {...args} />;
};

export const Simple = Template.bind({});

// 裁剪图片：https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/built-in/image#%E5%89%AA%E8%A3%81
const data = {
    nodes: [
      {
        id: "1",
        label: "电话",
        icon: {
          width:40,
          height: 40,
          img: require('../assets/images/phone.png')?.default,
          show: true,
        },
        img: require('../assets/images/phone.png')?.default,
      },
      {
        id: "2",
        label: '姓名',

        img: require('../assets/images/person.png')?.default,
      },
      {
        id: "3",

        type: 'circle',
        label: '住址'
      },
      {
        id: "4",
        type: 'circle',
        label: '门牌号：502'
      },
      {
        id: "5",
        type: 'circle',
        label: '门牌号：502'
      },
      {
        id: "6",
        type: 'circle',
        label: '门牌号：502'
      },
      {
        id: "7",
        type: 'circle',
        label: '门牌号：502'
      },
      {
        id: "8",
        type: 'circle',
        label: '门牌号：502'
      },
    ],
    edges: [
      {
        source: "1",
        target: "2",
        label: '电话'
      },
      {
        source: "1",
        target: "3",
        label: '住址',
      },
      {
        source: "3",
        target: "4",
        label: '详细地址'
      },
      {
        source: "3",
        target: "5",
      },
      {
        source: "3",
        target: "6",
      },
      {
        source: "4",
        target: "8",
      },
    ],
  } as DataType;

  Simple.args = {
      data
  }