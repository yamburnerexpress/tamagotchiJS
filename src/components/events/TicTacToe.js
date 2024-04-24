import React, { useState, useEffect } from "react";
import useTamagotchi from "../../app/StateContext.js";
import useEvent from "../../app/EventContext.js";
import { SpriteContainer } from '../SpriteContainer.js';
import { StatusLogWrapper } from "../StatusLogWrapper.js";
import { Battery } from "../Battery.js";
import "../../css/display.css"

const winningComboPoints = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]]
]

const Cell = ({value, onClick}) => {
  const x = <svg aria-label="X" className="cellIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/></svg>
  const o = <svg aria-label="O" className="cellIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
  const content = (value===1 && x) || (value===2 && o) || "";

  return (
    <button className="cell" onClick={onClick} disabled={value > 0}>
      {content}
    </button>
  )
}

export const TicTacToe = () => {
  const initialState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  const {name, setPlayedGame, setMessages, setSpriteState} = useTamagotchi();
  const {resetEventData} = useEvent();
  const [board, setBoard] = useState(initialState);
  const [winState, setWinState] = useState();

  const getPointsWithValue = (val) => {
    let pointArray = [];
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++){
        if (board[y][x] === val) {
          pointArray.push([x, y]);
        }
      }
    }
    return pointArray;
  }

  const checkWin = (value) => {
    const cells = getPointsWithValue(value);
    for (let i = 0; i < winningComboPoints.length; i++) {
      let combo = winningComboPoints[i];
      let count = 0;
      combo.forEach(val => {
        cells.forEach(point => {
          if (JSON.stringify(val) === JSON.stringify(point)) {
            count++
          }
        })
      })
      if (count === 3) {
        return true
      }
    }
    return false
  }

  const calculateOptions = (value) => {
    const currentPoints = getPointsWithValue(value)
    const availablePoints = getPointsWithValue(0);
    const candidates = []
  
    for (let i = 0; i < winningComboPoints.length; i++) {
      let combo = winningComboPoints[i];
      let points = [];
      let countAvailable = 0;
      let countRemaining = 3;
      combo.forEach(val => {
        availablePoints.forEach(point => {
          if (JSON.stringify(val) === JSON.stringify(point)) {
            points.push(val)
            countAvailable++
          }
        })
        currentPoints.forEach(point => {
          if (JSON.stringify(val) === JSON.stringify(point)) {
            countRemaining--
          }
        })
      })
      if (countAvailable > 0) {
        candidates.push({
          points: points,
          countAvailable: countAvailable,
          countRemaining: countRemaining
        })
      }
    }
    candidates.sort(
      function(a, b) {
        if (a.countRemaining === b.countRemaining) {
          return b.countAvailable - a.countAvailable
        }
        return a.countRemaining - b.countRemaining
      }
    )
    return candidates.length > 0 ? candidates[0] : false;
  }

  const calculateTurn = () => {
    const computerOption = calculateOptions(2);
    const playerOption = calculateOptions(1);
    if (playerOption.countRemaining === 1 && computerOption.countRemaining > 1) {
      return playerOption.points[Math.floor(Math.random() * playerOption.points.length)];
    } else {
        return computerOption.points[Math.floor(Math.random() * computerOption.points.length)];
    }
  }

  // // allows computer to go first
  // useEffect(() => {
  //   let newBoard = [...board]
  //   let remainingCells = getPointsWithValue(0);
  //   if (remainingCells.length === 9) {
  //     let computer = calculateTurn(newBoard)
  //     if (computer) {
  //       newBoard[computer[1]][computer[0]] = 2;
  //       setBoard(newBoard);
  //     }
  //   }
  // }, [calculateTurn, board])

  const handleClick = (x, y) => {
    let newBoard = [...board];
    newBoard[y][x] = 1;
    setBoard(newBoard);
    let win = checkWin(1);
    if (win) {
      setWinState("win")
    } else {
      let remainingCells = getPointsWithValue(0);
      if (remainingCells.length === 0) {
        setWinState("tie")
      } else {
        let computer = calculateTurn(newBoard)
        if (computer) {
          newBoard[computer[1]][computer[0]] = 2;
          setBoard(newBoard);
        }
        if (checkWin(2)) {
          setWinState("lose")
        } else {
          let remainingCells = getPointsWithValue(0);
          if (remainingCells.length === 0) {
            setWinState("tie")
          }
        }
      }
    }
  }

  useEffect(() => {
    if (winState) {
      setTimeout(() => {
        setPlayedGame()
        resetEventData()
        setMessages()
        setSpriteState('base')
      }, 3000)
    }
  }, [winState, setPlayedGame, resetEventData, setMessages, setSpriteState])

  return (
    <React.Fragment>
      <SpriteContainer>
        <div className="spriteContainer">
          <Battery />
          <div className="board">
            <Cell value={board[0][0]} onClick={() => {handleClick(0, 0)}} />
            <Cell value={board[0][1]} onClick={() => {handleClick(1, 0)}} />
            <Cell value={board[0][2]} onClick={() => {handleClick(2, 0)}} />
            <Cell value={board[1][0]} onClick={() => {handleClick(0, 1)}} />
            <Cell value={board[1][1]} onClick={() => {handleClick(1, 1)}} />
            <Cell value={board[1][2]} onClick={() => {handleClick(2, 1)}} />
            <Cell value={board[2][0]} onClick={() => {handleClick(0, 2)}} />
            <Cell value={board[2][1]} onClick={() => {handleClick(1, 2)}} />
            <Cell value={board[2][2]} onClick={() => {handleClick(2, 2)}} />
          </div>
        </div>
        <StatusLogWrapper>
          <li key={winState}>
            {
              winState === "tie" 
              ? "It's a tie!"
              : winState 
                ? `You ${winState}!`
                : `${name} wants to play Tic Tac Toe!`
            }
          </li>
        </StatusLogWrapper>
      </SpriteContainer>
      <div className="bottomPanel" />
    </React.Fragment>
  );
}