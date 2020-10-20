import React , {useEffect, useState}from 'react'
import {useHistory} from 'react-router-dom'
import {
  Container,
  Row,
  ProgressBar,
  Button,
  Image,
  Form,
  InputGroup,
  FormControl
} from 'react-bootstrap'
import axios from 'axios'
function BattleScene () {

  const [question, setQuestion] = useState([])
  const [questionNow , setQuestionNow] = useState({})
  const [idxQuestion, setIdxQuestion] = useState(0)
  const [monster, setMonster] = useState({ })
  const [hpMonster, setHpMonster] = useState(0)
  const [hpCharacter, setHpCharacter] = useState(0)
  const [characterStatus , setCharacterStatus] = useState({})
  const [username, setUsername] = useState('')
  const [time] = useState(20)
  const [countdown, setCountDown] = useState(time)
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const history = useHistory()

  useEffect(() => {
    setCharacterStatus(JSON.parse(localStorage.getItem('userStatus')))
    setQuestion(JSON.parse(localStorage.getItem('question')))
    setMonster(JSON.parse(localStorage.getItem('monster-now')))
    setUsername(localStorage.getItem('username'))

    setInterval(() => {   
      console.log('timeout invoked')
      setCountDown(countdown - 0.1)
    }, 100)

  }, [])

  useEffect(() => {
    setHpMonster(monster.hp)
    setHpCharacter(characterStatus.hp)
  }, [monster, characterStatus])

  useEffect(() => {
    
    let idx = idxQuestion
    if(idxQuestion >= question.length){
      idx = Math.floor(Math.random() * question.length)
    }

    setQuestionNow({
      ...question[idx]
    })

  }, [question, idxQuestion])

  useEffect(() => {
    if(hpMonster && hpMonster <= 0) {

      localStorage.setItem('statusbattle' , 'win')

      axios({
        method: 'PUT',
        url: 'http://localhost:3000/combat/experience',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          experience: monster.experience,
          money: monster.money
        }
      })
      .then(({data}) => {
        localStorage.setItem('userStatus', JSON.stringify(data.status))
        history.push('/game')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [hpMonster])

  useEffect(() => {
    
    if(hpCharacter && hpCharacter <= 0) {
      setHpCharacter(0)
      localStorage.setItem('statusbattle' , 'lose')
      history.push('/game')
    }

  }, [hpCharacter])

  useEffect(() => {
    
    if(countdown === 0) {
      setIdxQuestion(idxQuestion + 1)
      setHpCharacter(hpCharacter - 30)
      resetCountdown()
    } else if ( countdown <= 0) {
      resetCountdown()
    }

  }, [countdown])

  function resetCountdown () {
    setCountDown(time)
  }

  function changeAnswer(e) {
    setSubmittedAnswer(e.target.value)
  }

  function ranAway() {
    localStorage.setItem('statusbattle' , 'lose')
    history.push('game')
  }

  function clickAnswer (e) {

      axios({
        method: 'POST',
        url: `http://localhost:3000/combat/question/${questionNow.id}`,
        headers: {
          access_token : localStorage.getItem('access_token')
        },
        data: {
          answer : submittedAnswer
        }
      })
        .then(({data}) => {
          resetCountdown()
          setIdxQuestion(idxQuestion + 1)

          if(data.answerResult) {
            setHpMonster(hpMonster - 20)
          } else {
            setHpCharacter(hpCharacter - 30)
          }

        })
        .catch(err => {
          console.log(err)
        })

    // setIsAnswer(true)    
 
    // axios({
    //   method: 'POST',
    //   url: `http://localhost:3000/combat/question/${question.id}`,
    //   headers: {
    //     access_token : localStorage.getItem('access_token')
    //   },
    //   data: {
    //     answer : e.target.value
    //   }
    // })
    //   .then(({data}) => {
    //     console.log(monster.experience, monster.money)
    //     if(data.answerResult) {
    //       setHpMonster(hpMonster - (characterStatus.atk * 1.5 - (monster.def / 2)))
    //       resetCountdown()
    //       if((hpMonster - (characterStatus.atk * 1.5 - (monster.def / 2))) <= 0){
    //         setHpMonster(0)
    //         console.log('you win')
    //       }
          
    //     //   localStorage.setItem('statusbattle' , 'win')

    //     //   return axios({
    //     //     method: 'PUT',
    //     //     url: 'http://localhost:3000/combat/experience',
    //     //     headers: {
    //     //       access_token: localStorage.getItem('access_token')
    //     //     },
    //     //     data: {
    //     //       experience: monster.experience,
    //     //       money: monster.money
    //     //     }
    //     //   })
    //     //   .then(({data}) => {

    //     //     localStorage.setItem('userStatus', JSON.stringify(data.status))

    //     //     let questionnow = JSON.parse(localStorage.getItem('question-now'))
    //     //     let allMonster = JSON.parse(localStorage.getItem('monster'))

    //     //     let filtered = allMonster.questions.filter( quest => quest.id != questionnow.id)
    //     //     localStorage.removeItem('question-now')
    //     //     localStorage.removeItem('monster-now')
            
    //     //     if(filtered.length != 0){
    //     //       localStorage.setItem('monster', JSON.stringify({...allMonster , questions: filtered}))
    //     //       setTimeout(() => {
    //     //               history.push('/game')
    //     //             }, 2000)
    //     //     } else {
              
    //     //         return axios ({
    //     //           method: 'GET',
    //     //           url: 'http://localhost:3000/monster',
    //     //           headers:{
    //     //             access_token : localStorage.getItem('access_token')
    //     //           }
    //     //         })
    //     //           .then(({data}) => {
    //     //             localStorage.setItem('monster', JSON.stringify(data))
    //     //             setTimeout(() => {
    //     //               history.push('/game')
    //     //             }, 2000)
    //     //           })
    //     //     }

    //     //   })
    //     // } else {

    //     //   localStorage.setItem('statusbattle' , 'lose')
    //     //   setTimeout(() => {
    //     //     history.push('/game')
    //     //   }, 2000)

    //     } else {

    //       setHpCharacter(hpCharacter - monster.atk - characterStatus.def)
    //       // console.log(hpCharacter)
    //       resetCountdown()
    //       if((hpCharacter - monster.atk - characterStatus.def) <= 0) {
    //         setHpCharacter(0)
    //         console.log('lose')
    //       }
    //     }

    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

  }

  return (

    <Container style={{fontFamily: 'dogicabold'}} className="mt-3">
        <Row>
          <div id="battle-scene-left" className="border border-dark col-sm-4">
          <Image
          src="https://img.itch.zone/aW1nLzE5ODA4NjQuZ2lm/original/Fe49uB.gif"
          rounded
          className="border border-dark"
          style={{
            width:"200px",
            marginLeft: "65px",
            marginTop: "25px",
            marginBottom: "25px"
          }}
          />
          <h5>
            Monster Status
          </h5>
          <div style={{fontFamily: 'dogica'}}>
          <p>{monster.name}</p>
          <p>HP: {hpMonster}</p>
          <p>Atk: {monster.atk}</p>
          <p>Def: {monster.def}</p>
          </div>
          <p>Difficulty: { monster.difficulty === 0 ? 'Easy' : monster.difficulty === 1 ? 'Normal' : 'Hard'}</p>
          </div>
          <div id="battle-scene-right" className="border border-dark col-sm-8 p-3">
            <div id="player-status">
              <h5>Player Status</h5>
              <div style={{fontFamily: 'dogica'}}>
                <p>Player Name: {username.toUpperCase()} </p>
                <ProgressBar variant="danger" now={ hpCharacter / characterStatus.hp * 100} label="HP" />
                <p>Atk: {characterStatus.atk} </p>
                <p>Def: {characterStatus.def}</p>
              </div>
            </div>
            <div id="time-box">
              <h5>Time</h5>
              <ProgressBar variant="success" now={countdown / time * 100}/>
            </div>
            {
              question && 
              <div id="question-box">
                <h5>Question</h5>
                <h5
                style={{fontFamily: 'dogica'}}
                >{questionNow.question}</h5>
                <div style={{fontFamily: 'dogica'}}>
                    <Form>
                      { questionNow.answer && 
                        questionNow.answer.split('!@!').map( ans => (
                          <Form.Check
                          key={ans} 
                          type='radio'
                          name="answer"
                          label={ans}
                          value={ans}
                          onChange={changeAnswer}
                        />
                        ))
                      }
                      <div id="battle-scene-buttons">
                      <Button className="mt-3" onClick={clickAnswer}>
                        Submit
                      </Button>
                      <Button className="mt-3 btn btn-danger" onClick={ranAway}>
                        Run Away!
                      </Button>
                      </div>
                  </Form>
                </div>
              </div>
            }
          </div>
        </Row>
    </Container>

    // <Container>
    //   <Row>
    //     <Col sm={6} md={6} lg={6} xl={6}>
    //       <Container>
    //         <Row>
    //             <img src={monster.monster_image} alt={monster.monster_name} style={{width: "200px", height:"150px"}}/>
    //         </Row>
    //         <Row>
    //           <Table striped bordered hover>
    //               <tbody>
    //                 <tr>
    //                   <td>{monster.monster_name}</td>
    //                 </tr>
    //                 <tr>
    //                   <td>
    //                     <ProgressBar variant="danger" now={ hpMonster / monster.hp * 100} label="HP" />
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </Table>
    //         </Row>
    //       </Container>
    //     </Col>
    //     <Col sm={6} md={6} lg={6} xl={6}>
    //     { question &&
    //       <Table>
    //         <tbody>
    //         <tr>
    //           <td>
    //             {question.question}
    //           </td>
    //         </tr>
    //         { isAnswer &&
    //           <tr>
    //             <td>
    //               Explanation ? <a href={question.explanation} target="_blank" rel="noopener noreferrer">  Click Here </a>
    //             </td>
    //           </tr>
    //         }
    //         </tbody>
    //       </Table>
    //     }
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col sm={12} md={12} lg={12} xl={12}>
    //       <ProgressBar variant="success" now={countdown / time * 100}/>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col sm={6} md={6} lg={6} xl={6}>
    //       <Container>
    //         <Row>
    //           <Col sm={6} md={6} lg={6} xl={6}>
    //             <img src="https://shockoe.com/wp-content/uploads/2020/06/img_5ee42878a59f3.png" alt="character" style={{width:"200px", height:"200px"}}></img>
    //           </Col>
    //           <Col sm={6} md={6} lg={6} xl={6}> 
    //             <Table striped bordered hover>
    //               <tbody>
    //                 <tr>
    //                   <td>{username}</td>
    //                 </tr>
    //                 <tr>
    //                   <td>
    //                     <ProgressBar variant="danger" now={ hpCharacter / characterStatus.hp * 100} label="HP" />
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </Table> 
    //           </Col>
    //         </Row>
    //       </Container>
    //     </Col>
    //       <Col sm={6} md={6} lg={6} xl={6}>
    //         <Container>
    //         <Table>
    //           {
    //             !isAnswer &&
    //             <tbody>
    //               <tr>
    //                 { question.answer &&
    //                   question.answer.split('!@!').map((ans , idx) => (
    //                     idx < 2 ? 
    //                     <td key={idx}>
    //                     <Button  variant="primary" onClick={clickAnswer} value={ans} disabled={isAnswer}>{ans}</Button>
    //                     </td> : null
    //                   ))
    //                 }
    //               </tr>
    //               <tr>
    //                 {
    //                   question.answer && question.answer.split('!@!').length > 2 &&
    //                   question.answer.split('!@!').map((ans , idx) => (
    //                     idx > 1 ?
    //                     <td key={idx}>
    //                       <Button key={idx} variant="primary" onClick={clickAnswer} disabled={isAnswer} value={ans}>{ans}</Button>
    //                     </td> 
    //                     : null
    //                   ))
    //                 }
    //               </tr>
    //             </tbody>
    //           }
    //         </Table>
    //         </Container>
    //       </Col>
    //   </Row>
    // </Container>
  )
}

export default BattleScene