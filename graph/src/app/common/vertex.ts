import { Edge } from "./edge";

export class Vertex {
    id!: number
    xRatio!: number
    yRatio!: number 
    color!: string
    connectedVerticesAndCapacity!: Map<number, Edge>; 
    
    constructor(x: number, y: number, screenWidth: number, screenHeight: number, verticesAndCapacity: Map<number, Edge>){
        this.xRatio = x/screenWidth;
        this.yRatio = y/screenHeight;
        this.color = "grey";
        this.connectedVerticesAndCapacity = verticesAndCapacity
    }

    // Display vertex
    displayVertex(){}

    // Display edge
    displayEdges(){}

    // Change vertex color 
    changeVertexColor(color: string){
        this.color = "color"
    }

    // Is vertex connected with a given vertex
    isConnected(id: number){
        return this.connectedVerticesAndCapacity.get(id) == undefined
    }

    deleteEdgeWithThatVertex(id: number){
        if (this.isConnected(id)){
            this.connectedVerticesAndCapacity.delete(id);
            // Delete the edge of the other vertex as well
        }
    }

}
