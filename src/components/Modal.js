import React from 'react'

export default function Modal({ isCorrect, solution, turn, setShowModal }) {
    return (
        <div className="modal">
            <span className="close" onClick={() => { setShowModal(false); }}>
                &times;
            </span>
            {isCorrect && (
                <div>
                    <h1>Congratulations!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Nevermind</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time :)</p>
                </div>
            )}
        </div>
    )
}