import { createStore } from 'redux'
import rootReducer from './reducers'

const mockstate = {
  minefield: {
    mines: [[]],
    rows: 5,
    cols: 8
  }
}
const Store = createStore(
  rootReducer, mockstate 
  //, window.__REDUX_DEVTOOLS_EXTENSION__ 
  // && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store
