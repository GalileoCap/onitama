import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export function Board() {
  const { GameBoard } = useOutletContext();
  const ref = useRef(null);

  return (
    <div className="Board Section" ref={ref}>
      <GameBoard parentRef={ref} />
    </div>
  );
}

export function Mine() {
  const { GameMine } = useOutletContext();
  const ref = useRef(null);

  return (
    <div className="Mine Section">
      <GameMine parentRef={ref} />
    </div>
  );
}

export function Theirs() {
  const { GameTheirs } = useOutletContext();
  const ref = useRef(null);

  return (
    <div className="Theirs Section">
      <GameTheirs parentRef={ref} />
    </div>
  );
}

export function Extra() {
  const { GameExtra } = useOutletContext();
  const ref = useRef(null);

  return (
    <div className="Extra Section">
      <GameExtra parentRef={ref} />
    </div>
  );
}

