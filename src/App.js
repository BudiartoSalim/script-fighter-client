import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import Login from './component/login'
import GameScreen from './component/gamescreen'
import BattleScene from './scenes/BattleScene'
import LeaderboardScene from './scenes/Leaderboard'
import ShopScene from './scenes/ShopScene'
import Register from './component/Register'
function App () {

  const history = useHistory()

  return (
    <div>
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
    </div>
  )
}

export default App
