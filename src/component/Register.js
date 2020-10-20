import React,{ useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { InputGroup,
  FormControl,
  Form,
  Button,
  Alert } from 'react-bootstrap'

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
      ...registerForm, [name] value
    })
  }
  function submitRegister(event) {
    event.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:3000/register',
      data: {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password
      }
    })
    .then(({ data }) => {
      history.push('/')
    })
    .catch(err => {
      setErrForm(err.response.data.message)
    })
  }

  return (
    <>
    <div id="background">
      <div className="login-box p-3">
            <div className="title center mt-60">
                <h1>Script Fighter Register</h1>
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
                Start
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
