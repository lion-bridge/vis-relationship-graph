import React from "react";
import { Story, Meta } from "@storybook/react";
import EchartsGraph from './echarts'

export default {
  title: "EchartsGraph",
  component: EchartsGraph,
} as Meta;

const Template: Story<any> = (args) => {
  return <EchartsGraph {...args} />;
};

export const Simple = Template.bind({})