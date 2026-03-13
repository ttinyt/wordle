import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
//components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, handleClick } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {

        if(isCorrect || turn > 5){
            setTimeout(() => setShowModal(true), 2000)
            if (!localStorage.wordlestruckStatistics) {
                localStorage.wordlestruckStatistics = JSON.stringify([
                    ...Array(7).fill(0),
                ]);
            }
            let objStatistics = JSON.parse(localStorage.wordlestruckStatistics);
            let index = isCorrect ? turn : 0;
            objStatistics[index] = Number(objStatistics[index]) + 1;
            localStorage.wordlestruckStatistics = JSON.stringify(objStatistics);
        } else {
            window.addEventListener("keyup", handleKeyup);
        }

        return () => window.removeEventListener('keyup', handleKeyup) //handlekeyup is a dependancy
    }, [handleKeyup, isCorrect, turn]) //dependencies


    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} handleClick={handleClick} isCorrect={isCorrect} turn={turn} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} setShowModal={setShowModal} />}
        </div>
    )
}

//<div>solution - {solution}</div>
//<div>Current Guess - {currentGuess}</div>
//react snippet shortcut command+shift+r