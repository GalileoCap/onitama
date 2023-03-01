import { createSlice } from '@reduxjs/toolkit';
import { Conn } from './peer';
import { transform } from './utils';

export const MINE = 0; export const THEIRS = 1;
export const PAWN = 0; export const KING = 1;
const MOVE1 = {name: 'Move 1', deltas: [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}], pos: {row: 2, col: 2}};

function isMine(from, board) {
  const state = board[from.row][from.col];
  return state !== null && state.team === MINE;
}

function canMove(from, to, move, board) {
  const fromState = board[from.row][from.col];
  const toState = board[to.row][to.col];

  const dy = to.row - from.row;
  const dx = to.col - from.col;

  const notSameTeam = (fromState !== null && fromState.team === MINE) && (toState === null || toState.team === THEIRS);
  let moveAllowsIt = false;
  for (let { x, y } of move.deltas) { // Move allows it
    moveAllowsIt |= x === dx && y === dy;
  }

  return notSameTeam && moveAllowsIt;
}

function performMove(from, to, state) {
  // Move the piece
  state.board[to.row][to.col] = state.board[from.row][from.col];
  state.board[from.row][from.col] = null;

  if (state.turn === MINE) {
    const foo = state.moves.mine[state.moveIdx];
    state.moves.mine[state.moveIdx] = state.moves.middle;
    state.moves.middle = foo;
  } else { // THEIRS
    const foo = state.moves.theirs[state.moveIdx];
    state.moves.theirs[state.moveIdx] = state.moves.middle;
    state.moves.middle = foo;
  }

  // Reset values
  state.turn = (state.turn + 1) % 2;
  state.cell = undefined;
  state.moveIdx = undefined;
  state.moves.middle.whose = state.turn;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    turn: undefined,
    cell: undefined,
    moveIdx: undefined,
    moves: {
      mine: [MOVE1, MOVE1],
      theirs: [MOVE1, MOVE1],
      middle: MOVE1,
    },
    board: [
      [{piece: PAWN, team: THEIRS}, {piece: PAWN, team: THEIRS}, {piece: KING, team: THEIRS}, {piece: PAWN, team: THEIRS}, {piece: PAWN, team: THEIRS}],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [{piece: PAWN, team: MINE}, {piece: PAWN, team: MINE}, {piece: KING, team: MINE}, {piece: PAWN, team: MINE}, {piece: PAWN, team: MINE}],
    ],
  },
  reducers: {
    setOrder: (state, action) => {
      const { rolls, useMine } = action.payload;
      if (useMine) state.turn = (rolls.mine > rolls.theirs) ? MINE : THEIRS;
      else state.turn = (rolls.mine > rolls.theirs) ? THEIRS : MINE;
    },

    selectMove: (state, action) => {
      if (state.turn !== MINE) return;
      state.moveIdx = action.payload.idx;
    },

    selectCell: (state, action) => {
      if (state.turn !== MINE) return;

      const from = state.cell
      const to = action.payload;

      if (from === undefined && isMine(to, state.board)) { // Choose a piece
        state.cell = to;
      } else if (state.cell !== undefined && state.moveIdx !== undefined && canMove(from, to, state.moves.mine[state.moveIdx], state.board)) { // Move
        Conn.send({type: 'move', from, to, moveIdx: state.moveIdx});
        performMove(from, to, state);
      } else { // De-select
        state.cell = undefined;
      }
    },
    
    theirMove: (state, action) => {
      if (state.turn !== THEIRS) return;

      //TODO: Check valid move

      const { from, to, moveIdx } = action.payload;
      state.moveIdx = moveIdx;
      performMove(transform(from), transform(to), state);
    }
  },
});

export const { setOrder, selectCell, selectMove, theirMove } = gameSlice.actions;
export default gameSlice.reducer;
