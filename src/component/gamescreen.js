import React, {useState, useEffect} from 'react'
import Phaser from 'phaser'
import {useHistory} from 'react-router-dom'
import { IonPhaser } from '@ion-phaser/react'
import Game from '../scenes/Game' 
import { Container } from 'react-bootstrap'

function GameScreen() {
  const history = useHistory()
  const [play , setPlay] = useState(false) 
  
  const [ state ] = useState({
    initialize: true,
    game: {
      width: 600, // 600
      height: 300,// 300
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
      scene: [Game],
      scale: {
        zoom: 2
      }
    }
  })

  useEffect(() => {
    
    let access_token = localStorage.getItem('access_token')
    if(!access_token) {
      history.push('/')
    } else {
      setPlay(true)
    }

  }, [])
  const { initialize, game } = state

  return (
    <>
    {play && 
      <div style={{backgroundColor: 'black', height: '100vh'}}>
        <Container>
          <IonPhaser game={game} initialize={initialize}  />
        </Container>
      </div>
    }
    </>
  )
}

export default GameScreen;