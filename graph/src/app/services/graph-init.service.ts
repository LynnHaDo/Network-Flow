import { Injectable } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { Network } from '../common/network';
import { Vertex } from '../common/vertex';
import { Edge } from '../common/edge';

const nodes = [
  { id: 1, name: 1, x: 150, y: 240 },
  { id: 2, name: 2, x: 250, y: 100 },
  { id: 3, name: 3, x: 250, y: 200 },
  { id: 4, name: 4, x: 250, y: 300 },
  { id: 5, name: 5, x: 250, y: 400 },
  { id: 6, name: 6, x: 400, y: 100 },
  { id: 7, name: 7, x: 400, y: 200 },
  { id: 8, name: 8, x: 400, y: 300 },
  { id: 9, name: 9, x: 400, y: 400 },
  { id: 10, name: 10, x: 500, y: 240 },
  { id: 11, name: 11, x: 580, y: 100 },
  { id: 12, name: 12, x: 580, y: 400 },
  { id: 13, name: 13, x: 660, y: 240 },
];

const edges = [
  { id: '1-2', label: 8, source: 1, target: 2 },
  { id: '1-3', label: 8, source: 1, target: 3 },
  { id: '1-4', label: 8, source: 1, target: 4 },
  { id: '1-5', label: 8, source: 1, target: 5 },

  { id: '2-6', label: 3, source: 2, target: 6 },

  { id: '3-6', label: 4, source: 3, target: 6 },
  { id: '3-7', label: 6, source: 3, target: 7 },

  { id: '4-8', label: 11, source: 4, target: 8 },

  { id: '5-8', label: 2, source: 5, target: 8 },
  { id: '5-9', label: 3, source: 5, target: 9 },

  { id: '6-11', label: 9, source: 6, target: 11 },
  { id: '6-10', label: 5, source: 6, target: 10 },

  { id: '7-10', label: 6, source: 7, target: 10 },
  { id: '8-10', label: 2, source: 8, target: 10 },
  { id: '8-12', label: 1, source: 8, target: 12 },

  { id: '9-12', label: 4, source: 9, target: 12 },

  { id: '10-11', label: 11, source: 10, target: 11 },
  { id: '10-12', label: 2, source: 10, target: 12 },

  { id: '11-13', label: 8, source: 11, target: 13 },
  { id: '12-13', label: 8, source: 12, target: 13 },
];

@Injectable({
  providedIn: 'root',
})
export class GraphInitService {
  cy!: cytoscape.Core;
  network = new Network();
  vertices: Vertex[] = [];
  sourceNode!: Vertex;
  sinkNode!: Vertex;

  constructor() {}

  makeGraph() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      layout: { name: 'grid', rows: 2 },
      style: [
        {
          selector: 'node',
          css: {
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
        {
          selector: 'edge',
          css: {
            'text-margin-y': 15,
            'text-rotation': 'autorotate',
            'target-arrow-color': '#ccc',
            'line-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
        {
            selector: '.selected',
            css: {
              'line-color': '#F6B8C8',
              'target-arrow-color': '#F6B8C8'
            }, 
        },
        {
          selector: '.highlighted',
          css: {
            'background-color': '#03A688',
            'line-color': '#F2668B',
            'target-arrow-color': '#F2668B',
            'transition-duration': 0.5,
            'transition-property':
              'background-color, line-color, target-arrow-color',
          },
        },
      ],
      userPanningEnabled: false,
      zoomingEnabled: false,
      userZoomingEnabled: false,
      selectionType: 'single',
    });

    nodes.forEach((node) => {
      this.addNode(this.cy, node.id, node.name, node.x, node.y);
      this.vertices.push(new Vertex(node.id, node.x, node.y, node.name))
    });

    this.network.initMatrix(this.vertices.length)

    edges.forEach((edge) => {
      this.addEdge(this.cy, edge.id, edge.label, edge.source, edge.target);
      let source = this.vertices.filter((ver) => ver.id == edge.source)[0];
      let target = this.vertices.filter((ver) => ver.id == edge.target)[0];
      target.parent = source;
      this.network.addEdge(source, target, edge.label);
    });
  }

  getGraph(){
    return this.cy
  }

  // Add a node to the graph
  addNode(
    cy: cytoscape.Core,
    id: number,
    name: number,
    posX: number,
    posY: number
  ) {
    cy.add({
      group: 'nodes',
      data: {
        id: id.toString(),
        name: name,
      },
      position: {
        x: posX,
        y: posY,
      },
      selectable: true,
    });
  }

  addEdge(
    cy: cytoscape.Core,
    id: string,
    label: number,
    source: any,
    target: any
  ) {
    cy.add({
      group: 'edges',
      data: {
        id: id,
        source: source,
        target: target,
      },
      css: {
        label: "0/" + label.toString(),
      },
      selectable: true,
    });
  }

  setSource(sourceId: number){
    this.sourceNode = this.vertices.filter(el => el.id == sourceId)[0];
  }

  setSink(sinkId: number){
    this.sinkNode = this.vertices.filter(el => el.id == sinkId)[0];
  }

  resetNodes() {
    this.cy.nodes().removeClass("highlighted");
  }

  removeHighlightedEdges() {
    this.cy.edges().removeClass("highlighted");
  }

  resetEdges() {
    this.cy.edges().removeClass("selected");
    this.cy.edges().removeClass("highlighted");
  }

  highlightNode(name: number) {
    let nodes = this.cy.nodes('[name=' + name + ']');
    if (nodes && nodes.length > 0) {
      nodes[0].addClass('highlighted');
    }
  }

  // Find paths
  findPathsBetweenSourceAndSink(){
    console.log(this.network.findPaths(this.sourceNode, this.sinkNode))
  }

  isFlowValid(){
    return true;
  }

  checkFlowAmount(){
    const edgesConnectedToSource = this.network.adjMatrix[this.sourceNode.id].filter((el: any) => el != undefined && el.capacity);
    let edgesConnectedToSink: Edge[] = []
    this.network.adjMatrix[this.sinkNode.id].filter((el: any) => el != undefined && el.capacity == 0).forEach(
        (edge: Edge) => {
            edgesConnectedToSink.push(this.network.adjMatrix[edge.target.id][edge.source.id]);
        }
    )

    let flowOutOfSource = 0;
    let flowIntoSink = 0;

    for (let edge of edgesConnectedToSource){
        flowOutOfSource += edge.flow;
    }

    for (let edge of edgesConnectedToSink){
        flowIntoSink += edge.flow
    }

    return flowOutOfSource == flowIntoSink;
  }

}
