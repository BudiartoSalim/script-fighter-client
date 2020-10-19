import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function Login () {

  const [loginForm , setLoginForm] = useState({
    email: '',
    password: ''
  })

  const history = useHistory()
  function onChangeText(event) {
    let {name , value} = event.target

    setLoginForm({
      ...loginForm, [name] : value
    })

    console.log(loginForm)
  }

  function submitted() {
    history.push('/game')
    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:3000/login',
    //   data: {
    //     email : loginForm.email,
    //     password : loginForm.password
    //   }
    // })
    //   .then(({data}) => {
    //     console.log(data)
    //     localStorage.setItem('userstatus', JSON.stringify(data.user.UserStatus))
    //     localStorage.setItem('access_token', data.access_token)
    //     // localStorage.setItem('username', data.username)
    //     // localStorage.setItem('level', data.UserStatus.level)
    //     // localStorage.setItem('hp', data.UserStatus.hp)
    //     // localStorage.setItem('atk', data.UserStatus.atk)
    //     // localStorage.setItem('def', data.UserStatus.def)
    //     // localStorage.setItem('experience', data.UserStatus.collectedExp)
    //     // localStorage.setItem('money', data.UserStatus.money)
    //     // localStorage.setItem('difficulty', data.UserStatus.currentDifficulty)
    //     // localStorage.setItem('reputation', data.UserStatus.reputation)

    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  return (
    <>
      <label>Email</label>
      <input type="email" name="email" onChange={onChangeText}/><br/>
      <label>Password</label>
      <input type="password" name="password" onChange={onChangeText}/><br/>
      <button onClick={submitted}>Submit</button>
    </>
  )
}

export default Login