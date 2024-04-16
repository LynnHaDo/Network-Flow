import { Vertex } from "./vertex";

export class Edge {
    capacity!: number;
    flow!: number;
    source!: Vertex; // source id
    target!: Vertex; // target id

    constructor(){}

    setEdge(source: Vertex, target: Vertex, capacity: number){
        this.source = source;
        this.target = target;
        this.capacity = capacity;
        this.flow = 0;
    }

    // Add flow by a specified number
    addFlowByNum(bottleNeck: number){
        this.flow += bottleNeck
    }

    setEdgeValue(flow: number, capacity: number){
        this.flow = flow;
        this.capacity = capacity;
    }
}
