import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import {
  Board as OnitamaBoard,
  Mine as OnitamaMine,
  Theirs as OnitamaTheirs,
  Extra as OnitamaExtra,
  initGame as OnitamaInitGame,
  getMetadata as OnitamaGetMetadata,
} from '../../games/onitama';
import {
  Board as TTTBoard,
  Mine as TTTMine,
  Theirs as TTTTheirs,
  Extra as TTTExtra,
  initGame as TTTInitGame,
  getMetadata as TTTGetMetadata,
} from '../../games/tiictaactooee';

function getContext(game) {
  const context = {
    game,
    success: true
  };

  switch (game) {
  case 'onitama':
    context.GameBoard = OnitamaBoard;
    context.GameMine = OnitamaMine;
    context.GameTheirs = OnitamaTheirs;
    context.GameExtra = OnitamaExtra;
    context.initGame = OnitamaInitGame;
    context.getMetadata = OnitamaGetMetadata;
    break;

  case 'tiictaactooee':
    context.GameBoard = TTTBoard;
    context.GameMine = TTTMine;
    context.GameTheirs = TTTTheirs;
    context.GameExtra = TTTExtra;
    context.initGame = TTTInitGame;
    context.getMetadata = TTTGetMetadata;
    break;

  default:
    context.success = false;
  };

  return context;
}

export function GameWrapper() {
  const { game } = useParams();
  const [ context, setContext ] = useState({success: false});
  useEffect(() => {
    setContext(getContext(game));
  }, [game]);

  return (
    <>
      {
        context.success
        ? <Outlet context={context} />
        : 'No such game' /* TODO: NoGame page */
      }
    </>
  );
}

/*
 * TODO:
 */
