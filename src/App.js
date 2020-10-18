import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Preloader from './scenes/Preloader' 
import Game from './scenes/Game' 

class App extends Component {
 
  state = {
    game: {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [Preloader, Game],
      scale: {
        zoom: 2
      }
    },
  }
 
  render() {
    const { initialize, game } = this.state
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}
 
export default App;