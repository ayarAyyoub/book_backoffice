import apiConfig from '../../configs/api.config';
import {  DELETE_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORY_BY_ID, SEND_CATEGORY, STATES } from '../types'

const RESOURCE_API = "/api/categories";

export const deleteCategory = (id) => async dispatch => {
    dispatch(startDeletingCategory()); 
    try{
        await apiConfig.delete(`${RESOURCE_API}/${id}`);
         
        dispatch( deleteCategorySuccess());
    }
    catch(error){ 
        dispatch( deleteCategoryFailed(error.response.data.errors));
    }
}


export const persistCategory = (category, action) => async dispatch => {
    dispatch(startSendingCategory()); 
    try{
        const res = (action === 'POST')? await apiConfig.post(`${RESOURCE_API}`,  category ) 
                                        : await apiConfig.put(`${RESOURCE_API}`,  category );
         
        dispatch( sendCategorySuccess(res.data ));
    }
    catch(error){ 
        dispatch( sendCategoryFailed(error.response.data.errors));
    }
}

export const getCategory = (id) => async dispatch => {
    dispatch(startGetCategory()); 
    try{
        const res = await apiConfig.get(`${RESOURCE_API}/${id}`);
     
        dispatch( getCategoryCompleted(res.data ));
    }
    catch(error){
        dispatch( getCategoryFailed(error));
    }
}


export const getCategories = (page, size) => async dispatch => {
    dispatch(startGetCategories()); 
    try{
        const params = new URLSearchParams([['page', page],['size', size]]);
        const res = await apiConfig.get(`${RESOURCE_API}`,{ params });
      
        dispatch( getCategoriesCompleted({pagesCount : res.headers["total-pages"],list : res.data}) );
    }
    catch(error){
        dispatch( getCategoriesFailed(error));
    }
}



export const getCategoriesClear = () => ({
    type: FETCH_CATEGORIES +  STATES.CLEAR
});
const startGetCategories = () => ({
    type: FETCH_CATEGORIES +  STATES.INIT
});
const getCategoriesCompleted = (data) => ({
    type: FETCH_CATEGORIES +  STATES.SUCCESS,
    payload : data
});
const getCategoriesFailed = (reason) => ({
    type: FETCH_CATEGORIES +  STATES.FAILED,
    payload : reason
});


export const getCategoryClear = () => ({
    type: FETCH_CATEGORY_BY_ID +  STATES.CLEAR
});
const startGetCategory = () => ({
    type: FETCH_CATEGORY_BY_ID +  STATES.INIT
});
const getCategoryCompleted = (data) => ({
    type: FETCH_CATEGORY_BY_ID +  STATES.SUCCESS,
    payload : data
});
const getCategoryFailed = (reason) => ({
    type: FETCH_CATEGORY_BY_ID +  STATES.FAILED,
    payload : reason
});


const startSendingCategory = () => ({
    type: SEND_CATEGORY +  STATES.INIT
});
const sendCategorySuccess = () => ({
    type: SEND_CATEGORY +  STATES.SUCCESS
});
const sendCategoryFailed = (reason) => ({
    type: SEND_CATEGORY +  STATES.FAILED,
    payload : reason
});


const startDeletingCategory = () => ({
    type: DELETE_CATEGORY +  STATES.INIT
});
const deleteCategorySuccess = () => ({
    type: DELETE_CATEGORY +  STATES.SUCCESS
});
const deleteCategoryFailed = (reason) => ({
    type: DELETE_CATEGORY +  STATES.FAILED,
    payload : reason
});
export const deleteCategoryClear = () => ({
    type: DELETE_CATEGORY +  STATES.CLEAR
});

