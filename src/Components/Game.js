import { useState, useRef } from 'react'
import './Game.css'

const Game = ({verifyLetter, PickedWord, PickedCategory, Letters, GuessedLetters, WrongLetters, Guesses, Score}) => {

  const[Letter, setLetter] = useState("")
  const LetterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(Letter)
    setLetter("")
    LetterInputRef.current.focus()
  }

  return (
    <div className='game'>

      <p className='points'>
        <span>Pontuação: <span className='score'>{Score}</span> </span>
      </p>

      <h1 className='guessTitle'>Advinhe o personagem:</h1>

      <h3 className="tip">
        Anime de origem: <span>{PickedCategory}</span>
      </h3>

      <span className="tries">Voce ainda tem {Guesses} tentaivas</span>

      <div className="WordContainer">

        {Letters.map((letter, i) => (
          GuessedLetters.includes(letter) ? (<span key={i} className="Letter"> {letter} </span>) : (<span key={i} className="BlankSquare"></span>)
        ))}

      </div>

      <div className="LetterContainer">
        <p>Tente advinhar uma letra:</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="Letter" maxLength="1" required autoComplete='off' onChange={(e) => setLetter(e.target.value)} value={Letter} ref={LetterInputRef}/>
          <button>Jogar </button>
        </form>
      </div>

      <div className="WrongLettersContainer">
        <p>Letras já útilizadas: </p>
        <div className="usedLetters">
          {WrongLetters.map((letter, i) => (
            <span className='used' key={i}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game