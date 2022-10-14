import './styles.css';

function Card({number, show, onClick}) {

  return (
    <div className={show ? `card` : 'card hidden'} onClick={onClick}>
      {show && number}
    </div>
  );
}

export default Card;
