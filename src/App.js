//Css
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from './Data/Words.js'

//Componentes
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {

  const GuessesNumber = 5

  const[gameStage, setGameStage] = useState(stages[0].name)
  const[Words] = useState(wordsList)

  const[PickedWord, setPickedWord] = useState("")
  const[PickedCategory, setPickedCategory] = useState("")
  const[Letters, setLetters] = useState([])

  const[GuessedLetters, setGuessedLetters] = useState([])
  const[WrongLetters, setWrongLetters] = useState([])
  const[Guesses, setGuesses] = useState(GuessesNumber)
  const[Score, setScore] = useState(0)

  const PickWordAndCategory = useCallback(() => {
    //Escolhe um categoria aleatoria
    const categories = Object.keys(Words);
    const Category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pega uma palavra aleatoria da categoria acima
    const Word = Words[Category][Math.floor(Math.random() * Words[Category].length)]

    return {Word, Category}
  }, [Words])

  //começa o jogo
  const startGame = useCallback(() => {

    clearLetterStates()

    //escolhe a palavra e categoria
    const {Word, Category} = PickWordAndCategory()

    //Cria um array de letras (Minusculas)
    let WordLetters = Word.split("")
    WordLetters = WordLetters.map((l) => (
      l.toLowerCase()
    ))

    //Seta os estados
    setPickedWord(Word)
    setPickedCategory(Category)
    setLetters(WordLetters)


    setGameStage(stages[1].name)
  }, [PickWordAndCategory]);

  //processa a letra informada
  const verifyLetter = (Letter) =>{
    const normalizedLetter = Letter.toLowerCase()

    //verifica se a letra ja foi usada
    if(GuessedLetters.includes(normalizedLetter) || WrongLetters.includes(normalizedLetter)){
      return
    }

    //Adiciona a letra certa ou remove uma tentativa
    if(Letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //Verifica se o número de tentativas é 0
  useEffect(() => {

    if(Guesses <= 0){
      //reseta todos os states
      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [Guesses])


  //verifica a condição de vitoria
  useEffect(() => {

    let uniqueLetters = [...new Set(Letters)]

    //condição de vitoria
    if(GuessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      //Aumenta o score
      setScore((actualScore) => actualScore += 50)

      //reinicia o jogo com uma nova palavra
      startGame()
    }

  }, [GuessedLetters, Letters, startGame, gameStage])

  //reseta o jogo
  const retry = () => {
    setScore(0)
    setGuesses(GuessesNumber)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}

      {gameStage === 'game' && <Game verifyLetter={verifyLetter} 
      PickedWord={PickedWord} 
      PickedCategory={PickedCategory} 
      Letters={Letters} 
      GuessedLetters={GuessedLetters} 
      WrongLetters={WrongLetters} 
      Guesses={Guesses}
      Score={Score} />}

      {gameStage === 'end' && <GameOver retry={retry} score={Score} PickedWord={PickedWord} />}
    </div>
  );
}

export default App;
