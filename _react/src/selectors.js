export const getMinefield = state => state.minefield
export const getMinefieldCols = state => getMinefield(state).cols
export const getMinefieldRows = state => getMinefield(state).rows
export const getMinefieldMines = state => getMinefield(state).mines
export const getMinefieldMineCell = (state, cell) => getMinefieldMines(state)[cell.row][cell.col]
