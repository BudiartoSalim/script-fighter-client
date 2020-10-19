import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Preloader from '../scenes/Preloader' 
import Game from '../scenes/Game' 

/**
 *     game = {
      type: Phaser.AUTO,
      width: 1600,
      height: 1600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [Game],
      scale: {
        zoom: 2
      }
    }
 */

function GameScreen() {

  const [ state, setState ] = useState({
    initialize: true,
    game: {
      width: 1600,
      height: 1600,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
    },
      scene: [Game]
    }
  })

  const { initialize, game } = state

  return (
     <IonPhaser game={game} initialize={initialize} />
  )
}

export default GameScreen;