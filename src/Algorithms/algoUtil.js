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
    if (column > 0) neighbours.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  function makeShortestPath(goalNode) {
    const shortestPath = [];
    let currentNode = goalNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPath;
  }

  export {updateUnvisitedNeighbours, getUnvisitedNeighbours, makeShortestPath};