import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE } from "../constants/action-types";

function rootReducer(state ={loading: true}, action){
    if (action.type === COURSES_LOADED){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        });
    }
    if (action.type === COURSE_LOADED){
        var lecture = action.payload.lectures.length === 0 ? null: action.payload.lectures[0]
        return Object.assign({},state,{
            course : action.payload,
            loading: false,
            selectedLecture: lecture
        })   
    }
    if (action.type === CHANGE_SELECTED_LECTURE){
        return Object.assign({}, state, {
            selectedLecture: action.payload
        })
    }
    return state;
};

export default rootReducer;