import apiConfig from '../../configs/api.config';
import {DELETE_AUTHOR, FETCH_AUTHORS, FETCH_AUTHOR_BY_ID, SEND_AUTHOR, STATES} from '../types'

const RESOURCE_API = "/api/authors";

export const deleteAuthor = (id) => async dispatch => {
    dispatch(startDeletingAuthor()); 
    try{
        await apiConfig.delete(`${RESOURCE_API}/${id}`);
         
        dispatch( deleteAuthorSuccess());
    }
    catch(error){ 
        dispatch( deleteAuthorFailed(error.response.data.errors));
    }
}


export const persistAuthor = (author, action) => async dispatch => {
    dispatch(startSendingAuthor()); 
    try{
        const res = (action === 'POST')? await apiConfig.post(`${RESOURCE_API}`,  author ) 
                                        : await apiConfig.put(`${RESOURCE_API}`,  author );
         
        dispatch( sendAuthorSuccess(res.data ));
    }
    catch(error){ 
        dispatch( sendAuthorFailed(error.response.data.errors));
    }
}

export const getAuthor = (id) => async dispatch => {
    dispatch(startGetAuthor()); 
    try{
        const res = await apiConfig.get(`${RESOURCE_API}/${id}`);
     
        dispatch( getAuthorCompleted(res.data ));
    }
    catch(error){
        dispatch( getAuthorFailed(error));
    }
}


export const getAuthors = (page, size) => async dispatch => {
    dispatch(startGetAuthors()); 
    try{
        const params = new URLSearchParams([['page', page],['size', size]]);
        const res = await apiConfig.get(`${RESOURCE_API}`,{ params });
     
        dispatch( getAuthorsCompleted({pagesCount : res.headers["total-pages"],list : res.data}) );
    }
    catch(error){
        dispatch( getAuthorsFailed(error));
    }
}



export const getAuthorsClear = () => ({
    type: FETCH_AUTHORS +  STATES.CLEAR
});
const startGetAuthors = () => ({
    type: FETCH_AUTHORS +  STATES.INIT
});
const getAuthorsCompleted = (data) => ({
    type: FETCH_AUTHORS +  STATES.SUCCESS,
    payload : data
});
const getAuthorsFailed = (reason) => ({
    type: FETCH_AUTHORS +  STATES.FAILED,
    payload : reason
});


export const getAuthorClear = () => ({
    type: FETCH_AUTHOR_BY_ID +  STATES.CLEAR
});
const startGetAuthor = () => ({
    type: FETCH_AUTHOR_BY_ID +  STATES.INIT
});
const getAuthorCompleted = (data) => ({
    type: FETCH_AUTHOR_BY_ID +  STATES.SUCCESS,
    payload : data
});
const getAuthorFailed = (reason) => ({
    type: FETCH_AUTHOR_BY_ID +  STATES.FAILED,
    payload : reason
});


const startSendingAuthor = () => ({
    type: SEND_AUTHOR +  STATES.INIT
});
const sendAuthorSuccess = () => ({
    type: SEND_AUTHOR +  STATES.SUCCESS
});
const sendAuthorFailed = (reason) => ({
    type: SEND_AUTHOR +  STATES.FAILED,
    payload : reason
});


const startDeletingAuthor = () => ({
    type: DELETE_AUTHOR +  STATES.INIT
});
const deleteAuthorSuccess = () => ({
    type: DELETE_AUTHOR +  STATES.SUCCESS
});
const deleteAuthorFailed = (reason) => ({
    type: DELETE_AUTHOR +  STATES.FAILED,
    payload : reason
});
export const deleteAuthorClear = () => ({
    type: DELETE_AUTHOR +  STATES.CLEAR
});

