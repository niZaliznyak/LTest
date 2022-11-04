import React, { useEffect, useState, useMemo } from 'react';
import Card from './components/Card/Card';
import style from './App.module.css';
import { generateShuffledPrimeNumbers } from './utils';

function App() {
  const shuffledDeck = useMemo(() => generateShuffledPrimeNumbers(), []);
  const [show, setShow] = useState(shuffledDeck);
  const [currentIndex, setCurrentIndex] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShow([]), 5000);

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
    } else if (currentIndex.length === 1 && currentIndex[0][0] !== number) {
      setCurrentIndex(() => [...currentIndex, [number, index]]);
      setTimeout(() => {
        setCurrentIndex([]);
      }, 1000);
    } else {
      setCurrentIndex(() => [...currentIndex, [number, index]]);
    }
  };

  const checkActive = (number, index) =>
    currentIndex.find(number => number[1] === index);
  const shouldShow = (number, index) =>
    show.includes(number) || currentIndex.find(num => num[1] === index);

  const renderCard = (number, index) => {
    const acitve = checkActive(number, index);
    const show = shouldShow(number, index);
    return (
      <React.Fragment key={index}>
        <Card
          number={number}
          acitve={acitve}
          show={show}
          onClick={show ? undefined : onTurnCard(number, index)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className={style.wrapper}>
      <h1>Mahjong</h1>
      <div className={style.desk}>
        {shuffledDeck.map((number, index) => renderCard(number, index))}
      </div>
    </div>
  );
}

export default App;
