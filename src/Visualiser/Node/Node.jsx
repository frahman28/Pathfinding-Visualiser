import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      column,
      isGoal,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isGoal
      ? 'node-goal'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${column}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, column)}
        onMouseEnter={() => onMouseEnter(row, column)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}