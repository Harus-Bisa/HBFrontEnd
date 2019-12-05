import React from "react";
import QuizTypeForm from "./QuizTypeForm";
import MultipleChoiceQuizForm from "./MultipleChoiceQuizForm";

export const MULTIPLE_CHOICE = "MULTIPLE_CHOICE";

function QuizForm(props){
    const [quizType, setQuizType] = React.useState(null);
    const handleChange = (type) => {
        setQuizType(type)
    }
    return(
        <div>
            {!quizType && <QuizTypeForm changeQuizType={handleChange}/>}
            {quizType === MULTIPLE_CHOICE && <MultipleChoiceQuizForm changeQuizType={handleChange}/>}
        </div>
    )
}

export default QuizForm;