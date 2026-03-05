import React, { useEffect} from 'react'
import useWordle from '../hooks/useWordle'
//components
import Grid from './Grid'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution)
    

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        
        return () => window.removeEventListener('keyup', handleKeyup) //handlekeyup is a dependancy
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])

    
    return (
        <div>
            <div>solution - {solution}</div>
            <div>Current Guess - {currentGuess}</div>
            <Grid currentGuess = {currentGuess} guesses = {guesses} turn={turn} />
        </div>
    )
}


//react snippet shortcut command+shift+r
