import { combineReducers } from 'redux'
import bookReducer from "./book.reducer";


export default combineReducers({
  books : bookReducer
})