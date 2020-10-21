import React from 'react';
import CombatResultContent from '../component/CombatResultContent.js';
import { Table , Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
export default function CombatResult(props) {
  //props.combatResult = "lose!" or "win!"
  //props.questions = array of questions object following the question schema;
  //buat props.questions masukin array state nya aja
  const history = useHistory()

  function BackToGame() {
    history.push('/game')
  }

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }} className="f-dogicabold ">
        <h1>Combat Results</h1>
        <h4>You {props.combatResult}</h4>
        <Button style={{float : 'right', marginRight: '30px', marginBottom: '30px'}} onClick={BackToGame}>Back To Game</Button>
        <Table variant="dark" striped>
          <thead>
            <tr>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {
              props.questions && 
              props.questions.map((el, index) => {
                return <CombatResultContent key={index} question={el} />
              })
              
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}