import {useContext} from 'react';
import {QuizContext} from '../../context/quiz-context';
import {Clock} from "./clock";
import "./footer.css";

export const Footer = ()=> {
    const { dispatch, answer, index, questions, points} = useContext(QuizContext);
    return (
        <footer className="d-flex justify-content-between align-items-center">
            <Clock />
            {answer !== null && index < questions.length-1 && (
            <button className="btn-secondery"
            onClick={()=> dispatch({type: "NEXT_QUESTION"})}
            >
            Next
            </button>
            )}
            {answer !== null && index === questions.length-1 && (
                <button className="btn-secondery"
                onClick={()=> {
                    dispatch({type: "FINISH"});
                    alert(`Your final score is ${points}!`);
                }}
                >
                    Finish
                </button>
            )} 
        </footer>
    );
    
};