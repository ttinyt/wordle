import React from 'react'

export default function Row({ guess, currentGuess, shaky }) {

    let currentClassName = shaky ? "row current shaky" : "row current"
    
    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => (
                    <div key={i} className={l.color}>{l.key}</div>
                ))}
            </div>
        )
    }

    if (currentGuess) {
        let letters = currentGuess.split('')

        return (
            <div className= {currentClassName}>
                {letters.map((letter, i) => (
                    <div key={i} className="filled">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}