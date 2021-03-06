import React, {Component} from 'react';
import Node from './Node/Node';
import {START_NODE_COLUMN, START_NODE_ROW, GOAL_NODE_COLUMN, GOAL_NODE_ROW, reconstructGrid, reconstructGridWithWalls, makeGridWithWalls, getAllNodes, moveStartNode, moveGoalNode} from './GridUtil';
import {dijkstra, makeShortestPath} from '../Algorithms/dijkstra';
import {bfs} from '../Algorithms/bfs';
import {dfs} from '../Algorithms/dfs';
import {greedy} from '../Algorithms/greedy';
import {astar} from '../Algorithms/astar';
import './Visualiser.css';

let currentAlgo = null;

export default class Visualiser extends Component {
  constructor() {
    super();
    this.state = {
      fullGrid: [],
      running: false,
      completed: false,
      mapped: false,
      movingStart: false,
      movingGoal: false,
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    let fullGrid = reconstructGrid();
    this.setState({fullGrid});
  }

  handleMouseDown(row, column) {
    if (this.state.running || this.state.completed) return;
    let newGrid = this.state.fullGrid;
    if ((row === START_NODE_ROW && column === START_NODE_COLUMN)) {
        newGrid = moveStartNode(this.state.fullGrid, row, column);
        this.setState({movingStart: true});
    } else if ((row === GOAL_NODE_ROW && column === GOAL_NODE_COLUMN)) {
        newGrid = moveGoalNode(this.state.fullGrid, row, column);
        this.setState({movingGoal: true});
    } else {
        newGrid = makeGridWithWalls(this.state.fullGrid, row, column);
    }
    this.setState({fullGrid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, column) {
    if (!this.state.mouseIsPressed) return;
    if (this.state.running || this.state.completed) return;
    let newGrid = this.state.fullGrid;
    if (this.state.movingStart) {
        newGrid = moveStartNode(this.state.fullGrid, row, column);
    } else if (this.state.movingGoal) {
        newGrid = moveGoalNode(this.state.fullGrid, row, column);
    } else {
        newGrid = makeGridWithWalls(this.state.fullGrid, row, column);
        this.setState({mapped: true})
    }
    this.setState({fullGrid: newGrid});
    this.redraw();
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false, movingStart: false, movingGoal: false});
    this.redraw();
  }

  animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        document.getElementById(`node-${shortestPath[i].row}-${shortestPath[i].column}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
    const lastAnim = document.getElementById(`node-${shortestPath[shortestPath.length-1].row}-${shortestPath[shortestPath.length-1].column}`);
    lastAnim.addEventListener('animationend', () => {this.setState({running: false, completed: true, mapped: true})});
  }

  visualiseDijkstra() {
    if (this.state.completed) return;
    if (this.state.running) return;
    const fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisited = dijkstra(fullGrid, startNode, goalNode);
    const shortestPath = makeShortestPath(goalNode);
    for (let i = 0; i <= nodesVisited.length; i++) {
        if (i === nodesVisited.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisited[i].row}-${nodesVisited[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualiseBfs() {
    if (this.state.completed) return;
    if (this.state.running) return;
    const fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisited = bfs(fullGrid, startNode, goalNode);
    const shortestPath = makeShortestPath(goalNode);
    for (let i = 0; i <= nodesVisited.length; i++) {
        if (i === nodesVisited.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisited[i].row}-${nodesVisited[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualiseDfs() {
    if (this.state.completed) return;
    if (this.state.running) return;
    const fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisited = dfs(fullGrid, startNode, goalNode);
    const shortestPath = makeShortestPath(goalNode);
    for (let i = 0; i <= nodesVisited.length; i++) {
        if (i === nodesVisited.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisited[i].row}-${nodesVisited[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualiseGreedy() {
    if (this.state.completed) return;
    if (this.state.running) return;
    let fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisited = greedy(fullGrid, startNode, goalNode);
    const shortestPath = makeShortestPath(goalNode);
    for (let i = 0; i <= nodesVisited.length; i++) {
        if (i === nodesVisited.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisited[i].row}-${nodesVisited[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualiseAstar() {
    if (this.state.completed) return;
    if (this.state.running) return;
    let fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisited = astar(fullGrid, startNode, goalNode);
    const shortestPath = makeShortestPath(goalNode);
    for (let i = 0; i <= nodesVisited.length; i++) {
        if (i === nodesVisited.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisited[i].row}-${nodesVisited[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualise() {
    //if (this.state.completed) return;
    if (this.state.running) return;

    
    if (document.getElementById("bfs").checked === true) {
      currentAlgo = "bfs";
      this.visualiseBfs();
    } else if (document.getElementById("dfs").checked === true) {
      currentAlgo = "dfs";
      this.visualiseDfs();
    } else if (document.getElementById("greedy").checked === true) {
      currentAlgo = "greedy";
      this.visualiseGreedy();
    } else if (document.getElementById("dijkstra").checked === true) {
      currentAlgo = "dijkstra";
      this.visualiseDijkstra(); 
    } else if (document.getElementById("astar").checked === true) {
      currentAlgo = "astar";
      this.visualiseAstar(); 
    } else if (document.getElementById("bidirection").checked === true) {
      this.visualiseBidirectional(); 
    } else {
      alert("Select an Algorithm");
    }

    this.setState({running: true})
  }

  setMap() {
    if (this.state.running || this.state.completed) return;

    const grid = this.state.fullGrid;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].isWall) {
          const node = {
            ...grid[i][j],
            isWall: false
          }
          grid[i][j] = node;
        }
      }
    }
    this.generateMap();
  }

  generateMap() {
    if (this.state.running || this.state.completed) return;
    let grid  = this.state.fullGrid;
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        let chance = Math.floor(Math.random() * (11 - 1 + 1) + 1);
        if (chance === 10 || chance === 9) {
          makeGridWithWalls(this.state.fullGrid, row, column);
        }
      }
    }
    this.setState({fullGrid: grid, mapped: true});
    this.redraw();
  }

  resetGrid() {
    if (this.state.running) return;
    let resetGrid = getAllNodes(this.state.fullGrid);
    let fullGrid = reconstructGrid(this.state.fullGrid);
    if (document.getElementById("keepWalls").checked === true) {
      fullGrid = reconstructGridWithWalls(this.state.fullGrid);
    } else if (document.getElementById("clearWalls").checked === true) {
      fullGrid = reconstructGrid(this.state.fullGrid);
    } else {
      alert("Select Clear Type");
      return;
    }
    currentAlgo = null;
    for (let i = 0; i < resetGrid.length; i++) {
        if (resetGrid[i].isWall) {
            document.getElementById(`node-${resetGrid[i].row}-${resetGrid[i].column}`).className =
            'node node-wall';
        } else if (resetGrid[i].row === START_NODE_ROW && resetGrid[i].column === START_NODE_COLUMN) {
            document.getElementById(`node-${resetGrid[i].row}-${resetGrid[i].column}`).className =
            'node node-start';
        } else if (resetGrid[i].row === GOAL_NODE_ROW && resetGrid[i].column === GOAL_NODE_COLUMN) {
            document.getElementById(`node-${resetGrid[i].row}-${resetGrid[i].column}`).className =
            'node node-goal';
        } else {
            document.getElementById(`node-${resetGrid[i].row}-${resetGrid[i].column}`).className =
            'node';
        }
    }
    
    this.setState({fullGrid: fullGrid, completed: false, mapped: false});
  }

  redraw() {
    let newGrid = this.state.fullGrid;
    const currentGrid = getAllNodes(this.state.fullGrid);
    for (let i = 0; i < currentGrid.length; i++) {
      if (currentGrid[i].row === START_NODE_ROW && currentGrid[i].column === START_NODE_COLUMN) {
        let startNode = {
          ...currentGrid[i],
          isStart: true,
        }
        newGrid[currentGrid[i].row][currentGrid[i].column] = startNode;
      } else if (currentGrid[i].row === GOAL_NODE_ROW && currentGrid[i].column === GOAL_NODE_COLUMN) {
        let goalNode = {
          ...currentGrid[i],
          isGoal: true,
        }
        newGrid[currentGrid[i].row][currentGrid[i].column] = goalNode;
      } else if (currentGrid[i].isWall) {
      } else {
        let node = {
          ...currentGrid[i],
          isStart: false,
          isGoal: false,
          isWall: false,
        }
        newGrid[currentGrid[i].row][currentGrid[i].column] = node;
      }
    }
    this.setState({fullGrid: newGrid});
  }

  render() {
    const {fullGrid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="navbar navbar-default">
        <button className="btn btn-primary" onClick={() => this.visualiseAstar()}>
          Guide
        </button>
        <div class="btn-group btn-group-toggle" data-toggle="buttons" id="algoType">
        <label class="btn btn-primary">
          <input type="radio" name="algorithm" id="bfs" autocomplete="off"/> BFS
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="algorithm" id="dfs" autocomplete="off"/> DFS
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="algorithm" id="greedy" autocomplete="off"/> Greedy 
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="algorithm" id="dijkstra" autocomplete="off"/> Dijkstra's
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="algorithm" id="astar" autocomplete="off"/> A-Star
        </label>
        </div>
        <button className="btn btn-primary" onClick={() => this.visualise()}>
          Visualise Algorithm
        </button>
        <button className="btn btn-primary" onClick={() => this.setMap()}>
          Generate Random Map
        </button>
        <div class="btn-group btn-group-toggle" data-toggle="buttons" id="clearType">
        <label class="btn btn-primary">
          <input type="radio" name="option" id="keepWalls" autocomplete="off"/> Keep Walls
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="clearWalls" autocomplete="off"/> Clear Walls
        </label>
        </div>
        <button  className="btn btn-primary" onClick={() => this.resetGrid()}>
          Clear Grid
        </button>
        </div>
        <div className="container">
        <div className="grid">
          {fullGrid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, column, isGoal, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      column={column}
                      isGoal={isGoal}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, column) => this.handleMouseDown(row, column)}
                      onMouseEnter={(row, column) => this.handleMouseEnter(row, column)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
      </>
    );
  }
}
