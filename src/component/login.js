import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {InputGroup, FormControl} from 'react-bootstrap'
function Login () {

  const [loginForm , setLoginForm] = useState({
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
    let {name , value} = event.target

    setLoginForm({
      ...loginForm, [name] : value
    })

    console.log(loginForm)
  }

  function submitted() {
    
    axios({
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: {
        email : loginForm.email,
        password : loginForm.password
      }
    })
      .then(({data}) => {
        localStorage.setItem('userStatus', JSON.stringify(data.UserStatus))
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        history.push('/game')
      })
      .catch(err => {
        setErrForm(err.response.data.message)
      })
  }

  return (
    <>
      <div id="background">
        <div className="login-form">
          <div>
              <div className="title center mt-60">
                  <h1>Script Fighter</h1>
              </div>
            <InputGroup className="mb-3">
              <FormControl
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                onChange={onChangeText}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                onChange={onChangeText}
              />
            </InputGroup>
          </div>
          <div className="center w-200">
            { errForm &&
              <h4 className="title  red fs-48 bg-white-op-75 center">{errForm}</h4>
            }
          </div>
          <div className="iconstart">
            <img alt="" src="./icon/start.png" className="" onClick={submitted}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login