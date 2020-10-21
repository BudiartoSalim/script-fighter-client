import React from 'react';

export default function CombatResultContent(props){
  return(
    <>
    <tr>
      <td>{props.question.question}</td>
      <td>{props.question.correct_answer}</td>
      <td><a href={props.question.explanation} target="blank">Click here!</a></td>
    </tr>
    </>
  )
}