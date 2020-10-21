import React,{ useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import {
  Form,
  Button,
  Alert } from 'react-bootstrap'
import ScriptFighterAPI from '../API/ScriptFighterAPI'

function Register() {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errForm, setErrForm] = useState('')
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      setErrForm('')
    }, 3000)
  }, [errForm])

  function onChangeText(event) {
    let {name, value} = event.target
    setRegisterForm({
      ...registerForm, [name] : value
    })
  }
  function submitRegister(event) {
    event.preventDefault()
    ScriptFighterAPI({
      method: 'POST',
      url: '/register',
      data: {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password
      }
    })
    .then(({ data }) => {
      history.push('/')
      localStorage.setItem('login', 'Success Register!!!')
    })
    .catch(err => {
      setErrForm(err.response.data.message)
    })
  }

  function BackToLogin() {
    history.push('/')
    
  }

  return (
    <>
    <div id="background">
      <div className="register-box p-3">
            <div className="title center mt-60">
                <h1 className="badge-light">Script Fighter
                <h3 className="badge-warning">Register</h3>
                </h1>     
            </div>
            <Form onSubmit={(event) => submitRegister(event)} className="login-form">
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  style={{fontFamily: 'dogica'}}
                 type="default"
                 name="username"
                 placeholder="Your Username"
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
                Register
              </Button>
              <Button variant="secondary" style={{marginTop: '10px'}} onClick={BackToLogin} >
                Back To Login
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
export default Register
