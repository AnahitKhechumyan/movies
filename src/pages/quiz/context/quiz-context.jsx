import { createContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  questions: [],
  maxPossiblePoints:0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      const maxPossiblePoints = action.payload.reduce((prev,cur)=> {
        return prev + cur.points;
    },0);
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        maxPossiblePoints,
      };

    case "DATA_FAILED":
      return {
        ...state,
        status: "error",
      };
    case "START":
      return {
        ...state,
        status: "active",
        secondsRemaining:state.questions.length * 30,
      };
      case "NEW_ANSWER":
        const question = state.questions[state.index];
        const newPoints = 
           action.payload === question.correctOption 
           ? state.points + question.points
           : state.points;
        return {
          ...state,
          answer: action.payload,
          points: newPoints,
        };
      case "NEXT_QUESTION":
        return {
          ...state,
          answer: null,
          index: state.index + 1,
        };
        case "FINISH":
          return {
            ...state,
            status: "finished",
            };
        case "RESTART":
          return {
            ...initialState,
            questions: state.questions,
            status: "ready",
          };
          case "TICK":
          return {
            ...state,
            secondsRemaining: state.secondsRemaining-1,
            status: state.secondsRemaining === 0 ? "finished" : state.status
          };
               
    default:
      throw new Error("Something went wrong!");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <QuizContext.Provider
      value={{
        ...state,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };