  
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

  export {makeShortestPath};