import React from 'react'

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn }) {
    return (
        <div>
            {guesses.map((g, i) => { //g is going to be a past formatted guess
                return <Row key={i} guess={g} />
            })}
        </div>
    )
}