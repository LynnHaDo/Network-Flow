import { Edge } from './edge';
import { Vertex } from './vertex';

export class Network {
  adjMatrix: any = [];
  currentPath: any[] = [];
  verticesConsidered: number[] = [];

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
    return this.adjMatrix[source][target] != undefined;
  }

  addEdge(sourceVertex: Vertex, targetVertex: Vertex, capacity: number) {
    let source = sourceVertex.id;
    let target = targetVertex.id;
    if (source == target) return false;

    this.adjMatrix[source][target] = new Edge();
    this.adjMatrix[source][target].setEdge(
      sourceVertex,
      targetVertex,
      capacity
    );

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

  isEdgeInPaths(sourceId: number, sinkId: number, paths: Vertex[][]){
    for (let path of paths){
        if (this.isEdgeOnPath(sourceId, sinkId, path)){
            return true;
        }
    }
    return false;
  }

  isEdgeOnPath(edgeSource: number, edgeTarget: number, path: Vertex[]){
    for (let i = 0; i < path.length - 1; i++){
        if (path[i].id == edgeSource && path[i+1].id == edgeTarget){
            return true;
        }
    }
    return false;
  }

  findPaths(sourceVertex: Vertex, sinkVertex: Vertex) {
    let visited: boolean[] = [];
    let paths: any[] = [];
    for (let i = 0; i <= this.adjMatrix.length; i++) {
      visited[i] = false; // init all as not visited
    }
    if (this.areTwoNodesConnected(sourceVertex.id, sinkVertex.id)) {
      this.currentPath = [];
      this.findPathsRecursively(sourceVertex, sinkVertex, visited, paths);
    }
    return paths;
  }

  findPathsRecursively(
    sourceVertex: Vertex,
    sinkVertex: Vertex,
    visited: boolean[],
    paths: any[]
  ): any {
    if (visited[sourceVertex.id]) {
      return;
    }

    this.currentPath.push(sourceVertex);
    visited[sourceVertex.id] = true; // mark as visited

    if (sourceVertex.id == sinkVertex.id) {
      paths.push([...this.currentPath]);
      visited[sourceVertex.id] = false;
      this.currentPath.pop();
      return;
    }

    let connectedEdges = this.adjMatrix[sourceVertex.id].filter(
      (edge: any) => edge != undefined && edge.capacity
    );

    for (var i = 0; i < connectedEdges.length; i++) {
      var neighbor = connectedEdges[i].target;
      this.findPathsRecursively(neighbor, sinkVertex, visited, paths);
    }

    this.currentPath.pop();
    visited[sourceVertex.id] = false;
  }
}
