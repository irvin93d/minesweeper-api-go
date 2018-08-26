const makeAction = type => payload => ({ type, payload })

export const OPEN_CELL = 'OPEN_CELL'
export const openCell = makeAction(OPEN_CELL)

