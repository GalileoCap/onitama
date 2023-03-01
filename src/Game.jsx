import { useSelector, useDispatch } from 'react-redux';
import { selectCell, selectMove, MINE, THEIRS, KING } from './gameSlice';
import { Conn } from './peer';
import { transform } from './utils';

function Move({ move, whose, middle }) {
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
    if (!middle) dispatch(selectMove(deltas));
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
      { moves.map((move, i) => <Move move={move} whose={whose} key={i} />) }
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

  const move = {name: 'Move 1', deltas: [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}], pos: {row: 2, col: 2}};
  const theirMoves = [move, move];
  const myMoves = [move, move];
  const middleMove = move;

  return (
    <div className="Game">
      <Moves moves={theirMoves} whose={THEIRS} />
      <Board />
      <Moves moves={myMoves} whose={MINE} />
      <Move move={middleMove} whose={turn} middle={true} />
      { turn === MINE ? 'Your turn' : 'Their turn' }
    </div>
  );
}
