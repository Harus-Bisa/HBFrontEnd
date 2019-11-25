import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR, LOG_OUT, LOG_IN, CHANGE_CONTENT_TYPE } from "../constants/action-types";
import services from "../../Services";

function rootReducer(state ={loading: true, loggedIn: services.isLoggedIn()}, action){
    if (action.type === COURSES_LOADED){
        return Object.assign({}, state, {
            courses: action.payload,
            loading: false,
        });
    }
    if (action.type === COURSE_LOADED){
        // var lecture = action.payload.lectures.length === 0 ? null: action.payload.lectures[0]
        return Object.assign({},state,{
            course : action.payload,
            // selectedLecture: lecture
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
            role: action.payload.role,
            email: action.payload.email,
            school: action.payload.school,
            userId: action.payload.userId
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
    if(action.type === LOG_OUT){
        return Object.assign({}, state, {
            loggedIn: false,
        })
    }
    if(action.type === LOG_IN){
        return Object.assign({}, state, {
            loggedIn: true,
            role: action.payload.role,
            userId: action.payload.userId
        })
    }
    if(action.type === CHANGE_CONTENT_TYPE){
        return Object.assign({}, state, {
            contentType: action.payload
        })
    }
    return state;
};

export default rootReducer;