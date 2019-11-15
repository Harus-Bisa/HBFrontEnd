import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR } from "../constants/action-types";

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
    if (action.type === ADD_COURSE){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        });
    }
    if (action.type === DELETE_COURSE){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        })
    }
    if(action.type === EDIT_COURSE){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false
        })
    }
    if(action.type === USER_LOADED){
        return Object.assign({}, state, {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            role: action.payload.role
        })
    }
    if (action.type === STUDENT_ADD_COURSE){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        }); 
    }
    if(action.type === ERROR){
        return Object.assign({}, state, {
            error: action.payload
        })
    }
    if(action.type === REMOVE_ERROR){
        return Object.assign({}, state, {
            error: null
        })
    }
    return state;
};

export default rootReducer;