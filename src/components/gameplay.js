import React, {useEffect} from 'react'
import Phaser from 'phaser'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
class GamePlay extends Phaser.Scene  {

  constructor(){
    super({
      key: 'gamescene'
    })
    this.state = {
      basehp : 100,
      datahp: 0,
      platforms: '',
      player: '',
      cursors: '',
      key: '',
      shopbuilding: '',
      hptext: '',
      bomb: '',
      x: 100,
      y: 100,
      status: false
    }

  }
  
   init (data) {

    if(data.player) {
      this.state.x = data.player.x
      this.state.y = data.player.y
    }
  }

  preload() {
    this.load.image('building', './images/shop.png')
    this.load.image('grass', './images/grass.jpg')
    this.load.image('enter', './images/enter.png')
    this.load.image('linkedin', './images/linkedin.png')
    this.load.image('bomb', './images/bomb.jpg')
    this.load.spritesheet('zelda', './images/walking-zelda.png', {frameWidth : 24, frameHeight: 32})

  }

  create() {
      
      this.add.image(400, 300, 'grass').setScale(10,5);
      this.state.building = this.physics.add.staticImage(500,300, 'building')
      this.state.building.body.setSize(150 , 20 , 0 , 0)
      this.state.building.body.setOffset(50 , 100)
      this.state.player = this.physics.add.sprite(this.state.x,this.state.y, 'zelda')

      // player.setBounce(0.2)
      // player.body.setAllowGravity(false)

      this.state.player.setScale(2)
      this.state.player.setCollideWorldBounds(true);
      this.state.bomb = this.physics.add.staticGroup()
      this.state.bomb.create(1000,500, 'enter')
      this.state.bomb.toggleVisible(false)
      
      this.anims.create({
          key:'left',
          frames: this.anims.generateFrameNumbers('zelda', {start: 72, end: 96}),
          frameRate: 48
      })

      this.anims.create({
          key:'up',
          frames: this.anims.generateFrameNumbers('zelda', {start:0 , end:23}),
          frameRate: 48
      })

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('zelda', {start: 24, end:47}),
          frameRate: 48
      })

      this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('zelda', {start: 48 , end:71}),
          frameRate: 48
      })

      this.anims.create({
          key: 'turn',
          frames: [{key: 'zelda', frame: 48}],
          frameRate: 48
      })

      this.state.cursors = this.input.keyboard.createCursorKeys()
      this.state.key = this.input.keyboard.addKeys(
        {w:Phaser.Input.Keyboard.KeyCodes.W,
        s:Phaser.Input.Keyboard.KeyCodes.S,
        a:Phaser.Input.Keyboard.KeyCodes.A,
        d:Phaser.Input.Keyboard.KeyCodes.D});
      // this.physics.add.collider(this.state.player, this.state.bomb)  
      this.physics.add.collider(this.state.player, this.state.platforms)
      this.physics.add.collider(this.state.player, this.state.building, () => {
        this.scene.start('shopscene',{player: { x: this.state.player.body.center.x, y:this.state.player.body.center.y}})
      })

  }


  update () {
      

      if (this.state.cursors.left.isDown || this.state.key.a.isDown)
          {
           console.log(this.state.player.body.center)
            this.state.player.setVelocityX(-1000);
            this.state.player.setVelocityY(0);
            this.state.player.anims.play('left', true);
          }
      else if (this.state.cursors.right.isDown)
          {
            this.state.player.setVelocityX(1000);
            this.state.player.setVelocityY(0);
            this.state.player.anims.play('right', true);
          }
      else if (this.state.cursors.up.isDown)
          {
            this.state.player.setVelocityY(-1000);
            this.state.player.setVelocityX(0);
            this.state.player.anims.play('up', true);
          }
      else if (this.state.cursors.down.isDown)
          {
            this.state.player.setVelocityY(1000);
            this.state.player.setVelocityX(0);
            this.state.player.anims.play('down', true);
          }
      else 
          {
            this.state.player.setVelocityX(0);
            this.state.player.setVelocityY(0)
            // player.anims.play('turn')   
          }
  }

}

export default GamePlay
