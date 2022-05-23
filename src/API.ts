
import { shuffleArray } from "./utils";

export type Questions = {
    category:string,
    correct_answer:string,
    difficulty:string,
    incorrect_answers:string[],
    question:string,
    type:string,
}

export type QuestionsState = Questions &  { answer : string[]}


export enum Difficulty {
    EASY  = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}


export const  fetchQuizQuestions = async (amount: number , difficulty :Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endPoint)).json();
    return data.results.map((questions:Questions) => (
        {
            ...questions,
            answer: shuffleArray([...questions.incorrect_answers, questions.correct_answer])
        }
    ))
}