import { useSelector, useDispatch } from 'react-redux';
import { selectMove, MINE } from './gameSlice';
import { transform } from '../utils';

const EMPTY = 0; const POS = 1; const DEST = 2;

export function MoveCell({ state }) {
  const className = 'MoveCell' + (state === POS ? ' Pos' : (state === DEST ? ' Dest' : ' Empty'));
  return (
    <td className={className}>
    </td>
  );
}

export function Move({ move, whose, idx }) {
  const { name, deltas, pos } = move;
  const dispatch = useDispatch();

  const grid = [
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  ];
  if (whose === MINE) {
    grid[pos.row][pos.col] = POS;
    for (let { x, y } of deltas) {
      grid[pos.row + y][pos.col + x] = DEST;
    }
  } else { // THEIRS
    const { row, col } = transform(pos);
    grid[row][col] = POS;
    for (let { x, y } of deltas) {
      grid[row - y][col - x] = DEST;
    }
  }

  const onClickMine = () => {
    if (idx !== 2) dispatch(selectMove({idx}));
  }

  const onClickTheirs = () => {
    //TODO: Inspect
  }

  return (
    <table className="Move" onClick={whose === MINE ? onClickMine : onClickTheirs}>
      <tbody>
        { grid.map((row, i) => (
            <tr key={i}>
              { row.map((cell, j) => <MoveCell state={cell} key={j} /> ) }
            </tr>
        )) }
      </tbody>
      <caption>
        { name }
      </caption>
    </table>
  );
}

export default function Moves({ moves, whose }) {
  return (
    <div className="Moves">
      { moves.map((move, i) => <Move move={move} whose={whose} idx={i} key={i} />) }
    </div>
  );
}
