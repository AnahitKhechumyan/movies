import "./active-quiz.css";

export const ActiveQuiz = ()=> {
    return (
        <div className="active-quiz">
            <div className="question">
                <div className="ml-2">0</div>
                <input type="range" className="range"/>
                 <div className="ml-2">300</div>
            </div>
                 <h5>Question 1/30</h5>
                 <h3>Question 1</h3>
                 <input type="text" value="answer1"/> 
                 <input type="text" value="answer2"/>
                 <input type="text" value="answer3"/>
                 <input type="text" value="answer4"/>
                 <button type="submit" className="btn btn-secondary">Next</button>
        </div>
    );
};