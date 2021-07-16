const FIND_BOOKS = 'FIND_BOOKS';
const UPDATE_SEARCHFIELD = 'UPDATE_SEARCHFIELD';


let initialState = {
    books: [],
    searchField: ''
}

const findReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_SEARCHFIELD: {
            return {
                ...state,
                searchField: action.body
            };
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                dialogsMessages: [ ...state.dialogsMessages, { id: 4, message: body}],
            };
        }
        default:
            return state;
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const updateNewMessageBodyAC = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default findReducer;