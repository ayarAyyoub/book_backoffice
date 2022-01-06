import { FETCH_BOOKS, STATES } from "../types.constants";


const initialState = {
    books:[],
    book : null,
    errors : null,
    totalPages :0,
    loading:false
}


export default function(state = initialState, action){

    switch(action.type){
        case FETCH_BOOKS + STATES.INIT:
            return {
                ...state,
                books : [],
                loading: true,
                errors : null
            }
        case FETCH_BOOKS +  STATES.SUCCESS :
            return {
                ...state,
                books : action.payload.list,
                totalPages:action.payload.pagesCount,
                loading: false,
                errors : null
            }
        case FETCH_BOOKS + STATES.FAILED :
            return {
                ...state,
                books : [],
                loading: false,
                errors : action.payload
            }
        case FETCH_BOOKS + STATES.CLEAR  :
            return {
                ...state,
                books : [],
                loading: false,
                errors : null,
                totalPages:0
            }
        default :
            return state;
    }
}