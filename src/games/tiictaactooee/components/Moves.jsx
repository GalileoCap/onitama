import { useSelector } from 'react-redux';
import { MINE } from '../gameSlice';

export function Mine() {
  //TODO: Remove
  return <div>Mine</div>
}

export function Theirs() {
  //TODO: Remove
  return <div>Theirs</div>
}

export function Extra() {
  const turn = useSelector((state) => state.TTT.turn);
  //TODO: Timer
  return <div>{turn === MINE ? 'Your turn' : 'Their turn'}</div>
}
