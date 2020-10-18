import React, {useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

class TitleScene extends Phaser.Scene {
  constructor(){
    super({
      key: 'TitleScene'
    })
  }

  preload() {
      this.load.image('background', './images/background.jpg')
      this.load.image('title', './images/scriptfigther_title.png') 
    }

  create() {
    this.add.image(500,300, 'background')
    this.add.image(window.innerWidth/2,window.innerHeight/2, 'title')
    this.input.once('pointerdown', this.check, this);
    this.add.text(window.innerWidth/2-100,window.innerHeight/2+100, 'Click to Start Game')
  }

  check() {
    this.scene.start('gamescene')
  }

}

export default TitleScene