import React from 'react'
import './SingleCard.css'



export default function SingleCard( { card, choice, flipped, disabled }) {
   
    const handleClick = () => {
      if(!disabled){
      choice(card)
      }
    }

  return (
    <div className="card">
        <div className={ flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt='card front' />
            <img 
            className='back'
             src='/img/cover.png' 
             alt='card back' 
             onClick={handleClick}
             />
        </div>
    </div>
  )
}
