import { COURSES_LOADED, COURSE_LOADED } from "../constants/action-types";

function rootReducer(state ={loading: true}, action){
    if (action.type === COURSES_LOADED){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        });
    }
    if (action.type === COURSE_LOADED){
        return Object.assign({},state,{
            course : action.payload,
            loading: false,
        })
        
    }
    return state;
};

export default rootReducer;