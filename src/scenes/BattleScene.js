import React , {useEffect, useState}from 'react'
import {useHistory} from 'react-router-dom'
import {
  Container,
  Row,
  ProgressBar,
  Button,
  Image,
  Form
} from 'react-bootstrap'
import CombatResult from '../component/CombatResult'
import BattleSound from '../assets/audio/battle.mp3'
import ScriptFighterAPI from '../API/ScriptFighterAPI'

function BattleScene () {

  const [question, setQuestion] = useState([])
  const [questionNow , setQuestionNow] = useState({})
  const [questionAnswer, setQuestionAnswer] = useState([])
  const [idxQuestion, setIdxQuestion] = useState(0)
  const [monster, setMonster] = useState({ })
  const [hpMonster, setHpMonster] = useState(0)
  const [hpCharacter, setHpCharacter] = useState(0)
  const [characterStatus , setCharacterStatus] = useState({})
  const [username, setUsername] = useState('')
  const time = 10
  const [countdown, setCountDown] = useState(time)
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const [intervalRunning, setIntervalRunning] = useState(true)
  const [combatResult , setCombatResult] = useState('')
  const history = useHistory()
  
  const battleSound = new Audio(BattleSound)
  //starting use effect set character , question , monster, username
  useEffect(() => {
    let access_token = localStorage.getItem('access_token')
    if(!access_token) {
      history.push('/')
    }
    battleSound.play()
    battleSound.volume = 0.5
    setCharacterStatus(JSON.parse(localStorage.getItem('userStatus')))
    setQuestion(JSON.parse(localStorage.getItem('question')))
    setMonster(JSON.parse(localStorage.getItem('monster-now')))
    setUsername(localStorage.getItem('username'))

    return () => {
      battleSound.pause()
    }
  }, [])

  //checking interval
  useEffect(() => {
    let interval
    let timeout
   
    if(intervalRunning && countdown === time) {
      timeout = setTimeout(() => {
        interval = setInterval(() => {   
            setCountDown(countdown => countdown - 0.1)
        }, 100)
      }, 1000)
    } else {
      clearInterval(interval)
      resetCountdown()
    }

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }

  }, [intervalRunning])

  //set hp character & monster when battling
  useEffect(() => {
    setHpMonster(monster.hp)
    setHpCharacter(characterStatus.hp)
  }, [monster, characterStatus])

  //random question
  useEffect(() => {
    let idx = Math.floor(Math.random() * question.length)

    setQuestionNow({
      ...question[idx]
    })

  }, [question, idxQuestion])

  //check hp monster
  useEffect(() => {
    if(hpMonster && hpMonster <= 0) {
      setHpMonster(0)
      localStorage.setItem('statusbattle' , 'win')

      ScriptFighterAPI({
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
        setCombatResult('Win!')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [hpMonster])

  //check hp character
  useEffect(() => {
    if(hpCharacter && hpCharacter <= 0) {
      setHpCharacter(0)
      localStorage.setItem('statusbattle' , 'lose')
      setCombatResult('Lose!')
    }

  }, [hpCharacter])

  //check countdown
  useEffect(() => {
    
    if(countdown <= -0.5) {
      
      if(hpMonster > 0 && hpCharacter > 0) {
        let filter = questionAnswer.filter(el => el.id === questionNow.id)
        if(filter.length === 0 ){
          setQuestionAnswer([...questionAnswer, questionNow])
        }
      }

        setIdxQuestion(idxQuestion + 1)
        setHpCharacter(hpCharacter - Math.ceil((monster.atk * 2) / characterStatus.def))
        resetCountdown()

    }

  }, [countdown])

  //reset coundown back to max time
  function resetCountdown () {
    setCountDown(time)
    setIntervalRunning(!intervalRunning)
  }

  //change answer question
  function changeAnswer(e) {
    setSubmittedAnswer(e.target.value)
  }

  //back to game
  function ranAway() {
    localStorage.setItem('statusbattle' , 'lose')
    history.push('game')
  }

  //submit answer
  function clickAnswer (e) {

      let filter = questionAnswer.filter(el => el.id === questionNow.id)
      if(filter.length === 0 ){
        setQuestionAnswer([...questionAnswer, questionNow])
      }

      ScriptFighterAPI({
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
          setIdxQuestion(idxQuestion + 1)
          
          if(data.answerResult) {
            setHpMonster(hpMonster - Math.ceil((characterStatus.atk * 2) / monster.def))
          } else {
            setHpCharacter(hpCharacter - Math.ceil((monster.atk * 2) / characterStatus.def))
          }

            resetCountdown()

        })
        .catch(err => {
          console.log(err)
        })
  }
  
  return (
    <>
    {
      combatResult && 
      <CombatResult combatResult={combatResult} questions={questionAnswer}></CombatResult>
    }
    {
      !combatResult &&
        <Container fluid style={{fontFamily: 'dogicabold'}} className="mt-3">
        <Row>
          <div id="battle-scene-left" className="border border-dark col-sm-3">
          <Image
          src="https://img.itch.zone/aW1nLzE5ODA4NjQuZ2lm/original/Fe49uB.gif"
          rounded
          className="border border-dark"
          style={{
            width:"200px",
            marginLeft: "30px",
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
          <div id="battle-scene-center" className="border border-dark col-sm-6 p-3">
            <div id="time-box">
              <h5>Time</h5>
              <ProgressBar variant="primary" now={countdown / time * 100}/>
            </div>
            {
              question && 
              <>
                <div>
                  <h5>Question</h5>
                  <h5
                  style={{fontFamily: 'dogica'}}
                  >{questionNow.question}</h5>
                </div>
                <div style={{fontFamily: 'dogica'}}>
                    <Form>
                      { questionNow.answer && 
                        questionNow.answer.split('!@!').map( ans => (
                          <Form.Check
                          style={{fontSize: 15}}
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
              </>
            }
          </div>
          <div id="battle-scene-right" className="border border-dark col-sm-3">
          <Image
          src="https://img.itch.zone/aW1nLzIyMTQ3ODgucG5n/original/UI37mL.png"
          rounded
          className="border border-dark"
          style={{
            width:"200px",
            marginLeft: "55px",
            marginTop: "25px",
            marginBottom: "25px"
          }}
          />
          <h5>
            Player Status
          </h5>
          <div style={{fontFamily: 'dogica'}}>
          <p>{username.toUpperCase()}</p>
          <ProgressBar variant="success" now={ hpCharacter / characterStatus.hp * 100} label="HP" style={{transition: 'none !important'}}/>
          <p>Atk: {characterStatus.atk} </p>
          <p>Def: {characterStatus.def}</p>
          </div>
          </div>
        </Row>
      </Container>
    }
     
    </>
  )
}

export default BattleScene