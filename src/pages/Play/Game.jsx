import { useRef } from 'react';
import { Board as OnitamaBoard, Mine as OnitamaMine, Theirs as OnitamaTheirs, Extra as OnitamaExtra } from '../../games/onitama';

export function Board() {
  const ref = useRef(null);
  return (
    <div className="Board Section" ref={ref}>
      <OnitamaBoard parentRef={ref} />
    </div>
  );
}

export function Mine() {
  return (
    <div className="Mine Section">
      <OnitamaMine />
    </div>
  );
}

export function Theirs() {
  return (
    <div className="Theirs Section">
      <OnitamaTheirs />
    </div>
  );
}

export function Extra() {
  return (
    <div className="Extra Section">
      <OnitamaExtra />
    </div>
  );
}


