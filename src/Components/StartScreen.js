import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='Start'>
        <h1>Qual é o personagem?</h1>
        <p>Clique para começar a jogar</p>
        <button onClick={startGame}>Começar</button>
    </div>
  )
}

export default StartScreen