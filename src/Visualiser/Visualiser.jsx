import React, {Component} from 'react';
import Node from './Node/Node';
import {START_NODE_COLUMN, START_NODE_ROW, GOAL_NODE_COLUMN, GOAL_NODE_ROW, reconstructGrid, makeGridWithWalls, getAllNodes, moveStartNode, moveGoalNode} from './GridUtil';
import {dijkstra, makeShortestPath} from '../Algorithms/dijkstra';
import {bfs} from '../Algorithms/bfs';
import {dfs} from '../Algorithms/dfs';
import {greedy} from '../Algorithms/greedy';
import {astar} from '../Algorithms/astar';
import { expandStart, expandGoal, expandBoth } from '../Algorithms/bi-directional';
import './Visualiser.css';

export default class Visualiser extends Component {
  constructor() {
    super();
    this.state = {
      fullGrid: [],
      running: false,
      completed: false,
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
    console.log(newGrid[row][column]);
    if (this.state.movingStart) {
        newGrid = moveStartNode(this.state.fullGrid, row, column);
    } else if (this.state.movingGoal) {
        newGrid = moveGoalNode(this.state.fullGrid, row, column);
    } else {
        newGrid = makeGridWithWalls(this.state.fullGrid, row, column);
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
    lastAnim.addEventListener('animationend', () => {this.setState({running: false, completed: true})});
  }

  visualiseDijkstra() {
    if (this.state.completed) return;
    if (this.state.running) return;
    const fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    console.log(startNode);
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
    console.log(shortestPath);
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
    console.log(nodesVisited);
    const shortestPath = makeShortestPath(goalNode);
    console.log(shortestPath);
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
    console.log(nodesVisited);
    const shortestPath = makeShortestPath(goalNode);
    console.log(shortestPath);
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

  visualiseBidirectional() {
    if (this.state.completed) return;
    if (this.state.running) return;
    let fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const nodesVisitedStart = expandStart(fullGrid, startNode, goalNode);
    const nodesVisitedGoal = expandGoal(fullGrid, startNode, goalNode);
    const shortestPathStart = makeShortestPath(goalNode);
    const shortestPathGoal = makeShortestPath(startNode);
    for (let i = 0; i <= nodesVisitedGoal.length; i++) {
        let j = i;
        if (i === nodesVisitedStart.length) {
          setTimeout(() => {
            this.animateShortestPath(shortestPathStart);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          document.getElementById(`node-${nodesVisitedStart[i].row}-${nodesVisitedStart[i].column}`).className =
            'node node-visited';
            document.getElementById(`node-${nodesVisitedGoal[i].row}-${nodesVisitedGoal[i].column}`).className =
            'node node-visited';
        }, 10 * i);
    }
  }

  visualiseBd() {
    if (this.state.completed) return;
    if (this.state.running) return;
    let fullGrid = this.state.fullGrid;
    this.setState({running: true});
    let startNode = fullGrid[START_NODE_ROW][START_NODE_COLUMN];
    let goalNode = fullGrid[GOAL_NODE_ROW][GOAL_NODE_COLUMN];
    const shortestPathStart = makeShortestPath(goalNode);
    const nodesVisited = expandBoth(fullGrid, startNode, goalNode);
    let i = 0;
    let j = 0;
    while ( nodesVisited[0][0] !== nodesVisited[1][0] && nodesVisited[0][i] !== undefined && nodesVisited[1][i] !== undefined && nodesVisited[0].length !== i && nodesVisited[1].length !== j) {
      console.log(nodesVisited[0][i].row);
      if (i === nodesVisited[0].length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathStart);
        }, 10 * i);
        return;
      }
      let row = nodesVisited[0][i].row;
      let column = nodesVisited[0][i].column;
      setTimeout(() => {
        document.getElementById(`node-${row}-${column}`).className =
          'node node-visited';
          document.getElementById(`node-${nodesVisited[1][j].row}-${nodesVisited[1][j].column}`).className =
          'node node-visited';
      }, 10 * i);
      if (nodesVisited[0][i + 1] !== undefined) {
        i++;
      }
      if (nodesVisited[1][j + 1] !== undefined) {
        j++;
      }
    }
    console.log(nodesVisited[0][0] !== nodesVisited[1][0]);
    console.log(nodesVisited[1][0].row);
  }

  visualise() {
    if (this.state.completed) return;
    if (this.state.running) return;

    if (document.getElementById("bfs").checked === true) {
      this.visualiseBfs();
    } else if (document.getElementById("dfs").checked === true) {
      this.visualiseDfs();
    } else if (document.getElementById("greedy").checked === true) {
      this.visualiseGreedy();
    } else if (document.getElementById("dijkstra").checked === true) {
      this.visualiseDijkstra(); 
    } else if (document.getElementById("astar").checked === true) {
      this.visualiseAstar(); 
    } else if (document.getElementById("bidirection").checked === true) {
      this.visualiseBd(); 
    } else {
      alert("Select an Algorithm");
    }
  }

  resetGrid() {
    if (this.state.running || !this.state.completed) return;
    let resetGrid = getAllNodes(this.state.fullGrid);
    const fullGrid = reconstructGrid();
    
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
    
    this.setState({fullGrid: fullGrid, completed: false});
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
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-primary">
          <input type="radio" name="option" id="bfs" autocomplete="off"/> BFS
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="dfs" autocomplete="off"/> DFS
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="greedy" autocomplete="off"/> Greedy 
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="dijkstra" autocomplete="off"/> Dijkstra's
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="astar" autocomplete="off"/> A-Star
        </label>
        <label class="btn btn-primary">
          <input type="radio" name="option" id="bidirection" autocomplete="off"/> Bi-directional
        </label>
        </div>
        <button className="btn btn-primary" onClick={() => this.visualise()}>
          Visualise Algorithm
        </button>
        <button className="btn btn-primary" onClick={() => this.visualise()}>
          Generate Random Map
        </button>
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
