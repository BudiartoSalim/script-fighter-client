import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Preloader from '../scenes/Preloader' 
import Game from '../scenes/Game' 


function GameScreen() {

  const [ state, setState ] = useState({
    initialize: true,
    game: {
      width: '100%',
      height: '100%',
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
      scene: [Preloader, Game]
    }
  })

  const { initialize, game } = state

  return (
     <IonPhaser game={game} initialize={initialize} />
  )
}

export default GameScreen;