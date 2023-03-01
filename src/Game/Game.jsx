import { useSelector, useDispatch } from 'react-redux';
import { MINE, THEIRS } from './gameSlice';

import Board from './Board';
import Moves, { Move } from './Moves';

export default function Game() {
  const turn = useSelector((state) => state.game.turn);
  const moves = useSelector((state) => state.game.moves);

  return (
    <div className="Game">
      <Moves moves={moves.theirs} whose={THEIRS} />
      <Board />
      <Moves moves={moves.mine} whose={MINE} />
      <Move move={moves.middle} whose={turn} idx={2} />
      { turn === MINE ? 'Your turn' : 'Their turn' }
    </div>
  );
}
