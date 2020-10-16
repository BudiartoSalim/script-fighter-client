import React, {useState} from 'react';
import { IonPhaser } from '@ion-phaser/react'
import Phaser from 'phaser'
import { 
  grass,
  character,
  Bomb
 } from '../assets/imageAssets'


function OnGame() {

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
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    }
  })
  
  var platforms;
  var logo;
  var player;
  var cursors;
  let check;
  var hp = 100;
  var hptext;
  let bomb;


  function preload ()
    {
      this.load.image('bomb', Bomb)

        this.load.image('grass', grass)
        this.load.spritesheet('zelda', character, {frameWidth : 24, frameHeight: 32})
        // this.load.spritesheet('narto', 'src/spritechar.png', {frameWidth : 42.33, frameHeight: 45})
    }

  function create ()
  {
      this.add.image(400, 300, 'grass').setScale(3,2);
      
      platforms = this.physics.add.staticGroup()
      bomb = this.physics.add.staticGroup({
          key: 'bomb',
          repeat: 5,
          setXY: {x: 100,y: 200, stepX: 80, stepY: 50}
      })    

      player = this.physics.add.sprite(100,100, 'zelda')
      // player.setBounce(0.2)
      // player.body.setAllowGravity(false)
      player.setScale(2)
      player.setCollideWorldBounds(true);
      hptext = this.add.text(16,16, `hp: ${hp}`, {fontSize: '32px', fill: '#000'})
      
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

      cursors = this.input.keyboard.createCursorKeys();

      this.physics.add.overlap(player, bomb, damageBomb, null,this)
  }


  function update () {
    if (cursors.left.isDown)
        {
            player.setVelocityX(-200);
            player.setVelocityY(0);
            player.anims.play('left', true);
        }
    else if (cursors.right.isDown)
        {
            player.setVelocityX(200);
            player.setVelocityY(0);
            player.anims.play('right', true);
        }
    else if (cursors.up.isDown)
        {
            player.setVelocityY(-200);
            player.setVelocityX(0);
            player.anims.play('up', true);
        }
    else if (cursors.down.isDown)
        {
            player.setVelocityY(200);
            player.setVelocityX(0);
            player.anims.play('down', true);
        }
    else 
        {
          player.setVelocityX(0);
          player.setVelocityY(0)
          // player.anims.play('turn')   
        }
}

function damageBomb (player, bomb) {
  bomb.disableBody(true,true)
  player.setTint(0xff0000);
  setTimeout(() => {
      player.clearTint()
  }, 1000)
  hp -= 30
  hptext.setText(`hp: ${hp}`)
  console.log('kedemeg')
  player.setTint(0xff0000);
}

  // let game = new Phaser.Game
  const { initialize, game } = state

  return (
    <div>
    
        <IonPhaser game={game} initialize={initialize} />

    </div>
  );
}

export default OnGame;