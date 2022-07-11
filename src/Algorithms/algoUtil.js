  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  function makeShortestPath(goalNode) {
    console.log(goalNode);
    const shortestPath = [];
    let currentNode = goalNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
      console.log(currentNode);
    }
    console.log(shortestPath);
    return shortestPath;
  }

  function makeShortestPathBD(goalNode, startNode) {
    console.log(goalNode);
    const shortestPath = [];
    let currentNode = goalNode;
    let previous = startNode;
    while (currentNode !== startNode) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
      previous = currentNode;
      console.log(currentNode);
    }
    console.log(shortestPath);
    return shortestPath;
  }

  export {makeShortestPath, makeShortestPathBD};