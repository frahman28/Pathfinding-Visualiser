var START_NODE_ROW = 10;
var START_NODE_COLUMN = 15;
var GOAL_NODE_ROW = 10;
var GOAL_NODE_COLUMN = 35;

const makeNode = function(column, row) {
    return {
      column,
      row,
      isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
      isGoal: row === GOAL_NODE_ROW && column === GOAL_NODE_COLUMN,
      distance: Infinity,
      pathCost: Infinity,
      heuristic: Infinity,
      isVisited: false,
      isWall: false,
      order: null,
      previousNode: null,
    };
};

const reconstructGrid = function() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let column = 0; column < 50; column++) {
        currentRow.push(makeNode(column, row));
      }
      grid.push(currentRow);
    }
    return grid;
};

const reconstructGridWithWalls = function(oldGrid) {
  const grid = [];
  for (let row = 0; row < oldGrid.length; row++) {
    const currentRow = [];
    for (let column = 0; column < oldGrid[row].length; column++) {
      if (oldGrid[row][column].isWall) {
        let node = makeNode(column, row);
        let newNode = {
          ...node,
          isWall: true
        }
        currentRow.push(newNode);
      } else {
        currentRow.push(makeNode(column, row));
      }
    }
    grid.push(currentRow);
  }
  return grid;
};
  
const makeGridWithWalls = function(grid, row, column, running) {
    if (running) return;
    if ((row === START_NODE_ROW && column === START_NODE_COLUMN) || (row === GOAL_NODE_ROW && column === GOAL_NODE_COLUMN)) return;
    const newGrid = grid.slice();
    const node = newGrid[row][column];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][column] = newNode;
    return newGrid;
};

const moveStartNode = function(grid, row, column, running) {
    if (row === GOAL_NODE_ROW && column === GOAL_NODE_COLUMN) return;
    if (running) return;
    const newGrid = grid.slice();
    let node = newGrid[row][column];
    if (node.isWall) return;
    let newNode = {
        ...node,
        isStart: !node.isStart,
    };
    newGrid[row][column] = newNode;
    START_NODE_ROW = row;
    START_NODE_COLUMN = column;
    return newGrid;
}

const moveGoalNode = function(grid, row, column, running) {
  if (row === START_NODE_ROW && column === START_NODE_COLUMN) return;
  if (running) return;
  const newGrid = grid.slice();
  let node = newGrid[row][column];
  if (node.isWall) return;
  let newNode = {
      ...node,
      isGoal: !node.isGoal,
  };
  newGrid[row][column] = newNode;
  GOAL_NODE_ROW = row;
  GOAL_NODE_COLUMN = column;
  return newGrid;
}

const getAllNodes = function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
};

export{START_NODE_COLUMN, START_NODE_ROW, GOAL_NODE_COLUMN, GOAL_NODE_ROW, reconstructGrid, reconstructGridWithWalls, makeNode, makeGridWithWalls, getAllNodes, moveStartNode, moveGoalNode};