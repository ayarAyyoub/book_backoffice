import { FETCH_BOOKS, STATES } from "../types.constants";
import apiConfig from "../../configs/api.config"; 
import globalConstants from "../../constants/globalConstants";
 

const RESOURCE_API = "/api/books"
 
export const getBooks = (page, size) => async dispatch => {
    dispatch(startGetBooks()); 
  
    try{
        const params = new URLSearchParams([['page', page],['size', size]]);
        const res = await apiConfig.get(`${globalConstants.apiUrl}${RESOURCE_API}`,{ params }); 
 
        dispatch( getBooksCompleted({pagesCount : res.headers["total-pages"],list : res.data}) );
         
    }
    catch(error){ 
        dispatch( getBooksFailed(error)); 
    }
}

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
export const getBooksClear = () => ({
    type: FETCH_BOOKS +  STATES.CLEAR
});