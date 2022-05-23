import React, {useState} from 'react';

//components
import QuestionsCard from './components/QuestionsCard';

//types
import { Difficulty , QuestionsState } from './API';

import {fetchQuizQuestions} from './API'

import { GlobalStyle,Wrapper } from './styles/App.styles';

export type AnswerObject = {
  questions:string,
  answer:string,
  correct:boolean,
  correctAnswer:string,
}

function App() {
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score , setScore] = useState(number);
  const [gameOver , setGameOver] = useState(true);
  const TOTAL_QUESTİONS = 10;

  

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTİONS,Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }  
  const  checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev +1)
      const answerObject = {
        questions:questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev,answerObject])
    }
  }
  const nextQuestion = () => {
      const nextQuestion = number + 1
      if(nextQuestion === TOTAL_QUESTİONS) 
        setGameOver(true)
      else 
        setNumber(nextQuestion)
  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <div className="App">
     <h1>React Quiz</h1>
     {
       gameOver || userAnswers.length === TOTAL_QUESTİONS 
       ?
       (
          <button className='start' onClick={startQuiz}>Start</button>
       )
       :null
     }
     {
       !gameOver ?  <p className='score'>Score:{score}</p> : null
     }
     {
       loading &&  <p className='loading'>Loading Questions ...</p> 
     }
     {
       !loading && !gameOver && (
       <QuestionsCard
          questionsNr={number + 1}
          totalQuestions={TOTAL_QUESTİONS}
          questions={questions[number].question}
          answers={questions[number].answer}
          userAnswers={userAnswers ?  userAnswers[number] : undefined}
          callback={checkAnswer}
     />)
     }
     {
       !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTİONS - 1 ?
       (
         <button className='next' onClick={nextQuestion}> Next Question</button>
       )
       : null
     }
     
    </div>
    </Wrapper>
    </>
  );
}

export default App;
