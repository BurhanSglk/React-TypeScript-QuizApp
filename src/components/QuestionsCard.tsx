import React from 'react'

import {AnswerObject} from '../App'

import { Wrapper, ButtonWrapper } from '../styles/QuestionsCard.styles'

type Props = {
    questions:string;
    answers:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswers:AnswerObject | undefined;
    questionsNr:number;
    totalQuestions:number;
}

const QuestionsCard : React.FC<Props> = ({questions,answers,callback,userAnswers,questionsNr,totalQuestions}) => {
  
  return (
   <Wrapper>
        <p className='number'>
            Questions: {questionsNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:questions}}/>
        <div>
            {answers.map((answer) =>(
                <ButtonWrapper key={answer} correct={userAnswers?.correctAnswer === answer}  userClicked={userAnswers?.answer === answer}>
               
                    <button disabled={userAnswers ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html:answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
  )
}



export default QuestionsCard;