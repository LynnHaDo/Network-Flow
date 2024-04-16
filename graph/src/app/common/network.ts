import { Edge } from './edge';
import { Vertex } from './vertex';

export class Network {
  adjMatrix: any = [];
  paths: any[] = [];
  pathCounter: number = 0;

  constructor() {}

  initMatrix(numVertices: number) {
    for (var i: number = 0; i <= numVertices; i++) {
      this.adjMatrix[i] = [];
      for (var j: number = 0; j <= numVertices; j++) {
        this.adjMatrix[i][j] = undefined;
      }
    }
  }

  isEdgeExist(source: number, target: number) {
    return this.adjMatrix[source][target] != undefined
  }

  addEdge(sourceVertex: Vertex, targetVertex: Vertex, capacity: number) {
    let source = sourceVertex.id;
    let target = targetVertex.id;
    if (source == target) return false;

    this.adjMatrix[source][target] = new Edge();
    this.adjMatrix[source][target].setEdge(sourceVertex, targetVertex, capacity);

    // Set initial backward edge of 0
    if (!this.isEdgeExist(target, source)) {
      this.adjMatrix[target][source] = new Edge();
      this.adjMatrix[target][source].setEdge(targetVertex, sourceVertex, 0);
    }

    return true;
  }

  // Implement BFS to see if 2 nodes are connected via a path
  areTwoNodesConnected(source: number, sink: number) {
    if (source == sink) {
      return false;
    }
    var queue = [source]; // start the queue with the start node
    var visited = [source]; // visit the source node
    while (queue.length) {
      let current: number = queue.shift()!;
      let connectedEdges = this.adjMatrix[current].filter(
        (edge: any) => edge != undefined && edge.capacity
      );
      for (let edge of connectedEdges) {
        if (edge.capacity > 0 && visited.indexOf(edge.target.id) == -1) {
          queue.push(edge.target.id);
          visited.push(edge.target.id);
        }
      }
    }
    return visited.indexOf(sink) > -1;
  }

  findPaths(sourceVertex: Vertex, sinkVertex: Vertex) {
    let visited: boolean[] = [];
    for (let i = 0; i <= sinkVertex.id; i++){
        visited[i] = false; // init all as not visited
    }
    if (this.areTwoNodesConnected(sourceVertex.id, sinkVertex.id)) {
      this.findPathsRecursively(sourceVertex, sinkVertex, visited, [sourceVertex]);
    }
    return this.paths;
  }

  findPathsRecursively(
    sourceVertex: Vertex,
    sinkVertex: Vertex,
    visited: boolean[],
    path: any[]
  ): any {
    
    if (sourceVertex.id == sinkVertex.id){
        return;
    } 

    let current = sourceVertex;
    visited[current.id] = true; // mark as visited

    let connectedEdges = this.adjMatrix[current.id].filter(
        (edge: any) => edge != undefined && edge.capacity
    );

    let flow = Number.MAX_VALUE;

    for (var i = 0; i < connectedEdges.length; i++){
        var neighbor = connectedEdges[i].target;
        if (!visited[neighbor.id]){
            path.push(neighbor);
            this.findPathsRecursively(neighbor, sinkVertex, visited, path);
            path.pop();
        }
    }

    visited[current.id] = false;
  }
}
