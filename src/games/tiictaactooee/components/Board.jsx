import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell, MINE } from '../gameSlice';
import '../index.css';

export function BoardCellState({ state }) {
  const className = 'BoardCellState' + (state === null ? ' Empty' : (state === MINE ? ' Mine' : ' Theirs'));
  return (
    <svg className={className} viewBox="0 0 25 25">
      {
        state === null
        ? <></>
        : (state === MINE
        ? <circle cx='12.5' cy='12.5' r='10' />
        : <>
            <line x1='0' y1='0' x2='25' y2='25' />
            <line x1='0' y1='25' x2='25' y2='0' />
          </>
        )
      }
    </svg>
  )
}

export function BoardCell({ state, row, col }) {
  const dispatch = useDispatch();

  const onClick = (ev) => {
    dispatch(selectCell({cell: {row, col}}));
  }

  return (
    <td className='BoardCell' onClick={onClick}>
      <BoardCellState state={state} />
    </td>
  )
}

export function Board({ parentRef }) {
  const board = useSelector((state) => state.game2.board);

  const [ length, setLength ] = useState(100);
  useEffect(() => { //TODO: Repeated code
    if (!parentRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const height = parentRef.current.clientHeight;
      const width = parentRef.current.clientWidth;
      const newLength = Math.max(Math.min(height, width) * 0.95, 200);
      if (newLength !== length)
        setLength(newLength);
    });
    resizeObserver.observe(parentRef.current);

    return () => resizeObserver.disconnect();
  });

  return (
    <table id="TTTBoard" style={{maxHeight: length, maxWidth: length}}>
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
