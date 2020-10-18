import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
        super('game')
        this.state = {
            player: ''
        }
	}    

	preload()
    {
        this.load.image('tiles', './tiles/dungeon_tiles.png')
        this.load.tilemapTiledJSON('dungeon', './tiles/dungeon-01.json')
        this.load.atlas('faune', './character/faune.png', './character/faune.json')
        this.load.spritesheet('character', './character/converted-player-walkv2.png', {frameWidth : 24, frameHeight: 32})
    }

    create()
    {

        let map = this.make.tilemap({ key: 'dungeon'}) //"dungeon" is from dungeon JSON file that we load
        let tileset = map.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  
        map.createStaticLayer('Ground', tileset)
        let wallsLayer = map.createStaticLayer('Walls', tileset)
        
        wallsLayer.setCollisionByProperty({ collides: true })
        this.state.player = this.physics.add.sprite(100,100, 'character')

        let debugGraphics = this.add.graphics().setAlpha(0.75)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('character', {start: 72, end: 96}),
            frameRate: 48
        })
    
        this.anims.create({
            key:'up',
            frames: this.anims.generateFrameNumbers('character', {start:0 , end:23}),
            frameRate: 48
        })
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', {start: 24, end:47}),
            frameRate: 48
        })
    
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('character', {start: 48 , end:71}),
            frameRate: 48
        })

        this.physics.add.collider(this.state.player, wallsLayer)
        this.state.cursors = this.input.keyboard.createCursorKeys()

    }

    update () 
    {
        if (this.state.cursors.left.isDown)
        {
          this.state.player.setVelocityX(-50);
          this.state.player.setVelocityY(0);
          this.state.player.anims.play('left', true);
        }
    else if (this.state.cursors.right.isDown)
        {
          this.state.player.setVelocityX(50);
          this.state.player.setVelocityY(0);
          this.state.player.anims.play('right', true);
        }
    else if (this.state.cursors.up.isDown)
        {
          this.state.player.setVelocityY(-50);
          this.state.player.setVelocityX(0);
          this.state.player.anims.play('up', true);
        }
    else if (this.state.cursors.down.isDown)
        {
          this.state.player.setVelocityY(50);
          this.state.player.setVelocityX(0);
          this.state.player.anims.play('down', true);
        }
    else 
        {
          this.state.player.setVelocityX(0);
          this.state.player.setVelocityY(0)  
        }
    }
}
