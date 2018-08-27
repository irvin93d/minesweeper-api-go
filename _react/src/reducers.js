import { combineReducers } from 'redux'
import { OPEN_CELL } from './actions'

const initialState = {
  mines: [],
  cols: 0,
  rows: 0
}

const minefield = (state = initialState, action) => {
  switch (action.type) {
  case OPEN_CELL:
    return state

  default:
    return state
  }
}

export default combineReducers({ minefield })
