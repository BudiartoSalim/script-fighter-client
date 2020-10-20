import React, {useState, useEffect} from 'react'
import  { useHistory } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import LeaderboardRow from '../component/leaderboard-tablerow'
function LeaderboardScene () {

  const [users , setUsers] = useState([])
  const [loading, setLoading] = useState(false)

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

  return (
    <div id="leaderboard-page">
      {
        loading &&
        JSON.stringify(users)
      }
      {
        !loading && users &&
      <Container>
        <Table  borderless>
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