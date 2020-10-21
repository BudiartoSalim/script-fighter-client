import React, {useState, useEffect} from 'react'
import  { useHistory } from 'react-router-dom'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import LeaderboardRow from '../component/leaderboard-tablerow'
import LoadingDisplay from '../component/LoadingDisplay.js';
function LeaderboardScene () {

  const [users , setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect( () => {
    setLoading(true)
    axios({
      method: 'GET',
      url: 'http://localhost:3000/rank'
    })
    .then(({data}) => {
      setLoading(false)
      setUsers(data.userRank)
      console.log(data.userRank)
    })
    .catch(err => {
      console.log()
    })
  }, [])

  function BackToGame() {
    history.push('/game')
  }

  return (
    <div id="leaderboard-page" className="f-dogicabold bg-black">
      {
        loading &&
        <LoadingDisplay/>
      }
      {
        !loading && users &&
      <Container fluid>
        <h1 style={{textAlign: 'center'}}>Leaderboard</h1>
        <Button variant="danger" onClick={BackToGame} style={{float:'right', marginBottom: '20px'}}>Exit</Button>
        <Table  borderless variant="dark">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, idx) => (
                <LeaderboardRow user={user} idx={idx} key={idx}/>
              ))
            }
          </tbody>
        </Table>
      </Container>

      }
    </div>
  )
}

export default LeaderboardScene