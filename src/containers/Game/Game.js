import React, { Component } from 'react';
import Board from './Board/Board';
import './Game.css';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      historyStep: [{}],
      stepNumber: 0,
      xIsNext: true,
      acsStepDirection: true
    };
  }

  toggleStepDirection = () => {
    const newDirection = this.state.acsStepDirection ? false : true;
    this.setState({acsStepDirection:  newDirection});
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const historyStep = this.state.historyStep.slice(0, this.state.stepNumber + 1);
    const stepNumber = this.state.stepNumber + 1;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      historyStep: historyStep.concat({ player: squares[i], row: Math.floor(i / 3), col: i % 3 }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    if(step === 0 ) {
      //start a new Game
      this.setState({
        stepNumber: step,
        xIsNext: true,
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        historyStep: [{}],
      });
    }

    else {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  }

  render() {
    const history = this.state.history;
    const historyStep = this.state.historyStep;
    const current = history[this.state.stepNumber];
    const winnerSquares = calculateWinner(current.squares);
    const winner = winnerSquares ? current.squares[winnerSquares[0]] : null;


    const moves = historyStep.map((step, move) => {
      const stepDesc = move ? step.player + "("+step.col + ","+ step.row+")" : null;
      const buttonDesc = move ? 'Go to move #' + move :   'Start a new game';
      const classname = move===this.state.stepNumber ? 'active' : 'not-active';
      return (
        <li key={move}>
          <button className={classname} onClick={() => this.jumpTo(move)}>{buttonDesc}</button> {stepDesc}
        </li>
      );
    });

    if (!this.state.acsStepDirection) {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else
      if ( this.state.stepNumber === 9 ) {
        status = "Game over, No winner";
      }
      else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }

    let directionIcon = (this.state.acsStepDirection) ? <FaArrowCircleUp size="2em"/> : <FaArrowCircleDown size="2em"/>;


    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerSquares= {winnerSquares}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="Icon" onClick={this.toggleStepDirection} >{directionIcon}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
