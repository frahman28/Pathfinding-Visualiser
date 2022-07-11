let count = 1;

export function astar(grid, startNode, goalNode) {
    const visitedNodes = [];
    startNode.distance = heuristic(grid, startNode, goalNode);
    startNode.pathCost = 0;
    startNode.count = count;
    let queue = [startNode];
    while (queue.length !== 0) {
        let nearestNode = queue.shift(); 
        if (nearestNode.isWall) continue;
        if (nearestNode.isVisited) continue;
        let childrenNodes = getNearestNodes(nearestNode, grid, goalNode, startNode, queue);
        queue = childrenNodes.concat(queue);
        nearestNode.isVisited = true;
        visitedNodes.push(nearestNode);
        if (nearestNode === goalNode) return visitedNodes;
        queue.sort((nodeA, nodeB) => nodeA.count - nodeB.count);
        queue.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }
    return visitedNodes;
}

function getNearestNodes(node, grid, goalNode, startNode, queue) {
    let neighbours = []
    const {column, row} = node;
    if (row < grid.length - 1) neighbours.push(grid[row - 1][column]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (column > 0) neighbours.push(grid[row][column - 1]);
    if (row > 0) neighbours.push(grid[row + 1][column]); 
    for (const neighbour of neighbours) {
        if (neighbour.isVisited) continue;
        let pathCost = node.pathCost + 1;
        if (pathCost >= neighbour.pathCost) continue;
        count++;
        neighbour.count = count;
        neighbour.pathCost = pathCost;
        neighbour.distance = pathCost + heuristic(grid, neighbour, goalNode);
        neighbour.heuristic = heuristic(grid, neighbour, goalNode);
        neighbour.previousNode = node;
    }
    return neighbours;
}

function heuristic(grid, node, goalNode) {
    let cost = Math.abs(goalNode.row-node.row) + Math.abs(goalNode.column-node.column);
    return cost;
}
