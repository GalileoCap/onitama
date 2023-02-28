import { useSelector, useDispatch } from 'react-redux';
import { selectCell, selectMove, MINE } from './gameSlice';
import { Conn } from './peer';

function Move({ deltas, whose }) {
  const dispatch = useDispatch();

  const onClickMine = () => {
    dispatch(selectMove(deltas));
  }

  const onClickTheirs = () => {
    //TODO: Inspect
  }

  return (
    <button onClick={whose === MINE ? onClickMine : onClickTheirs}>
      Move
    </button>
  );
}

function BoardCell({ state, row, col }) {
  const dispatch = useDispatch();

  const onClick = (ev) => {
    dispatch(selectCell({row, col}));
  }

  return (
    <td className="BoardCell" onClick={onClick}>
      { state }
    </td>
  )
}

function Board() {
  const board = useSelector((state) => state.game.board);

  return (
    <table className="Board">
      <tbody>
      { board.map((row, i) => (
          <tr key={i}>
            { row.map((cell, j) => <BoardCell state={cell} row={i} col={j} key={j}/>) }
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default function Game() {
  const turn = useSelector((state) => state.game.turn);

  return (
    <div className="Game">
      <Board />
      <Move deltas={[{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}]} whose={MINE} />
      { turn === MINE ? 'Your turn' : 'Their turn' }
    </div>
  );
}
