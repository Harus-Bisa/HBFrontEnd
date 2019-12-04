import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR, LOG_IN, LOG_OUT, CHANGE_CONTENT_TYPE, SET_LOADING, REMOVE_LOADING, ADD_LECTURE, SET_COMPONENT_LOADING, REMOVE_COMPONENT_LOADING, ADD_QUIZ, SET_ANSWER, REMOVE_ANSWERS, SET_CORRECT_ANSWER, REMOVE_ANSWER, SET_LIVE_LECTURE, EDIT_LECTURE } from "../constants/action-types";
import services from "../../Services";

export function getCourses(role){
    return async function(dispatch){
        dispatch({type:SET_LOADING})
        return await services.getCourses(role)
        .then(async response =>{
            await dispatch({type:COURSES_LOADED, payload:response})
            dispatch({type:REMOVE_LOADING})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function getCourse(courseId,role){
    return async function(dispatch){
        dispatch({type:SET_LOADING})
        return await services.getCourse(courseId,role)
        .then(async response => {
            await dispatch({type:COURSE_LOADED, payload: response})
            dispatch({type:REMOVE_LOADING})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}


export function changeSelectedLecture(selectedLecture, lectureId, role){
    return async function(dispatch){
        dispatch({type:SET_COMPONENT_LOADING})
        return await services.getQuizzes(lectureId, role)
        .then(async response =>{
            selectedLecture.quizzes = response
            await dispatch({type: CHANGE_SELECTED_LECTURE, payload: selectedLecture})
            dispatch({type:REMOVE_COMPONENT_LOADING})
            dispatch({type:REMOVE_ERROR})
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
            dispatch({type:REMOVE_LOADING})
        })
    }
}

export function addCourse(name, startDate, endDate, role){
    return async function(dispatch){
        dispatch({type:SET_COMPONENT_LOADING})
        return await services.addCourse(name, startDate, endDate, role)
        .then(async response => {
            await dispatch({type: ADD_COURSE, payload: response})
            dispatch({type:REMOVE_COMPONENT_LOADING})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function deleteCourse(courseId,role){
    return async function(dispatch){
        return await services.deleteCourse(courseId,role)
        .then(async response =>{
            await dispatch({type:DELETE_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function editCourse(courseId, name, startDate, endDate, role){
    return async function(dispatch){
        return await services.editCourse(courseId, name, startDate, endDate, role)
        .then(async response => {
            await dispatch({type:EDIT_COURSE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}

export function getUser(userId){
    return async function(dispatch){
        dispatch({type:SET_LOADING})
        return await services.getUser(userId)
        .then(async response =>{
            await dispatch({type: USER_LOADED, payload: response})
            dispatch({type:REMOVE_LOADING})
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

export function addLecture(date, lectureDescription, participationRewardPercentage, courseId, role){
    return async function(dispatch){
        return await services.addLecture(date, lectureDescription, participationRewardPercentage, courseId, role)
        .then(async response => {
            await dispatch({type: ADD_LECTURE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}
export function editLecture(date, lectureDescription, participationRewardPercentage, courseId, lectureId, role){
    return async function(dispatch){
        return await services.editLecture(date, lectureDescription, participationRewardPercentage, courseId,lectureId, role)
        .then(async response => {
            await dispatch({type: EDIT_LECTURE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
        })
    }
}
export function addQuiz(lectureId, question, answerOptions, correctAnswerIndex, duration, pointWorth){
    return async function(dispatch){
        dispatch({type:SET_COMPONENT_LOADING})
        return await services.addQuiz(lectureId, question, answerOptions, correctAnswerIndex, duration, pointWorth)
        .then(async response =>{
            await dispatch({type: ADD_QUIZ, payload: response})
            dispatch({type:REMOVE_COMPONENT_LOADING})
            dispatch(removeAnwers())
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch({type:ERROR, payload: error})
            dispatch({type:REMOVE_COMPONENT_LOADING})
        })
    }
}

export function setAnswer(index, answer){
    return {type:SET_ANSWER, payload:{index:index, answer:answer}}
}
export function removeAnswer(index){
    return {type:REMOVE_ANSWER, payload:index}
}
export function removeAnwers(){
    return {type:REMOVE_ANSWERS}
}

export function setCorrectAnswer(correctAnswer){
    return {type:SET_CORRECT_ANSWER, payload: correctAnswer}
}
export function setLiveLecture(live){
    return {type:SET_LIVE_LECTURE, payload: live}
}