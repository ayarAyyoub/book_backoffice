import {DELETE_AUTHOR, FETCH_AUTHORS, FETCH_AUTHOR_BY_ID, SEND_AUTHOR, STATES} from '../types'

const initialState = {
    list:[],
    author : null,
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
        case FETCH_AUTHORS + STATES.SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                totalPages: action.payload.pagesCount,
                errors : null,
                loading:false
            }
        case FETCH_AUTHORS + STATES.INIT:
            return {
                ...state,
                list:[],
                totalPages: 0,
                errors : null,
                loading: true
            }
        case FETCH_AUTHORS + STATES.FAILED:
            return {
                ...state,
                list:[],
                errors : action.payload,
                totalPages: 0,
                loading:false
            }
        case FETCH_AUTHORS + STATES.CLEAR:
            return {
                ...state,
                list:[],
                errors : null,
                totalPages: 0,
                loading: false
            }

        case FETCH_AUTHOR_BY_ID + STATES.SUCCESS:
            return {
                ...state,
                author : action.payload,
                errors : null,
                loading:false
            }

        case FETCH_AUTHOR_BY_ID + STATES.INIT:
            return {
                ...state,
                author : null,
                errors : null,
                loading: true
            }
        case FETCH_AUTHOR_BY_ID + STATES.FAILED:
            return {
                ...state,
                author : null,
                errors : action.payload,
           
                loading:false
            }
        case FETCH_AUTHOR_BY_ID + STATES.CLEAR:
            return {
                ...state,
                author : null,
                errors : null,
                loading: false,
                sended: false,
                sending:false
            }
        case SEND_AUTHOR + STATES.INIT:
            return {
                ...state,
                sending : true,
                sended : false,
                errors : null
            }
        case SEND_AUTHOR + STATES.SUCCESS:
            return {
                ...state,
                sending : false,
                sended : true,
                errors : null
            }
        case SEND_AUTHOR + STATES.FAILED:
            return {
                ...state,
                sending : false,
                sended : false,
                errors : action.payload
            }

        case DELETE_AUTHOR + STATES.CLEAR:
            return {
                ...state,
                deleted : false,
                deleting : false,
                errors : null
            }

        case DELETE_AUTHOR + STATES.INIT:
            return {
                ...state,
                deleted : false,
                deleting : true,
                errors : null
            }
        case DELETE_AUTHOR + STATES.SUCCESS:
            return {
                ...state,
                deleted : true,
                deleting : false,
                errors : null
            }
        case DELETE_AUTHOR + STATES.FAILED:
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