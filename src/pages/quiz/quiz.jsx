import { useContext, useEffect } from "react";
import { QuizProvider, QuizContext } from "./context/quiz-context";
import { quizApi } from "../../api/quiz.api"; import { Loading } from "./components/loading/loading";
import { Error } from "./components/error/error";
import { StartScreen } from "./components/start-screen/start-screen";
import { Progress } from "./components/proggress/proggress";
import { Questions } from "./components/questions/questions";
import { Footer } from "./components/footer/footer";
import { FinishScreen } from "./components/finish-screen/finish-screen";

const QuizApp = () => {
  const { status, dispatch } = useContext(QuizContext);

  useEffect(() => {
    quizApi.getQuestions().then((response) => {
      if (response.success) {
        dispatch({ type: "DATA_RECEIVED", payload: response.data });
      } else {
        dispatch({ type: "DATA_FAILED" });
      }
    });
  }, []);

  return (
    <div className="quiz-game mt-4">
      <main className="main">
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && <>
        <Progress />
        <Questions />
        <Footer />
        </>
        }
        {status === "finished" && <FinishScreen/>}
      </main>
    </div>
  );
};

export const Quiz = () => {
  return (
    <QuizProvider>
        <QuizApp />
    </QuizProvider>
  );
};