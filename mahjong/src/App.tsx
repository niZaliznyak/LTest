import React, { useEffect, useState, useMemo } from 'react';
import Card from './components/Card/Card';
import { generateShuffledPrimeNumbers } from './utils/utils';

function App () {
  const shuffledDeck = useMemo(() => generateShuffledPrimeNumbers(), []);
  const [show, setShow] = useState(shuffledDeck);
  const [currentIndex, setCurrentIndex] = useState<Array<number[]>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShow([]), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onTurnCard = (number: number, index: number): () => void => () => {
    if (currentIndex.length === 2) {
      return;
    }
    if (currentIndex.length !== 0 && currentIndex[0][1] === index) {
      return;
    }

    if (currentIndex.length !== 0 && currentIndex[0][0] === number) {
      setShow([...show, number]);
      setCurrentIndex([]);
    } else {
      if (currentIndex.length === 1 && currentIndex[0][0] !== number) {
        setCurrentIndex([...currentIndex, [number, index]]);
        setTimeout(() => {
          setCurrentIndex([]);
        }, 1000);
      } else {
        setCurrentIndex([...currentIndex, [number, index]]);
      }
    }
  };

  return (
    <div className='wrapper'>
      <h1>Mahjong</h1>
      <div className='desk'>
        {shuffledDeck.map((number, index) => {
          const isActive: boolean = !!currentIndex.find(num => num[1] === index);
          const shouldShow: boolean = show.includes(number) || !!currentIndex.find(num => num[1] === index);
          return (
            <Card
              key={index}
              number={number}
              active={isActive}
              show={shouldShow}
              onClick={shouldShow ? undefined : onTurnCard(number, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
