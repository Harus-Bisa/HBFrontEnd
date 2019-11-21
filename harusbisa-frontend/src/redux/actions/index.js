import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR, LOG_IN, LOG_OUT, CHANGE_CONTENT_TYPE } from "../constants/action-types";
import services from "../../Services";

export function getCourses(){
    return async function(dispatch){
        return await services.getCourses()
        .then(async response =>{
            await dispatch({type:COURSES_LOADED, payload:response})
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function getLectures(courseId){
    return async function(dispatch){
        return await services.getLectures(courseId)
        .then(async response => {
            await dispatch({type:COURSE_LOADED, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function changeSelectedLecture(payload){
    return{type: CHANGE_SELECTED_LECTURE, payload:payload}
}

export function addCourse(name, startDate, endDate){
    return async function(dispatch){
        return await services.addCourse(name, startDate, endDate)
        .then(async response => {
            await dispatch({type: ADD_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function deleteCourse(courseId){
    return async function(dispatch){
        return await services.deleteCourse(courseId)
        .then(async response =>{
            await dispatch({type:DELETE_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function editCourse(courseId, name, startDate, endDate){
    return async function(dispatch){
        return await services.editCourse(courseId, name, startDate, endDate)
        .then(async response => {
            await dispatch({type:EDIT_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function getUser(){
    return async function(dispatch){
        return await services.getUser()
        .then(async response =>{
            await dispatch({type: USER_LOADED, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function studentAddCourse(joinCode){
    return async function(dispatch){
        return await services.studentAddCourse(joinCode)
        .then(async response =>{
            await dispatch({type:STUDENT_ADD_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function removeError(){
    return{type: REMOVE_ERROR}
}

export function login(email, password){
    return async function(dispatch){
        return await services.login(email, password)
        .then(async response => {
            await dispatch({type: LOG_IN, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function logout(){
    return async function(dispatch){
        services.logout()
        return dispatch({type: LOG_OUT})
    }
}

export function changeContentType(contentType){
    return {type:CHANGE_CONTENT_TYPE, payload:contentType}
}