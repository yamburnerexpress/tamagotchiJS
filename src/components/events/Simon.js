import React, {useState, useEffect, useRef, createRef} from "react";
import useSound from 'use-sound'
import { SpriteContainer } from "../SpriteContainer";
import { Battery } from "../Battery";
import { StatusLogWrapper } from "../StatusLogWrapper";
import useTamagotchi from "../../app/StateContext";
import useEvent from "../../app/EventContext";
import "../../css/display.css"
import "../../css/ActionButton.css"
import sfx from "../../audio/simon.mp3"

export const Simon = () => {
  const {name, setPlayedGame, setMessages} = useTamagotchi();
  const {resetEventData} = useEvent();
  const [pattern] = useState(Array.from({length: 7}, () => Math.floor(Math.random() * 4)))
  const [gameInit, setGameInit] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [currentSlice, setCurrentSlice] = useState(1)
  const [userInput, setUserInput] = useState([])
  const [message, setMessage] = useState(`${name} wants to play a memory game!`)
  const [finished, setFinished] = useState(false)
  const buttonRef = useRef([])
  const [play, {stop}] = useSound(sfx, {
    sprite: {
      note0: [0, 600],
      note1: [1000, 600],
      note2: [2000, 600],
      note3: [3000, 600]
    }
  })

  const buttonArray = [...Array(4).keys()]

  if (buttonRef.current.length !== buttonArray.length) {
    buttonRef.current = Array(buttonArray.length)
      .fill()
      .map((_, i) => buttonRef.current[i] || createRef())
  }

  const exitEvent = () => {
    setTimeout(() => {
      setPlayedGame()
      resetEventData()
      setMessages()
    }, 3000)
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage()
      setGameInit(false)
    }, 2000)
  }, [])

  const showColor = (buttonIndex) => {
    buttonRef.current[buttonIndex].current.style.backgroundColor = 'white'
    console.log(`note${buttonIndex}`)
    play({id: `note${buttonIndex}`})
    setTimeout(() => {
        buttonRef.current[buttonIndex].current.style.backgroundColor = ''
    }, 500)
  }

  useEffect(() => {
    if (!gameInit) {
      if (!finished) {
      setTimeout(() => {
        for (let i=0; i < pattern.slice(0, currentSlice).length; i++) {
          setTimeout(() => {
            showColor(pattern[i])
          }, 1000 * i)
        }
        setTimeout(() => {setDisabled(false)}, 1000 * pattern.slice(0, currentSlice).length)
      }, 1000)
      } else {
        exitEvent()
      }
    }
    // eslint-disable-next-line
  }, [currentSlice, pattern, finished, gameInit])

  const handleClick = (event) => {
    stop()
    play({id: `note${event.target.value}`})
    setUserInput([...userInput, event.target.value])
  }

  useEffect(() => {
    const match = pattern.slice(0, currentSlice)
    for (let i=0; i < userInput.length; i++) {
      if (Number(userInput[i]) !== match[i]) {
        setMessage("You failed!")
        setFinished(true)
      } else {
        if (userInput.length === match.length) {
          setDisabled(true)
          if (match.length === pattern.length) {
            setMessage("You win!")
            setFinished(true)
          } else {
            setCurrentSlice(Math.min(currentSlice + 1, pattern.length))
            setUserInput([])
          }
        }
      }
    }
  }, [userInput, currentSlice, pattern])

  return (
    <React.Fragment>
        <SpriteContainer>
          <div className="spriteContainer">
            <Battery />
            <div className="simonContainer">
              {
                buttonArray.map((el, i) => (
                  <button 
                    ref={buttonRef.current[i]} 
                    key={`simon_${i}`} 
                    className="roundButton simonButton" 
                    id={`simon_${i}`}
                    onClick={handleClick}
                    value={i}
                    disabled={disabled}
                  ></button>
                ))
              }
            </div>
          </div>
          <StatusLogWrapper>
            {message && <li>{message}</li>}
          </StatusLogWrapper>
        </SpriteContainer>
        <div className="bottomPanel">
          <div className='actions' />
        </div>
      </React.Fragment>
    )
}