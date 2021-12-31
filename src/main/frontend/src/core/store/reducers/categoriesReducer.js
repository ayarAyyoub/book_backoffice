import {DELETE_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORY_BY_ID, SEND_CATEGORY, STATES} from '../types'

const initialState = {
    list:[],
    category : null,
    errors : null,
    totalPages :0,
    loading:false,
    sending : false,
    sended : false,
    deleted : false,
    deleting: false
}

export default function(state = initialState, action){

    switch(action.type){
        case FETCH_CATEGORIES + STATES.SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                totalPages: action.payload.pagesCount,
                errors : null,
                loading:false
            }
        case FETCH_CATEGORIES + STATES.INIT:
            return {
                ...state,
                list:[],
                totalPages: 0,
                errors : null,
                loading: true
            }
        case FETCH_CATEGORIES + STATES.FAILED:
            return {
                ...state,
                list:[],
                errors : action.payload,
                totalPages: 0,
                loading:false
            }
        case FETCH_CATEGORIES + STATES.CLEAR:
            return {
                ...state, 
                errors : null,
                totalPages: 0,
                loading: false
            }

        case FETCH_CATEGORY_BY_ID + STATES.SUCCESS:
            return {
                ...state,
                category : action.payload,
                errors : null,
                loading:false
            }

        case FETCH_CATEGORY_BY_ID + STATES.INIT:
            return {
                ...state,
                category : null,
                errors : null,
                loading: true
            }
        case FETCH_CATEGORY_BY_ID + STATES.FAILED:
            return {
                ...state,
                category : null,
                errors : action.payload,
           
                loading:false
            }
        case FETCH_CATEGORY_BY_ID + STATES.CLEAR:
            return {
                ...state,
                category : null,
                errors : null,
                loading: false,
                sended: false,
                sending:false
            }
        case SEND_CATEGORY + STATES.INIT:
            return {
                ...state,
                sending : true,
                sended : false,
                errors : null
            }
        case SEND_CATEGORY + STATES.SUCCESS:
            return {
                ...state,
                sending : false,
                sended : true,
                errors : null
            }
        case SEND_CATEGORY + STATES.FAILED:
            return {
                ...state,
                sending : false,
                sended : false,
                errors : action.payload
            }

        case DELETE_CATEGORY + STATES.CLEAR:
            return {
                ...state,
                deleted : false,
                deleting : false,
                errors : null
            }

        case DELETE_CATEGORY + STATES.INIT:
            return {
                ...state,
                deleted : false,
                deleting : true,
                errors : null
            }
        case DELETE_CATEGORY + STATES.SUCCESS:
            return {
                ...state,
                deleted : true,
                deleting : false,
                errors : null
            }
        case DELETE_CATEGORY + STATES.FAILED:
            return {
                ...state,
                sending : false,
                sended : false,
                errors : action.payload
            }
        default:
            return state;
    }

}