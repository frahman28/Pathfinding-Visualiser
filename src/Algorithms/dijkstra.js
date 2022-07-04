import {getAllNodes} from '../Visualiser/GridUtil';
import {updateUnvisitedNeighbours, makeShortestPath} from './algoUtil';

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
function dijkstra(grid, startNode, goalNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      console.log(unvisitedNodes.length);
      unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
      const nearestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (nearestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (nearestNode.distance === Infinity) return visitedNodes;
      nearestNode.isVisited = true;
      visitedNodes.push(nearestNode);
      if (nearestNode === goalNode) return visitedNodes;
      updateUnvisitedNeighbours(nearestNode, grid);
    }
  }

export {dijkstra, makeShortestPath};