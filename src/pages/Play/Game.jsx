import { useRef } from 'react';
import { Board as OnitamaBoard, Mine as OnitamaMine, Theirs as OnitamaTheirs, Extra as OnitamaExtra } from '../../games/onitama';
import { Board as TTTBoard, Mine as TTTMine, Theirs as TTTTheirs, Extra as TTTExtra } from '../../games/tiictaactooee';

export function Board({ game }) {
  const ref = useRef(null);

  return (
    <div className="Board Section" ref={ref}>
      { 
        game === 'onitama'
        ? <OnitamaBoard parentRef={ref} />
        : (game === 'tiictaactooee'
        ? <TTTBoard parentRef={ref} />
        : <></>
        )
      }
    </div>
  );
}

export function Mine({ game }) {
  const ref = useRef(null);

  return (
    <div className="Mine Section">
      { 
        game === 'onitama'
        ? <OnitamaMine parentRef={ref} />
        : (game === 'tiictaactooee'
        ? <TTTMine parentRef={ref} />
        : <></>
        )
      }
    </div>
  );
}

export function Theirs({ game }) {
  const ref = useRef(null);

  return (
    <div className="Theirs Section">
      { 
        game === 'onitama'
        ? <OnitamaTheirs parentRef={ref} />
        : (game === 'tiictaactooee'
        ? <TTTTheirs parentRef={ref} />
        : <></>
        )
      }
    </div>
  );
}

export function Extra({ game }) {
  const ref = useRef(null);

  return (
    <div className="Extra Section">
      { 
        game === 'onitama'
        ? <OnitamaExtra parentRef={ref} />
        : (game === 'tiictaactooee'
        ? <TTTExtra parentRef={ref} />
        : <></>
        )
      }
    </div>
  );
}


