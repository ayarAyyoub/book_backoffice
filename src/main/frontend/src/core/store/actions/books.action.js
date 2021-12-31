import apiConfig from '../../configs/api.config';
import {  DELETE_BOOK, DELETE_Book, FETCH_BOOKS, FETCH_Books, FETCH_BOOK_BY_ID, SEND_BOOK, SEND_Book, STATES } from '../types'

const RESOURCE_API = "/api/books";

export const deleteBook = (id) => async dispatch => {
    dispatch(startDeletingBook()); 
    try{
        await apiConfig.delete(`${RESOURCE_API}/${id}`);
         
        dispatch( deleteBookSuccess());
    }
    catch(error){ 
        dispatch( deleteBookFailed(error.response.data.errors));
    }
}


export const persistBook = (book, action) => async dispatch => {
    dispatch(startSendingBook()); 
    try{
        const res = (action === 'POST')? await apiConfig.post(`${RESOURCE_API}`,  book ) 
                                        : await apiConfig.put(`${RESOURCE_API}`,  book );
         
        dispatch( sendBookSuccess(res.data ));
    }
    catch(error){ 
        dispatch( sendBookFailed(error.response.data.errors));
    }
}

export const getBook = (id) => async dispatch => {
    dispatch(startGetBook()); 
    try{
        const res = await apiConfig.get(`${RESOURCE_API}/${id}`);
     
        dispatch( getBookCompleted(res.data ));
    }
    catch(error){
        dispatch( getBookFailed(error));
    }
}


export const getBooks = (page, size) => async dispatch => {
    dispatch(startGetBooks()); 
    try{
        const params = new URLSearchParams([['page', page],['size', size]]);
        const res = await apiConfig.get(`${RESOURCE_API}`,{ params });
     
        dispatch( getBooksCompleted({pagesCount : res.headers["total-pages"],list : res.data}) );
    }
    catch(error){
        dispatch( getBooksFailed(error));
    }
}



export const getBooksClear = () => ({
    type: FETCH_BOOKS +  STATES.CLEAR
});
const startGetBooks = () => ({
    type: FETCH_BOOKS +  STATES.INIT
});
const getBooksCompleted = (data) => ({
    type: FETCH_BOOKS +  STATES.SUCCESS,
    payload : data
});
const getBooksFailed = (reason) => ({
    type: FETCH_BOOKS +  STATES.FAILED,
    payload : reason
});


export const getBookClear = () => ({
    type: FETCH_BOOK_BY_ID +  STATES.CLEAR
});
const startGetBook = () => ({
    type: FETCH_BOOK_BY_ID +  STATES.INIT
});
const getBookCompleted = (data) => ({
    type: FETCH_BOOK_BY_ID +  STATES.SUCCESS,
    payload : data
});
const getBookFailed = (reason) => ({
    type: FETCH_BOOK_BY_ID +  STATES.FAILED,
    payload : reason
});


const startSendingBook = () => ({
    type: SEND_BOOK +  STATES.INIT
});
const sendBookSuccess = () => ({
    type: SEND_BOOK +  STATES.SUCCESS
});
const sendBookFailed = (reason) => ({
    type: SEND_BOOK +  STATES.FAILED,
    payload : reason
});


const startDeletingBook = () => ({
    type: DELETE_BOOK +  STATES.INIT
});
const deleteBookSuccess = () => ({
    type: DELETE_BOOK +  STATES.SUCCESS
});
const deleteBookFailed = (reason) => ({
    type: DELETE_BOOK +  STATES.FAILED,
    payload : reason
});
export const deleteBookClear = () => ({
    type: DELETE_BOOK +  STATES.CLEAR
});

