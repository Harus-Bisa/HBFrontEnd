import { COURSES_LOADED } from "../constants/action-types";

function rootReducer(state, action){
    if (action.type === COURSES_LOADED){
        var o = Object.assign({}, state, {
            data: action.payload
        });
        return o;
    }
    return state;
};

export default rootReducer;