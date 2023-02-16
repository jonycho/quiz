import React from "react"
import Start from "./components/Start"
import Answers from "./components/Answers"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import './App.css';

export default function App() {
  const [startQuiz, setStartQuiz]=React.useState(false)
  const [questions, setQuestions]=React.useState([])
  const [count,setCount]=React.useState(0)
  const [finish,setFinish]=React.useState(false)

  React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple&encode=url3986")
          .then(res => res.json())
          .then(data => {
           const newArray= data.results.map(row=>{

              const id_respuesta_correcta=nanoid()
              let respuestas=[
                {id:id_respuesta_correcta, value: row.correct_answer},
                ...row.incorrect_answers.map(answer=>({
                  id:nanoid(),
                  value:answer
                }))
              ]
              respuestas = respuestas.sort(function(){ return Math.random() - 0.5})

              return (
                {
                  id:nanoid(), 
                  pregunta:row.question,
                  respuestas: respuestas,
                  respuesta_correcta:id_respuesta_correcta,
                  respuesta_elegida:""
                }
              )
            })

          !finish && setQuestions(newArray)
          })
  },[finish])

function playAgain(){
  setStartQuiz(prevStart => !prevStart)
  setCount(0)
  setFinish(false)
}

  function holdAnswer(pregunta, id) {
  setQuestions(prevQuestList=> {
      let idSelecc=""
      return prevQuestList.map(question=>{
          if(question.pregunta === pregunta){
              question.respuestas.map(respuesta=> { 
                if(respuesta.id === id){ 
                  idSelecc = id 
                }  
                return respuesta
              }
              )
              return {...question, respuesta_elegida:idSelecc}
          }
          return question
      })
  })

}

  function handleStartQuiz(){
    
    setStartQuiz(prevStart=> !prevStart)
}

function checkAnswers(){
  questions.map(data => data.respuesta_correcta === data.respuesta_elegida ? setCount(prevCount => prevCount+1):count)
  setFinish(true)
}

const questionsList = questions.map(dataQuestion => {
    return (
        <Answers
          key={dataQuestion.id}
          pregunta={dataQuestion.pregunta}
          respuestas={dataQuestion.respuestas} 
          idRespCorrecta={dataQuestion.respuesta_correcta} 
          idRespSelecc={dataQuestion.respuesta_elegida}
          holdAnswer={holdAnswer}
          isFinished={finish}
          />
    )
    })
  

  return (
    <div className="container">
    {finish && count>=3 && <Confetti style={{zIndex: '101'}} />}
    <img src="../images/blobs-yellow.png" alt="blobs-yellow" className="img-yellow" />
    <img src="../images/blobs-blue.png" alt="blobs-blue"  className="img-blue" />
    
    {!startQuiz && <Start handleStartQuiz={handleStartQuiz} />}
    
    {startQuiz && <div className="listquestions">
        {questionsList}
        <div className="results">
          {!finish ? 
            <button onClick={checkAnswers} className="btn-submit">Check answers</button>: 
            <p>You scored {count}/5 correct answers <button className="btn-submit" onClick={playAgain}>Play again</button></p> 
          }
        </div>
    </div>}
    
</div>
  );
}
