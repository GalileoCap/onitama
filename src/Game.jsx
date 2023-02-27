import { useSelector, useDispatch } from 'react-redux';
//import { pushMsg } from './messagesSlice';

function BoardCell({ state, row, col }) {
  return (
    <td className="BoardCell">
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
