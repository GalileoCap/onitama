import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import {
  initGame as OnitamaInitGame,
  getMetadata as OnitamaGetMetadata,
  gameMsg as OnitamaGameMsg,

  Board as OnitamaBoard,
  Mine as OnitamaMine,
  Theirs as OnitamaTheirs,
  Extra as OnitamaExtra,
} from '../../games/onitama';

import {
  initGame as TTTInitGame,
  getMetadata as TTTGetMetadata,
  gameMsg as TTTGameMsg,

  Board as TTTBoard,
  Mine as TTTMine,
  Theirs as TTTTheirs,
  Extra as TTTExtra,
} from '../../games/tiictaactooee';

function getContext(game) {
  const context = {
    game,
    success: true
  };

  switch (game) {
  case 'onitama':
    context.initGame = OnitamaInitGame;
    context.getMetadata = OnitamaGetMetadata;
    context.gameMsg = OnitamaGameMsg;

    context.GameBoard = OnitamaBoard;
    context.GameMine = OnitamaMine;
    context.GameTheirs = OnitamaTheirs;
    context.GameExtra = OnitamaExtra;
    break;

  case 'tiictaactooee':
    context.initGame = TTTInitGame;
    context.getMetadata = TTTGetMetadata;
    context.gameMsg = TTTGameMsg;

    context.GameBoard = TTTBoard;
    context.GameMine = TTTMine;
    context.GameTheirs = TTTTheirs;
    context.GameExtra = TTTExtra;
    break;

  default:
    context.success = false;
  };

  return context;
}

export let gameMsg = () => {}; 

export function GameWrapper() {
  const { game } = useParams();
  const [ context, setContext ] = useState({success: false});
  useEffect(() => {
    const newContext = getContext(game);
    setContext(newContext);
    gameMsg = newContext.gameMsg;
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
