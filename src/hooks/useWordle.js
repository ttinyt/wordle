import { useState } from 'react'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) //start on turn 0
    const [currentGuess, setCurrentGuess] = useState('') // what the user is currently clicking on the keyboard
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array. length 6 guesses.
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false) // false until win
    const [usedKeys, setUsedKeys] = useState({}) //{a: 'green', b: 'yellow', c: 'grey'}


    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution] //turning string to array of letters
        let formattedGuess = [...currentGuess].map((l) => { //l for letter
            return {key: l, color: 'grey'} //default grey colour
        }) //so each letter has a key and color property

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) { //if solution and guess match position and letter. exact match.
                formattedGuess[i].color = 'green'
                solutionArray[i] = null //for no double matching
            }
        })

        // find any yellow colors
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') { //if solution and guess match position and letter. exact match.
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null //
            }
        })

        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => { // function as an argument to return the new states
            let newGuesses = [...prevGuesses] //new variable guesses array
            newGuesses[turn] = formattedGuess
            return newGuesses //updated
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess] //guess history in string format
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys) =>{
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key] //color if exist
                
                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if (turn > 5) {
                console.log('you used all your guesses!') 
                return // doesnt continue if all turnd are used
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('you already tried that word.')
                return
            }
            // check word is 5 chars
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars.')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }
    // so that we always know their currentGuess 

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }
    //the ones we need to call from others
}

export default useWordle