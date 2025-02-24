import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE, EDIT_COURSE, 
    USER_LOADED, STUDENT_ADD_COURSE, ERROR, REMOVE_ERROR, LOG_OUT, LOG_IN, CHANGE_CONTENT_TYPE, SET_LOADING, 
    REMOVE_LOADING, ADD_LECTURE, SET_COMPONENT_LOADING, REMOVE_COMPONENT_LOADING, ADD_QUIZ, SET_ANSWER, 
    REMOVE_ANSWERS, SET_CORRECT_ANSWER, REMOVE_ANSWER, SET_LIVE_LECTURE, EDIT_LECTURE, DELETE_LECTURE, EDIT_QUIZ, 
    DELETE_QUIZ, EDIT_USER } 
from "../constants/action-types";
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
        for (let i=0; i<array.length; i++){
            if(array[i].lectureId === target.lectureId){
                return i
            }
        }
    }
    return -1;
    
}
const initialState ={
    loadingCount:0, 
    loading: true, 
    cLoadingCount:0, 
    cLoading:false,
    loggedIn: services.isLoggedIn(),
    live: false //remember to change this when u have socket setup
}
function rootReducer(state = initialState, action){
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
        if (state.course){
            targetCourse.lectures = state.course.lectures.slice()
            return Object.assign({}, state, {
                courses: newCourses,
                course: targetCourse
            })
        }
        return Object.assign({}, state, {
            courses: newCourses
        })
    }
    if(action.type === USER_LOADED || action.type === EDIT_USER){
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
        return {
            loadingCount:0, 
            loading: false, 
            cLoadingCount:0, 
            cLoading:false,
            loggedIn: services.isLoggedIn(),
            live: false //remember to change this when u have socket setup
        }
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
        if(count<0){
            count = 0
        }
        return Object.assign({}, state, {
            loadingCount: count,
            loading: count !== 0
        })
    }
    if(action.type === SET_COMPONENT_LOADING){
        return Object.assign({}, state, {
            cLoadingCount: state.cLoadingCount + 1,
            cLoading: true
        })
    }
    if(action.type === REMOVE_COMPONENT_LOADING){
        let count = state.cLoadingCount - 1;
        if(count<0){
            count = 0
        }
        return Object.assign({}, state, {
            cLoadingCount: count,
            cLoading: count !== 0
        })
    }
    if(action.type === ADD_LECTURE){
        let newLectures = state.course.lectures.slice();
        newLectures.splice(0,0,action.payload)
        
        return Object.assign({}, state, {
            course: {
                instructors: state.course.instructors,
                courseName: state.course.courseName,
                startTerm: state.course.startTerm,
                endTerm: state.course.endTerm,
                joinCode: state.course.joinCode,
                courseId: state.course.courseId,
                numberOfStudents: state.course.numberOfStudents,
                numberOfLectures: state.course.numberOfLectures + 1,
                lectures: newLectures
            }
        })

    }
    if(action.type === EDIT_LECTURE){
        let newLecture = action.payload
        let index = findIndex(state.course.lectures,newLecture, "lecture")
        let newLectures = state.courses.slice();
        newLectures.splice(index,1,newLecture)
        newLecture.quizzes = state.selectedLecture.quizzes
        return Object.assign({}, state, {
            course: {
                instructors: state.course.instructors,
                courseName: state.course.courseName,
                startTerm: state.course.startTerm,
                endTerm: state.course.endTerm,
                joinCode: state.course.joinCode,
                courseId: state.course.courseId,
                numberOfStudents: state.course.numberOfStudents,
                numberOfLectures: newLectures.length,
                lectures: newLectures
            },
            selectedLecture: newLecture
        })

    }
    if(action.type === DELETE_LECTURE){
        let newLecture = action.payload
        let index = findIndex(state.course.lectures,newLecture, "lecture")
        let newLectures = state.course.lectures.slice();
        newLectures.splice(index,1)
        return Object.assign({}, state, {
            course: {
                instructors: state.course.instructors,
                courseName: state.course.courseName,
                startTerm: state.course.startTerm,
                endTerm: state.course.endTerm,
                joinCode: state.course.joinCode,
                courseId: state.course.courseId,
                numberOfStudents: state.course.numberOfStudents,
                numberOfLectures: newLectures.length,
                lectures: newLectures
            },
            selectedLecture: null,
            contentType:"HOME"
        })
    }
    if(action.type === ADD_QUIZ){
        let newQuizzes = state.selectedLecture.quizzes.slice();
        newQuizzes.splice(newQuizzes.length,0,action.payload);
        
        return Object.assign({}, state, {
            selectedLecture:{
                date:state.selectedLecture.date,
                participationRewardPercentage:state.selectedLecture.participationRewardPercentage,
                courseId:state.selectedLecture.courseId,
                live:state.selectedLecture.live,
                hasLived:state.selectedLecture.hasLived,
                lectureId:state.selectedLecture.lectureId,
                attendanceNumber:state.selectedLecture.attendanceNumber,
                quizzes:newQuizzes
            }
        })
    }
    if(action.type === EDIT_QUIZ){
        let newQuizzes = state.selectedLecture.quizzes.slice();
        newQuizzes.splice(action.payload.quizIndex,1,action.payload.quiz);
        
        return Object.assign({}, state, {
            selectedLecture:{
                date:state.selectedLecture.date,
                participationRewardPercentage:state.selectedLecture.participationRewardPercentage,
                courseId:state.selectedLecture.courseId,
                live:state.selectedLecture.live,
                hasLived:state.selectedLecture.hasLived,
                lectureId:state.selectedLecture.lectureId,
                attendanceNumber:state.selectedLecture.attendanceNumber,
                quizzes:newQuizzes
            }
        })
    }
    if(action.type === DELETE_QUIZ){
        let newQuizzes = state.selectedLecture.quizzes.slice();
        newQuizzes.splice(action.payload.quizIndex,1);
        
        return Object.assign({}, state, {
            selectedLecture:{
                date:state.selectedLecture.date,
                participationRewardPercentage:state.selectedLecture.participationRewardPercentage,
                courseId:state.selectedLecture.courseId,
                live:state.selectedLecture.live,
                hasLived:state.selectedLecture.hasLived,
                lectureId:state.selectedLecture.lectureId,
                attendanceNumber:state.selectedLecture.attendanceNumber,
                quizzes:newQuizzes
            }
        })
    }
    if(action.type === SET_ANSWER){
        let index = action.payload.index
        let answer = action.payload.answer
        let newAnswers;
        if (state.answers){
            newAnswers = state.answers.slice();
            if (index < newAnswers.length){
                newAnswers.splice(index, 1, answer)
            }
            else{
                newAnswers.splice(newAnswers.length, 0, answer)
            }
        }
        else{
            newAnswers = [answer]
        }

        return Object.assign({}, state, {
            answers: newAnswers
        })
    }
    if(action.type === REMOVE_ANSWER){
        let newAnswers = state.answers.slice()
        newAnswers.splice(action.payload,1)
        let correctAnswer = state.correctAnswer
        if (action.payload === state.correctAnswer){
            correctAnswer = null
        }
        else if (state.correctAnswer === action.payload + 1){
            correctAnswer = correctAnswer -1
        }
        return Object.assign({}, state, {
            answers: newAnswers,
            correctAnswer: correctAnswer
        })
    }
    if(action.type ===  REMOVE_ANSWERS){
        return Object.assign({}, state, {
            answers: null,
            correctAnswer:null
        })
    }
    if(action.type === SET_CORRECT_ANSWER){
        return Object.assign({}, state, {
            correctAnswer: action.payload
        })
    }
    if(action.type === SET_LIVE_LECTURE){
        return Object.assign({}, state,{
            live: action.payload
        })
    }
    return state;
};

export default rootReducer;