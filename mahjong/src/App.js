import React, { useEffect } from 'react';
import Card from "./components/Card/Card"
import style from './App.module.css';
import { generateUniqueArray, shuffle } from "./utils";

const firstArray = generateUniqueArray(16, 60);
const secondArray = shuffle(firstArray);
const shuffledDeck = firstArray.concat(secondArray);

function App() {
  
  const [show, setShow] = React.useState(shuffledDeck);
  const [currentIndex, setCurrentIndex] = React.useState([]);

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
