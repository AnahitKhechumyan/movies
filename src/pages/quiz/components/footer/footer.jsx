import {useContext, useEffect} from 'react';
import {QuizContext} from '../../context/quiz-context';
import "./footer.css";

const getCorrectFormat = (sec)=> {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return (
        <span>
            {minutes < 10 && "0"}
            {minutes}: {seconds < 10 && "0"}
            {seconds}
        </span>
    );
};

export const Footer = ()=> {
    const { dispatch, answer, index,secondsRemaining, questions, points} = useContext(QuizContext);
   useEffect(()=>{
      const id = setInterval(()=> {
        dispatch({type: "TICK"});
      },1000);
      return ()=>clearInterval(id);
   },[dispatch]);

   const timer = getCorrectFormat(secondsRemaining);
   
    return (
        <footer className="d-flex justify-content-between align-items-center">
            <h5>{timer}</h5> 
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
                }}
                >
                    Finish
                </button>
            )} 
        </footer>
    );
    
};