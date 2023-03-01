import { useSelector, useDispatch } from 'react-redux';
import { selectCell, selectMove, MINE, THEIRS, KING } from './gameSlice';
import { Conn } from './peer';
import { transform } from './utils';

function Move({ move, whose, idx }) {
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

function Moves({ moves, whose }) {
  return (
    <div className="Moves">
      { moves.map((move, i) => <Move move={move} whose={whose} idx={i} key={i} />) }
    </div>
  );
}

function BoardCell({ state, row, col }) {
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
