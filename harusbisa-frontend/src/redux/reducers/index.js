import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR, LOG_OUT, LOG_IN, CHANGE_CONTENT_TYPE, SET_LOADING, REMOVE_LOADING } from "../constants/action-types";
import services from "../../Services";

function findIndex(array, target, type){
    if(type === "course"){
        for (let i=0; i<array.length; i++){
            if(array[i].courseId === target.courseId){
                return i
            }
        }
    }
    else if (type === "lecture"){
        return -1;
    }
    return -1;
    
}
function rootReducer(state ={loadingCount:0, loading: true, loggedIn: services.isLoggedIn()}, action){
    if (action.type === COURSES_LOADED){
        return Object.assign({}, state, {
            courses: action.payload,
        
        });
    }
    if (action.type === COURSE_LOADED){
        return Object.assign({},state,{
            course : action.payload
        })   
    }
    if (action.type === CHANGE_SELECTED_LECTURE){
        return Object.assign({}, state, {
            selectedLecture: action.payload
        })
    }
    if (action.type === ADD_COURSE){
        let newCourses = state.courses.slice();
        newCourses.splice(0,0,action.payload)

        return Object.assign({}, state, {
            courses: newCourses
        });
    }
    if (action.type === DELETE_COURSE){
        let targetCourse = action.payload
        let index = findIndex(state.courses,targetCourse, "course")
        let newCourses = state.courses.slice();
        newCourses.splice(index, 1)

        return Object.assign({}, state, {
            courses: newCourses
        })
    }
    if(action.type === EDIT_COURSE){
        let targetCourse = action.payload;
        let index = findIndex(state.courses, targetCourse, "course")
        let newCourses = state.courses.slice();
        newCourses[index] = targetCourse
        return Object.assign({}, state, {
            courses: newCourses
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
        let newCourses = state.courses.slice();
        newCourses.splice(0,0,action.payload)
        
        return Object.assign({}, state, {
            courses: newCourses,
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
    if(action.type === SET_LOADING){
        return Object.assign({}, state, {
            loadingCount: state.loadingCount + 1,
            loading: true
        })
    }
    if(action.type === REMOVE_LOADING){
        let count = state.loadingCount - 1;
        return Object.assign({}, state, {
            loadingCount: count,
            loading: count !== 0
        })
    }
    return state;
};

export default rootReducer;