import React,{ useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { InputGroup, FormControl } from 'react-bootstrap'

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
  function submitRegister() {
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
}
