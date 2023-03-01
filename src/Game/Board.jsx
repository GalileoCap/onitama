import { useSelector, useDispatch } from 'react-redux';
import { selectCell, KING } from './gameSlice';

export function BoardCell({ state, row, col }) {
  const dispatch = useDispatch();

  const onClick = (ev) => {
    dispatch(selectCell({row, col}));
  }

  return (
    <td className="BoardCell" onClick={onClick}>
      { state === null ? 0 : (2 * state.team + (state.piece === KING) + 1) }
    </td>
  )
}

export default function Board() {
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
