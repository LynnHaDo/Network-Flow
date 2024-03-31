export class Edge {
    flow!: number;
    capacity!: number;

    constructor(flow: number, capacity: number){
        this.flow = flow;
        this.capacity = capacity
    }

    // Add flow by a specified number
    addFlowByNum(bottleNeck: number){
        this.flow += bottleNeck
    }
}
