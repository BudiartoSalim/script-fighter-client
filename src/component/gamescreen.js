import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Game from '../scenes/Game' 
import { Container } from 'react-bootstrap'

function GameScreen() {

  const [ state ] = useState({
    initialize: true,
    game: {
      width: 1200,
      height: 800,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
      scene: [Game]
    }
  })

  const { initialize, game } = state

  return (
    <div style={{backgroundColor: 'black', height: '100vh'}}>
      <Container>
        <IonPhaser game={game} initialize={initialize}  />
      </Container>
    </div>
  )
}

export default GameScreen;