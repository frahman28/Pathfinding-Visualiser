export function greedy(grid, startNode, goalNode) {
    const visitedNodes = [];
    startNode.distance = heuristic(grid, startNode, goalNode);
    let queue = [startNode];
    while (queue.length !== 0) {
        let nearestNode = queue.shift();
        if (nearestNode.isWall) continue;
        if (nearestNode.isVisited) continue;
        let childrenNodes = getNearestNodes(nearestNode, grid, goalNode, queue);
        queue = childrenNodes.concat(queue);
        nearestNode.isVisited = true;
        visitedNodes.push(nearestNode);
        if (nearestNode === goalNode) return visitedNodes;
        queue.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }
    return visitedNodes;
}

function getNearestNodes(node, grid, goalNode, queue) {
    let neighbours = []
    const {column, row} = node;
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (row < grid.length - 1) neighbours.push(grid[row - 1][column]);
    if (row > 0) neighbours.push(grid[row + 1][column]);
    if (column > 0) neighbours.push(grid[row][column - 1]);
    const q = new Set(queue);
    for (const neighbour of neighbours) {
        if (q.has(neighbour)) continue;
        neighbour.distance = heuristic(grid, neighbour, goalNode);
        if (neighbour.isVisited) continue;
        neighbour.previousNode = node;
    }
    return neighbours;
}

function heuristic(grid, node, goalNode) {
    let cost = Math.abs(goalNode.row-node.row) + Math.abs(goalNode.column-node.column);
    return cost;
}