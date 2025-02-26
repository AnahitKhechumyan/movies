import {useContext, useMemo} from "react";
import {QuizContext} from "../../context/quiz-context";
import "./finish-screen.css";

const getEmojiIcon = (persentage)=> {
    let emoji;
    if (persentage === 100) emoji = "🥇";
    if (persentage >= 80 && persentage < 100) emoji = "🎉";
    if (persentage >= 50 && persentage < 80) emoji = "🥰 ";
    if (persentage > 0 && persentage < 50) emoji = "😃 ";
    if (persentage === 0) emoji = "😔 ";

    return emoji;
};
export const FinishScreen = ()=>{
    const {points,maxPossiblePoints, dispatch} = useContext(QuizContext);
    const emoji = useMemo(()=>{
        return getEmojiIcon((points / maxPossiblePoints) * 100);
    },[maxPossiblePoints,points]);

    return(
        <div className="result d-flex align-items-center justify-content-center">
            <p>
                <span>
                    <span>{emoji}</span>Your Score is {points} out of {maxPossiblePoints}!
                </span>
            </p>
            <button
            className="btn-restart btn-secondery"
            onClick={()=> dispatch({type:"RESTART"})}
            >
                Restart Quiz
            </button>
        </div>
    );
};