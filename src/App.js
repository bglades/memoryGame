import { useEffect, useState } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]




function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  /* shuffles cards and gives each a new id. This function does 3 things: 
  1) Creates an array of 12 total cards by having two ...cardImages. 
  2) Shuffles images by using sort method creating a shuffled array. 
  3) Maps each to a new array and adds a new randomized id number. */
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffledCards)
      setTurns(0)
  }
  // function resolveAfter2Seconds() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('resolved');
  //       console.log(choiceOne, choiceTwo)
  //     }, 2000);
  //   });
  //}
  

async function handleChoice(card){

  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  // const compare = await resolveAfter2Seconds()
  // console.log(compare)
//   setTimeout(console.log('choiceOne',choiceOne),3000)
}

//useEffect to compare 2 cards
useEffect(()=>{
if (
  choiceOne && choiceTwo){
    if (choiceOne.src === choiceTwo.src){
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
    resetTurn()
  }
else {
  setTimeout(() => resetTurn(),1000)
}}
}, [choiceOne, choiceTwo])

console.log(cards)

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  
  setTurns(prevTurns => prevTurns +1)
  // console.log('fromResetTurnFucntion', choiceOne, choiceTwo)
}

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          choice={handleChoice}
          flipped={ card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
