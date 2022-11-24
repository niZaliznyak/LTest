import React from 'react';
import './styles.css';

type CardProps = {
  number: number,
  show: boolean,
  active: boolean,
  onClick?: () => void,
}

const Card: React.FC<CardProps> = ({ number, show, active, onClick }) => {
  let className = 'card';
  if (active) {
    className += ' active';
  }
  if (!show) {
    className += ' hidden';
  }

  return (
    <div className={className} onClick={onClick}>
      {show && number}
    </div>
  );
};

export default Card;
