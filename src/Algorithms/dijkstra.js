import {getAllNodes} from '../Visualiser/GridUtil';
import {makeShortestPath, makeShortestPathBD} from './algoUtil';

function dijkstra(grid, startNode, goalNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
      const nearestNode = unvisitedNodes.shift();
      if (nearestNode.isWall) continue;
      if (nearestNode.distance === Infinity) return visitedNodes;
      nearestNode.isVisited = true;
      visitedNodes.push(nearestNode);
      if (nearestNode === goalNode) return visitedNodes;
      updateUnvisitedNeighbours(nearestNode, grid);
    }
  }

  function updateUnvisitedNeighbours(node, grid) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const {column, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (column > 0) neighbours.push(grid[row][column - 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
  }

export {dijkstra, makeShortestPath, makeShortestPathBD};