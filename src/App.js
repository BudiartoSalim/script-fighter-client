import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './component/login'
import GameScreen from './component/gamescreen'
import BattleScene from './scenes/BattleScene'

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
        <Route exact path="/battle">
          <BattleScene/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App