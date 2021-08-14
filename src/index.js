import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    return (
      <button 
          className="square" 
          onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true
      };     
    }
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
    handleClick(i) {
      const squares = this.state.squares.slice()
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      if (squares[i] != null) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares:squares,
        xIsNext: !this.state.xIsNext
      });
    }
  
    render() {
      let status = 'Next player:' + this.state.xIsNext ? "X" : "O";
      const winner = calculateWinner(this.state.squares);
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="board">
          <div className="status">{status}</div>
            <div className="board-row">
              <div className="board-box">{this.renderSquare(0)}</div>
              <div className="board-box">{this.renderSquare(1)}</div>
              <div className="board-box">{this.renderSquare(2)}</div>
            </div>
            <div className="board-row">
              <div className="board-box">{this.renderSquare(3)}</div>
              <div className="board-box">{this.renderSquare(4)}</div>
              <div className="board-box">{this.renderSquare(5)}</div>
            </div>
            <div className="board-row">
              <div className="board-box">{this.renderSquare(6)}</div>
              <div className="board-box">{this.renderSquare(7)}</div>
              <div className="board-box">{this.renderSquare(8)}</div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
            <Board />
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }