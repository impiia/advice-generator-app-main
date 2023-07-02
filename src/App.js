import React, { useState, useEffect } from "react";
import style from './index.module.css';
import DiceIcon from '../src/images/icon-dice.svg';
import { useMediaQuery } from "react-responsive";
import DividerDesktop from '../src/images/pattern-divider-desktop.svg'
import DividerMobile from '../src/images/pattern-divider-mobile.svg'


function App() {
  const [adviceNumber, setAdviceNumber] = useState(null);
  const [adviceText, setAdviceText] = useState(null);

  const getAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        const slip = data.slip;
        const number = slip.id;
        const text = slip.advice;

        setAdviceNumber(number);
        setAdviceText(text);
        console.log('N: '+number+' , advice: '+text);
      })
      .catch(error => {
        console.log('Error retrieving advice:', error);
      });
  };

  useEffect(() => {
    getAdvice();
  }, []);
  

  const isMobile = useMediaQuery({ maxWidth: 1010 });

  return (
   
    <div className={style.wrapper}>
      <div className={style.card}>
        <h1 className={style.title}>ADVICE #{adviceNumber}</h1>
        <p className={style.advice}>"{adviceText}"</p>
        
        {isMobile ? (
          <img src={DividerMobile} alt="Divider" className={style.divider} />
        ) : (
          <img src={DividerDesktop} alt="Divider" className={style.divider} />
        )}
        
        <div className={style.dice_icon}>
          <img src={DiceIcon} alt="Dice icon" onClick={getAdvice} />
        </div>
      </div>
    </div>

  );
}

export default App;
