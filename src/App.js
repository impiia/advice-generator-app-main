import React, { useState, useEffect } from "react";
import style from './index.module.css';
import DiceIcon from '../src/images/icon-dice.svg';
import { useMediaQuery } from "react-responsive";
import DividerDesktop from '../src/images/pattern-divider-desktop.svg'
import DividerMobile from '../src/images/pattern-divider-mobile.svg'


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [adviceNumber, setAdviceNumber] = useState(null);
  const [adviceText, setAdviceText] = useState(null);

  const getAdvice = async () => {
    try {
      setIsLoading(true); // Устанавливаем состояние загрузки в true перед началом асинхронной операции
  
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      const slip = data.slip;
      const number = slip.id;
      const text = slip.advice;
  
      setAdviceNumber(number);
      setAdviceText(text);
      console.log('N: ' + number + ', advice: ' + text);
    } catch (error) {
      console.log('Error retrieving advice:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Устанавливаем состояние загрузки в false после завершения асинхронной операции с небольшой задержкой
      }, 1000); // Задержка в 1 секунду
    }
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
        
        <div className={`${style.dice_icon} ${isLoading ? style.rotate : ''}`} onClick={getAdvice} >
          <img src={DiceIcon} alt="Dice icon"/>
        </div>
      </div>
    </div>
  );
}

export default App;
