import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function GameCard({ name, description, url }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(url);
  }
  const onPlay = () => {
    navigate(url + '/play'); //TODO: #play
  }
  const onRules = () => {
    navigate(url + '#rules');
  }

  return (
    <Card className='GameCard' onClick={onClick}>
      <Card.Title>{name}</Card.Title>
      <Card.Img variant='top' src='./holder.svg' />
      <Card.Text>{description}</Card.Text>
      <div className='card-actions'>
        <Button onClick={onPlay} variant='primary'>Play Now!</Button>
        <Button onClick={onRules} variant='secondary'>Rules</Button>
      </div>
    </Card>
  );
}

function GamesList() {
  return (
    <nav id='GamesList'>
      <GameCard name='Onitama' url='onitama' description='Like chess!' />
      <GameCard name='TiicTaacTooee' url='tiictaactooee' description='TicTacToe^2' />
    </nav>
  );
}

export function Home() {
  return (
    <div id='Home'>
      <GamesList />
    </div>
  );
}

/*
 * TODO:
 *  - Welcome page
 *  - Dynamic list of available games
 */
