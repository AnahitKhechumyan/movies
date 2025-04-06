import {useContext} from 'react';
import { QuizContext } from '../../context/quiz-context';
import { Options } from './options';
import "./questions.css";

export const Questions = ()=> { 
    const ctx = useContext(QuizContext);
    const question = ctx.questions[ctx.index];  
    return(
     <div> 
        <h4>{question.question}</h4>
        <Options question={question}/>
     </div>
    );
};
 