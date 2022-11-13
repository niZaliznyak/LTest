import React from 'react';
import './styles.css';

function Card ({ number, show, acitve, onClick }) {
  let className = 'card';
  if (acitve) {
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
}

export default Card;
