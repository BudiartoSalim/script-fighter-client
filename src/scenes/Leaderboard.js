import React, {useState, useEffect} from 'react'
import  { useHistory } from 'react-router-dom'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import LeaderboardRow from '../component/leaderboard-tablerow'
import LoadingDisplay from '../component/LoadingDisplay.js';
import leaderboardSound from '../assets/audio/leaderboard.mp3'

function LeaderboardScene () {

  const [users , setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const audio = new Audio(leaderboardSound)

  function playAudio () {
    audio.play()
  }

  function pauseAudio() {
    audio.pause()
  }

  useEffect( () => {
    playAudio()
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

    return () => {
      pauseAudio()
    }

  }, [])

  function BackToGame() {
    history.push('/game')
  }

  return (
    <>
     <audio autoPlay>
        <source src="./assets/audio/leaderboard.mp3" type="audio/mpeg"/>
    </audio>
    <div id="leaderboard-page" className="f-dogicabold bg-black">
      
      {
        loading &&
        <LoadingDisplay/>
      }
      {
        !loading && users &&
      <div className="p-5">
        <h1 style={{textAlign: 'center'}}>Leaderboard</h1>
        <Button variant="danger" onClick={BackToGame} style={{float:'right', marginBottom: '20px'}}>Exit</Button>
        <Table  borderless variant="dark" style={{width: '80%', clear:'both', margin: '0 auto'}} striped >
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
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
      </div>
      }
    </div>
    </>
  )
}

export default LeaderboardScene