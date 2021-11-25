import React from 'react'
import {Story, Meta} from '@storybook/react';
import GraphInCase from './graphin'

export default {
    title: 'graphin',
    component: GraphInCase
} as Meta;

const Template: Story = (args: any) => {
    return <GraphInCase {...args} />
}

export const Simple = Template.bind({})
Simple.args = {}