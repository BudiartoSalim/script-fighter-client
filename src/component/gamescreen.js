import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Game from '../scenes/Game' 

function GameScreen() {

  const [ state ] = useState({
    initialize: true,
    game: {
      width: 800,
      height: 600,
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
      <IonPhaser game={game} initialize={initialize}  />
  )
}

export default GameScreen;