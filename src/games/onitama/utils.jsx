export function transform({ row, col }) {
  const f = (x) => { //TODO: Smarter?
    switch (x) {
    case 0: return 4;
    case 1: return 3;
    case 2: return 2;
    case 3: return 1;
    case 4: return 0;
    }
  }

  return { row: f(row), col: f(col) };
}
