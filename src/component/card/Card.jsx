import React from 'react'
import "./Card.css"
function Card(props) {
  return (
    <div id='card'>
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
      <p>By: {props.user}</p>
    </div>
  )
}

export default Card
