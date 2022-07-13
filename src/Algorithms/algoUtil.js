
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