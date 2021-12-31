import { combineReducers } from 'redux'
import authorReducer from './authorsReducer'
import booksReducer from './booksReducer'
import categoriesReducer from './categoriesReducer'

export default combineReducers({
  authors: authorReducer,
  books : booksReducer,
  categories: categoriesReducer
})