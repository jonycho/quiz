import React from "react"

export default function Answers(props){
    
    const respuestasElements = props.respuestas.map(respuesta => {

        function checkCorrect(){
            if(props.isFinished){
                if(respuesta.id === props.idRespCorrecta){
                    return "correcta"
                }
                if(respuesta.id === props.idRespSelecc){
                    return "incorrecta"
                }else{
                    return "restobotones"
                }
            }
        }    
        
        
        const selecc = respuesta.id === props.idRespSelecc ? "selected" : ""

        return <button disabled={props.isFinished ? "disabled":""} className={props.isFinished ? checkCorrect() : selecc} key={respuesta.id} onClick={()=> props.holdAnswer(props.pregunta, respuesta.id)}>{decodeURIComponent(respuesta.value)}</button>
    })
    
    return(
        <div className="questionBlock">
           <h2>{decodeURIComponent(props.pregunta)}</h2>
           <div className="listAnswers">{respuestasElements}</div>
        </div>
    )
}