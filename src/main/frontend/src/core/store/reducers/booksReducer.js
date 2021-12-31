import { DELETE_BOOK, FETCH_BOOKS, FETCH_BOOK_BY_ID, SEND_BOOK, STATES} from '../types'

const initialState = {
    list:[],
    book : null,
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
        case FETCH_BOOKS + STATES.SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                totalPages: action.payload.pagesCount,
                errors : null,
                loading:false
            }
        case FETCH_BOOKS + STATES.INIT:
            return {
                ...state,
                list:[],
                totalPages: 0,
                errors : null,
                loading: true
            }
        case FETCH_BOOKS + STATES.FAILED:
            return {
                ...state,
                list:[],
                errors : action.payload,
                totalPages: 0,
                loading:false
            }
        case FETCH_BOOKS + STATES.CLEAR:
            return {
                ...state,
                list:[],
                errors : null,
                totalPages: 0,
                loading: false
            }

        case FETCH_BOOK_BY_ID + STATES.SUCCESS:
            return {
                ...state,
                book : action.payload,
                errors : null,
                loading:false
            }

        case FETCH_BOOK_BY_ID + STATES.INIT:
            return {
                ...state,
                book : null,
                errors : null,
                loading: true
            }
        case FETCH_BOOK_BY_ID + STATES.FAILED:
            return {
                ...state,
                book : null,
                errors : action.payload,
           
                loading:false
            }
        case FETCH_BOOK_BY_ID + STATES.CLEAR:
            return {
                ...state,
                book : null,
                errors : null,
                loading: false,
                sended: false,
                sending:false
            }
        case SEND_BOOK + STATES.INIT:
            return {
                ...state,
                sending : true,
                sended : false,
                errors : null
            }
        case SEND_BOOK + STATES.SUCCESS:
            return {
                ...state,
                sending : false,
                sended : true,
                errors : null
            }
        case SEND_BOOK + STATES.FAILED:
            return {
                ...state,
                sending : false,
                sended : false,
                errors : action.payload
            }

        case DELETE_BOOK + STATES.CLEAR:
            return {
                ...state,
                deleted : false,
                deleting : false,
                errors : null
            }

        case DELETE_BOOK + STATES.INIT:
            return {
                ...state,
                deleted : false,
                deleting : true,
                errors : null
            }
        case DELETE_BOOK + STATES.SUCCESS:
            return {
                ...state,
                deleted : true,
                deleting : false,
                errors : null
            }
        case DELETE_BOOK + STATES.FAILED:
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