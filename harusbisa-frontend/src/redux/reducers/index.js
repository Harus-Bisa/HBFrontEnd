import { COURSES_LOADED, LECTURES_LOADED } from "../constants/action-types";

function rootReducer(state, action){
    if (action.type === COURSES_LOADED){
        return Object.assign({}, state, {
            courses: action.payload
        });
    }
    if (action.type === LECTURES_LOADED){
        var courseId = action.payload._id;
        // var courses = state.courses;
        console.log(state)
        return Object.assign({},state,{
            response : action.payload
        })
        
    }
    return state;
};

export default rootReducer;