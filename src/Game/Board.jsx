import { useSelector, useDispatch } from 'react-redux';
import { selectCell, MINE, KING } from './gameSlice';

export function BoardPawn({ state }) {
  const className = 'BoardPawn' + (state === null ? ' Empty' : ((state.piece === KING ? ' King' : ' Pawn') + (state.team === MINE ? ' Mine' : ' Theirs')));
  return (
    <svg className={className} height='25' width='25'>
      {
        state === null
        ? <></>
        : (
          state.piece === KING
          ? <polygon points='2.5,22.5 22.5,22.5 12.5,2.5' />
          : <circle cx='12.5' cy='12.5' r='10' />
        )
      }
    </svg>
  )
}

export function BoardCell({ state, row, col }) {
  const dispatch = useDispatch();

  const onClick = (ev) => {
    dispatch(selectCell({row, col}));
  }

  const className = 'BoardCell' + (row === 0 && col === 2 ? ' Theirs' : (row === 4 && col === 2 ? ' Mine' : ''));
  return (
    <td className={className} onClick={onClick}>
      <BoardPawn state={state} />
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
