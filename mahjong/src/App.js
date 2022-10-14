import React, { useEffect, useState, useMemo } from 'react';
import Card from "./components/Card/Card"
import style from './App.module.css';
import { generateUniqueArray, shuffle } from "./utils";

function App() {
  const firstArray = useMemo(() => generateUniqueArray(16, 60), []);
  const secondArray = useMemo(() => shuffle(firstArray), [firstArray]);
  const shuffledDeck = firstArray.concat(secondArray);
  
  const [show, setShow] = useState(shuffledDeck);
  const [currentIndex, setCurrentIndex] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => setShow([]), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onTurnCard = (number, index) => () => {
    if (currentIndex.length !== 0 && currentIndex[0][1] === index) {
      return;
    }

    if (currentIndex.length !== 0 && currentIndex[0][0] === number) {
      setShow([...show, number]);
      setCurrentIndex([]);
    } else {
        if (currentIndex.length === 1 && currentIndex[0][0] !== number) {
          setCurrentIndex(() => [...currentIndex, [number, index]]);
          setTimeout(() => {
            setCurrentIndex([]);
          }, [500]);
        } else {
          setCurrentIndex(() => [...currentIndex, [number, index]]);
        }
    }
  }

  return (
    <div className={style.wrapper}>
      <h1>Mahjong</h1>
      <div className={style.desk}>
        {shuffledDeck.map((number, index) => (
          <React.Fragment key={index + index}>
            <Card
              number={number}
              show={show.includes(number) || currentIndex.find(num => num[1] === index)}
              onClick={onTurnCard(number, index)}/>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
