import { createStore } from 'redux'
import rootReducer from './reducers'
import { mockMinefield } from './mock_minefield.js'

const Store = createStore(
  rootReducer, {minefield: mockMinefield} 
  //, window.__REDUX_DEVTOOLS_EXTENSION__ 
  // && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store
