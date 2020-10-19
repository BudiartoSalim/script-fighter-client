import React from 'react'

import {BrowserRouter as Router, Link , Switch , Route} from 'react-router-dom'
import Login from './component/login'
import GameScreen from './component/gamescreen'

function App () {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/game">
          <GameScreen/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App