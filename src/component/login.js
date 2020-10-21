import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {
  Form,
  Button,
  Alert
} from 'react-bootstrap'
import ScriptFighterAPI from '../API/ScriptFighterAPI'

function Login () {

  const [loginForm , setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [errForm, setErrForm] = useState('')
  const history = useHistory()

  useEffect(() => {
    
    let access_token = localStorage.getItem('access_token')
    if(access_token) {
      history.push('/game')
    }

    let registerStat = localStorage.getItem('login')
    
    if(registerStat) {
      setErrForm(registerStat)
      localStorage.removeItem('login')
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrForm('')
    }, 3000)
  }, [errForm])
  
  function onChangeText(event) {
    let {name , value} = event.target

    setLoginForm({
      ...loginForm, [name] : value
    })

  }

  function submitted(event) {
    event.preventDefault()
    ScriptFighterAPI({
      method: 'POST',
      url: '/login',
      data: {
        email : loginForm.email,
        password : loginForm.password
      }
    })
      .then(({data}) => {
        localStorage.setItem('userStatus', JSON.stringify(data.UserStatus))
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        
        return ScriptFighterAPI({
          method: 'GET',
          url: '/monster',
          headers:{
            access_token : data.access_token
          }
        })
      })
      .then(({data}) => {
        localStorage.setItem('monster', JSON.stringify(data))
        history.push('/game')
      })
      .catch(err => {
        setErrForm(err.response.data.message)
      })
  }

  function Register () {
    history.push('/register')
  }

  return (
    <>
      <div id="background">
        <div className="login-box p-3">
              <div className="title center mt-60">
              <h1 className="badge-light">Script Fighter
                <h3 className="badge-warning">Login</h3>
              </h1>
              </div>
              <Form onSubmit={(event) => submitted(event)} className="login-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    style={{fontFamily: 'dogica'}}
                   type="email"
                   name="email"
                   placeholder="Enter your email"
                   onChange={onChangeText}
                   />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  style={{fontFamily: 'dogica'}}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={onChangeText}
                  />
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Start
                </Button>
                <Button variant="secondary" style={{marginTop: '10px'}} onClick={Register}>
                  Register
                </Button>
              </Form>
          </div>
          { errForm &&  
              <Alert style={{fontFamily: 'dogica', margin: "20px"}} variant="warning">
               {errForm}
              </Alert>
            }
      </div>
    </>
  )
}

export default Login