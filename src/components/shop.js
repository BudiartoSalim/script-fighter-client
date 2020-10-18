import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import axios from 'axios'
class ShopGame extends Phaser.Scene {
  constructor(){
    super({
      key: 'ShopScene'
    })
    this.state = {
      x: 0 ,
      y: 0,
      amiibo: ''
    }
  }

  init(data) {
    this.state.x = data.player.x - 300
    this.state.y = data.player.y
  }
  
  preload() {
   
  }

  create() {
    this.add.text(10,10, `data: ${this.state.amiibo}`)

    const linked = this.add.image(400, 300, 'linkedin')

    
    this.input.once('pointerdown', this.check, this);
  }

  check() {
    this.scene.start('gamescene', {player: { x: this.state.x, y:this.state.y}})
  }
  update () {

  }
}

export default ShopGame