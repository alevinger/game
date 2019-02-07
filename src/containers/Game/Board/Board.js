import React, { Component } from 'react';
import Square from '../../../components/Square/Square';
import './Board.css';

class Board extends Component {
  renderSquare(i) {
    const highlight = ( this.props.winnerSquares && this.props.winnerSquares.indexOf(i) >= 0 )? 'highlight' :  null;
    return (
      <Square
        key= {i}
        highlight={highlight}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [...Array(3)].map((v, i) => {
      return (
        <div key={i} className="board-row">
          {[...Array(3)].map((w, j) => {
            return this.renderSquare(3* i + j);
          })}
        </div>
      );
    })

    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
