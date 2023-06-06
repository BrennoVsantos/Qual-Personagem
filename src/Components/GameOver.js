import './GameOver.css'

const GameOver = ({retry, score, PickedWord}) => {
  return (
    <div className='gameOverScreen'>
      <h1>Fim de jogo!</h1>
      <p>A palavra era: <span>{PickedWord}</span></p>
      <h2>Sua pontuação foi: <span className='score'>{score}</span></h2>
      <button onClick={retry}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver