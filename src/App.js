import { useEffect, useState } from 'react'
import Wordle from './components/Wordle' //this is not incorrect boo

function App() {
  const [solution, setSolution] = useState(null)
  const [validWords, setValidWords] = useState([])

  useEffect(() => {
    
    fetch('/word-bank.csv')
      .then(res => res.text())
      .then(text => {
        const solutions = text
          .split('\n')
          .map(solution => solution.trim().toLowerCase())
          .filter(solution => solution.length > 0)
        // random int 
        const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
        setSolution(randomSolution) 
      })

    fetch('/valid-words.csv')
      .then(res => res.text())
      .then(text => {
        const words = text
          .split('\n')
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 0)
        setValidWords(words) 
      })      
  }, [])

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && validWords.length > 0 && <Wordle solution = {solution} validWords={validWords}/>}
    </div>
  )
}

export default App

/* localStorage.removeItem(“wordlestruckStatistics”); */
/*
my own solutions...

fetch('/solutions.csv')
      .then(res => res.text())
      .then(text => {
        const solutions = text
          .split('\n')
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 0)
        const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
        setSolution(randomSolution)
      })
*/


/* 
data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

*/

/*
Index:
http://localhost:3001/

Static files:
Serving./ public directory if it exists

Endpoints:
http://localhost:3001/solutions
*/

