import React from "react"

export default function Start(props){
    return(
        <div className="home">
                <img className="img-home" src="../images/movie.png" alt="movie logo" />
                <h1>Movie Quiz</h1>
                <p>Test your knowledge about cinema films</p>
                <button className="btn-submit" onClick={props.handleStartQuiz}>Start quiz</button>
            </div>
    )
    
}