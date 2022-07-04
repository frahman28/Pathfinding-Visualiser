
export function bfs(grid, startNode, goalNode) {
    const visitedNodes = [];
    let queue = [startNode];
    while (queue.length !== 0) {
        let nearestNode = queue.shift();
        if (nearestNode.isWall) continue;
        nearestNode.isVisited = true;
        let childrenNodes = getNearestNodes(nearestNode, grid);
        queue = queue.concat(childrenNodes);
        visitedNodes.push(nearestNode);
        if (nearestNode === goalNode) return visitedNodes;
        queue = new Set(queue);
        queue = Array.from(queue);
    }
    return visitedNodes;
}

function getNearestNodes(node, grid) {
    let neighbours = []
    const {column, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    if (column > 0) neighbours.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    neighbours = neighbours.filter(neighbour => !neighbour.isVisited);
    for (const neighbour of neighbours) {
        neighbour.previousNode = node;
    }
    return neighbours;
}
