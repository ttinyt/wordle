import React from 'react'

//components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn }) {
    return (
        <div>
            {guesses.map((g, i) => { //g is going to be a past formatted guess
                if (turn === i){
                    return <Row key={i} currentGuess={currentGuess} />
                } //so only the current turn has the current guess
                return <Row key={i} guess={g} />
            })}
        </div>
    )
}