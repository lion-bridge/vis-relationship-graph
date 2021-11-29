import d3 from "d3";
import React, { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface Props {}

const dataset =  {
  nodes: [
        {id: 1, name: 'AGGR', label: 'Aggregation', group: 'Team C', runtime: 20},
        {id: 2, name: 'ASMT', label: 'Assessment Repository', group: 'Team A', runtime: 60},
        {id: 3, name: 'CALC', label: 'Final Calc', group: 'Team C', runtime: 30},
        {id: 4, name: 'DEMO', label: 'Demographic', group: 'Team B', runtime: 40},
        {id: 5, name: 'ELIG', label: 'Eligibility', group: 'Team B', runtime: 20},
        {id: 6, name: 'GOAL', label: 'Goal Setting', group: 'Team C', runtime: 60},
        {id: 7, name: 'GROW', label: 'Growth Model', group: 'Team C', runtime: 60},
        {id: 8, name: 'LINK', label: 'Linkage', group: 'Team A', runtime: 100},
        {id: 9, name: 'MOSL', label: 'MOSL', group: 'Team A', runtime: 80},
        {id: 10, name: 'MOTP', label: 'MOTP', group: 'Team A', runtime: 20},
        {id: 11, name: 'REPT', label: 'Reporting', group: 'Team E', runtime: 240},
        {id: 12, name: 'SEDD', label: 'State Data', group: 'Team A', runtime: 30},
        {id: 13, name: 'SNAP', label: 'Snapshot', group: 'Team A', runtime: 40}
	], 
  links: [
    {source: 1, target: 3, type: 'Next -->>'},
    {source: 6, target: 1, type: 'Next -->>'},
    {source: 7, target: 1, type: 'Next -->>'},
    {source: 9, target: 1, type: 'Next -->>'},
    {source: 2, target: 4, type: 'Next -->>'},
    {source: 2, target: 6, type: 'Next -->>'},
    {source: 2, target: 7, type: 'Next -->>'},
    {source: 2, target: 8, type: 'Next -->>'},
    {source: 2, target: 9, type: 'Next -->>'},
    {source: 10, target: 3, type: 'Next -->>'},
    {source: 3, target: 11, type: 'Next -->>'},
    {source: 8, target: 5, type: 'Go to ->>'},
    {source: 8, target: 11, type: 'Go to ->>'},
    {source: 6, target: 9, type: 'Go to ->>'},
    {source: 7, target: 9, type: 'Go to ->>'},
    {source: 8, target: 9, type: 'Go to ->>'},
    {source: 9, target: 11, type: 'Go to ->>'},
    {source: 12, target: 9, type: 'Go to ->>'},
    {source: 13, target: 11, type: 'Go to ->>'},
    {source: 13, target: 2, type: 'Go to ->>'},
    {source: 13, target: 4, type: 'This way>>'},
    {source: 13, target: 5, type: 'This way>>'},
    {source: 13, target: 8, type: 'This way>>'},
    {source: 13, target: 9, type: 'This way>>'},
    {source: 13, target: 10, type: 'This way>>'},
    {source: 4, target: 7, type: 'Next -->>'},
    {source: 4, target: 2, type: 'Next -->>'}
  ]
};


function D3Graph(props: Props) {
  useEffect(() => {

    const svgTag = (
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
        <g transform="translate(30,30)">
          <defs>
            <marker
              id="arrowhead"
              viewBox="-0 -5 10 10"
              refX="23"
              refY="0"
              orient="auto"
              markerWidth="12"
              markerHeight="13"
              overflow="visible"
            >
              <path
                d="M 0,-5 L 10 ,0 L 0,5"
                fill="#999"
                style={{ stroke: "none" }}
              ></path>
            </marker>
          </defs>
        </g>
      </svg>
    );
    const svg = d3.select('#id_d3').append(renderToStaticMarkup(svgTag));
    svg.selectAll('.links').data(dataset.links).enter()



  }, []);

  return <div id="id_d3"></div>;
}

export default D3Graph;
