export function expandBoth(grid, startNode, goalNode) {
    let visitedNodesStart = [startNode];
    let visitedNodesGoal = [goalNode];
    const visitedNodes = [[], []];
    let queueStart = [startNode];
    let queueGoal = [goalNode];
    while (queueStart.length !== 0 && queueGoal.length !== 0) {
        let nearestNodeStart = queueStart.shift();
        let nearestNodeGoal = queueGoal.shift();
        //console.log(nearestNodeGoal);
        if (nearestNodeStart.isWall) continue;
        if (nearestNodeGoal.isWall) continue;
        nearestNodeStart.isVisited = true;
        nearestNodeGoal.isVisited = true;
        let childrenNodesStart = getNearestNodes(nearestNodeStart, grid, queueStart);
        let childrenNodesGoal = getNearestNodes(nearestNodeGoal, grid, queueGoal);
        queueStart = queueStart.concat(childrenNodesStart);
        visitedNodesStart = visitedNodesStart.concat(childrenNodesStart);
        queueGoal = queueGoal.concat(childrenNodesGoal);
        visitedNodesGoal = visitedNodesGoal.concat(childrenNodesGoal);
        visitedNodes[0].push(nearestNodeStart);
        visitedNodes[1].push(nearestNodeGoal);
        let overlap = checkOverlap(visitedNodes[0], visitedNodes[1]);
        console.log(overlap);
        if (checkOverlap(visitedNodes[0], visitedNodes[1])) return visitedNodes;
        if (nearestNodeStart === goalNode) return visitedNodes;
        if (nearestNodeGoal === startNode) return visitedNodes;
        queueStart = new Set(queueStart);
        queueGoal = new Set(queueGoal);
        queueStart = Array.from(queueStart);
        queueGoal = Array.from(queueGoal);
    }
    return visitedNodes;
}

export function expandStart(grid, startNode, goalNode) {
    const visitedNodes = [];
    let allVisited = [startNode];
    let queue = [startNode];
    while (queue.length !== 0) {
        let nearestNode = queue.shift();
        if (nearestNode.isWall) continue;
        nearestNode.isVisited = true;
        let childrenNodes = getNearestNodes(nearestNode, grid, allVisited);
        allVisited = allVisited.concat(childrenNodes);
        queue = queue.concat(childrenNodes);
        visitedNodes.push(nearestNode);
        if (nearestNode === goalNode) return visitedNodes;
        queue = new Set(queue);
        queue = Array.from(queue);
    }
    return visitedNodes;
}

export function expandGoal(grid, startNode, goalNode) {
    const visitedNodes = [];
    let allVisited = [goalNode];
    let queue = [goalNode];
    while (queue.length !== 0) {
        let nearestNode = queue.shift();
        if (nearestNode.isWall) continue;
        nearestNode.isVisited = true;
        let childrenNodes = getNearestNodes(nearestNode, grid, allVisited);
        allVisited = allVisited.concat(childrenNodes);
        queue = queue.concat(childrenNodes);
        visitedNodes.push(nearestNode);
        if (nearestNode === startNode) return visitedNodes;
        queue = new Set(queue);
        queue = Array.from(queue);
    }
    return visitedNodes;
}

function getNearestNodes(node, grid, allVisited) {
    let neighbours = []
    const {column, row} = node;
    if (column > 0) neighbours.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbours.push(grid[row][column + 1]);
    if (row > 0) neighbours.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][column]);
    //neighbours = neighbours.filter(neighbour => !neighbour.isVisited);
    let visited = new Set(allVisited);
    for (const neighbour of neighbours) {
        if (visited.has(neighbour)) {
            console.log(neighbour);
            continue;
        }
        neighbour.previousNode = node;
    }
    return neighbours;
}

function constructShortestPath(grid, startNode, goalNode, nodesStart, nodesGoal) {
    let shortestStart = [];
    let shortestGoal = [];
    let i = 0;
    let j = 0;

    while (nodesStart[i] !== nodesGoal[j]) {

        i++;
        j++;
    }
}

function checkOverlap(nodesStart, nodesGoal) {
    //let goalNodes = new Set(nodesGoal);

    for (let i = 0; i < nodesStart; i++) {
        for (let j = 0; j < nodesGoal; j++) {
            if (nodesStart[i].row === nodesGoal[j].row && nodesStart[i].column === (nodesGoal[j].column - 1)) {
                console.log(nodesStart[i]);
                return true;
            }
        }
        /*
        if (goalNodes.has(nodesStart[i])) {
            console.log(nodesStart[i]);
            return true;
        } 
        */
    }
    return false;
}