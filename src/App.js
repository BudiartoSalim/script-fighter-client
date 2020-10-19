import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import Game from './scenes/Game' 

class App extends Component {
 
  
    game = {
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
 
  render() {
    return (
      <IonPhaser game={this.game} />
    )
  }
}
 
export default App;