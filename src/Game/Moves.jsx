import { useSelector, useDispatch } from 'react-redux';
import { selectMove, MINE } from './gameSlice';
import { transform } from '../utils';

export function Move({ move, whose, idx }) {
  const { name, deltas, pos } = move;
  const dispatch = useDispatch();

  const grid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  if (whose === MINE) {
    grid[pos.row][pos.col] = 1;
    for (let { x, y } of deltas) {
      grid[pos.row + y][pos.col + x] = 2;
    }
  } else { // THEIRS
    const { row, col } = transform(pos);
    grid[pos.row][pos.col] = 1;
    for (let { x, y } of deltas) {
      grid[pos.row - y][pos.col - x] = 2;
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
              { row.map((cell, j) => (
                <td key={j} className="MoveCell">
                  {cell}
                </td>
              )) }
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
