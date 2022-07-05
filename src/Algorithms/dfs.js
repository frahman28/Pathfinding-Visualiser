export function dfs(grid, startNode, goalNode) {
    const visitedNodes = [];
    let stack = [startNode];
    while (stack.length !== 0) {
        let nearestNode = stack.shift();
        if (nearestNode.isWall) continue;
        nearestNode.isVisited = true;
        let childrenNodes = getNearestNodes(nearestNode, grid);
        stack = childrenNodes.concat(stack);
        visitedNodes.push(nearestNode);
        if (nearestNode === goalNode) return visitedNodes;
        stack = new Set(stack);
        stack = Array.from(stack);
    }
    return visitedNodes;
}

function getNearestNodes(node, grid) {
    let neighbours = []
    const {column, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    if (column > 0) neighbours.push(grid[row][column - 1]);
    neighbours = neighbours.filter(neighbour => !neighbour.isVisited);
    for (const neighbour of neighbours) {
        neighbour.previousNode = node;
    }
    return neighbours;
}