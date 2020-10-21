import React from 'react';
import CombatResultContent from '../component/CombatResultContent.js';
import { Table } from 'react-bootstrap';

export default function CombatResult(props) {
  //props.combatResult = "lose!" or "win!"
  //props.questions = array of questions object following the question schema;
  //buat props.questions masukin array state nya aja

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>Combat Results</h1>
        <h4>You {props.combatResult}</h4>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {
              props.questions && (
                props.questions.map((el, index) => {
                  return <CombatResultContent key={index} question={el} />
                })
              )
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}