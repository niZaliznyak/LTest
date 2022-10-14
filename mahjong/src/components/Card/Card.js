import './styles.css';

function Card({number, show, acitve, onClick}) {
  let className = 'card';
  if (acitve) {
    className = className + ' active';
  }
  if (!show) {
    className = className + ' hidden';
  }

  return (
    <div className={className} onClick={onClick}>
      {show && number}
    </div>
  );
}

export default Card;
