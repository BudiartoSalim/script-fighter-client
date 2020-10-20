import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './component/login'
import GameScreen from './component/gamescreen'
import BattleScene from './scenes/BattleScene'
import LeaderboardScene from './scenes/Leaderboard'
import ShopScene from './scenes/ShopScene'
import Register from './component/Register'
function App () {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/game">
          <div style={{margin: '0 auto'}}>
            <GameScreen/>
          </div>
        </Route>
        <Route exact path="/battle">
          <BattleScene/>
        </Route>
        <Route exact path="/leaderboard">
          <LeaderboardScene/>
        </Route>
        <Route exact path="/shop">
          <ShopScene/>
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
