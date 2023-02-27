import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from './gameSlice';
import { Conn } from './peer';

function BoardCell({ state, row, col }) {
  const dispatch = useDispatch();
  const onClick = (ev) => {
    dispatch(selectCell({row, col}));
    Conn.send({type: 'move', cell: {row, col}});
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
  return (
    <div className="Game">
      <Board />
    </div>
  );
}
