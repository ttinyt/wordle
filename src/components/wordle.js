import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
//components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, validWords }) {
    const [shaky, setShaky] = useState(false)
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, handleClick } = useWordle(solution, validWords, setShaky)
    const [showModal, setShowModal] = useState(false)
    const isGameOver = isCorrect || turn > 5;

    useEffect(() => {

        if (!isCorrect && turn <= 5){ //if game is not over
            window.addEventListener('keyup', handleKeyup)
        }

        if(isCorrect || turn > 5){
            setTimeout(() => setShowModal(true), 2000)
            if (!localStorage.wordlestruckStatistics) {
                localStorage.wordlestruckStatistics = JSON.stringify([ //if no statistics exist, new array
                    ...Array(7).fill(0),
                ]);
            }
            let objStatistics = JSON.parse(localStorage.wordlestruckStatistics); //string to array
            let index = isCorrect ? turn : 0; //if true turn, if false 0
            objStatistics[index] = Number(objStatistics[index]) + 1; //increment count for reuslt
            localStorage.wordlestruckStatistics = JSON.stringify(objStatistics);
        }
        
        return () => window.removeEventListener('keyup', handleKeyup) //handlekeyup is a dependency
    }, [handleKeyup, isCorrect, turn, showModal]) //dependencies


    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} shaky={shaky} />
            {!isGameOver && ( //so that we cant write more after game is over
                <Keypad usedKeys={usedKeys} handleClick={handleClick} isCorrect={isCorrect} turn={turn} />
            )}
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} setShowModal={setShowModal} />}
        </div>
    )
}

//<div>solution - {solution}</div>
//<div>Current Guess - {currentGuess}</div>
//react snippet shortcut command+shift+r