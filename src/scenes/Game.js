import Phaser from 'phaser'

import preload from './GamePreload'



export default class Game extends Phaser.Scene
{
	constructor()
	{
        super('game')
        this.state = {
            faune: '', //faune is the character's name.
            direction: 'down',
            monster: {
                brown: ''
             }, 
            username: '',
            userStatus: {
                level: 0,
                hp: 0,
                atk: 0,
                def: 0,
                experience: 0,
                money: 0,
                difficulty: 0,
                reputation: 0

            }
        }
        this.preload = preload.bind(this);
	}    

    preload()
    {   
        let my = this.state
        this.state.username = localStorage.getItem('username')   
        let stat = JSON.parse(localStorage.getItem('userStatus'))
        my.userStatus.level = stat.level
        my.userStatus.hp = stat.hp
        my.userStatus.atk = stat.atk
        my.userStatus.def = stat.def
        my.userStatus.experience = stat.collectedExp
        my.userStatus.money = stat.money
        my.userStatus.reputation = stat.reputation

    }
    create()
    {   
        //dungeonTileSet is from dungeon tile set image (PNG)
        //outdoorTileSet is from outdoor tile set image (PNG)
        
        let dungeon = this.make.tilemap({ key: 'dungeon'}) //"dungeon" is from dungeon JSON file that we load
        let outdoor = this.make.tilemap({ key: 'nature-env'})
        

        let dungeonTileSet = dungeon.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  
        let outdoorTileSet = outdoor.addTilesetImage('nature-env', 'outdoor-tiles')

        
        dungeon.createStaticLayer('Ground', dungeonTileSet)
        dungeon.createStaticLayer('Dungeon-Properties', dungeonTileSet)
        outdoor.createStaticLayer('Ground', outdoorTileSet)
        outdoor.createStaticLayer('More-Grass', outdoorTileSet)
        outdoor.createStaticLayer('Properties', outdoorTileSet)


        this.state.monster.brown = this.physics.add.staticSprite(200,200, 'brown-monster', 'moving-object/brown-monster.png' )
        this.state.monster.brown.body.setSize(10,20)

        this.state.faune = this.physics.add.sprite(100,100, 'faune', 'sprites/walk-down/walk-down-3.png')
        this.state.faune.body.setSize(15,20)

        dungeon.createStaticLayer('Roof', dungeonTileSet)

        this.anims.create({
            key:'brown-monster',
            frames: this.anims.generateFrameNumbers('brown-monster', {start: 0, end: 3}),
            repeat: -1,
            frameRate: 14
        })

        this.physics.add.collider(this.state.faune, this.state.monster.brown, ()=>{
            console.log("kedebug")
        })

        
        // Walls

        let wallsLayer = dungeon.createStaticLayer('Walls', dungeonTileSet)

        wallsLayer.setCollisionByProperty({ collides: true }) // From Tiled application

        let debugGraphics = this.add.graphics().setAlpha(0.75)

        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });

        //Moving object properties (Tree, ...., .....)

        let tree = this.add.sprite(93,614, 'tree')

        this.anims.create({
            key:'tree',
            frames: this.anims.generateFrameNumbers('tree', {start: 0, end: 7}),
            repeat: -1,
            frameRate: 10
        })


        // Run moving object
        this.state.monster.brown.anims.play('brown-monster')
        tree.anims.play('tree')


    //idle position
    this.anims.create({

        key:'faune-idle-down', // config for the animation
        frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-down-3.png'}]
    })

    this.anims.create({
        key:'faune-idle-up', 
        frames: [{ key: 'faune', frame: 'sprites/walk-up/walk-up-3.png'}]
    })

    this.anims.create({
        key:'faune-idle-side',
        frames: [{ key: 'faune', frame: 'sprites/walk-side/walk-side-3.png'}]
    })

    //Move position
    this.anims.create({
        key: 'faune-walk-down',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/walk-down/walk-down-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-run-down',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/run-down/run-down-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-walk-up',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/walk-up/walk-up-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-run-up',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/run-up/run-up-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-walk-side',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/walk-side/walk-side-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15,
    })

    this.anims.create({
        key: 'faune-run-side',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'sprites/run-side/run-side-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15,
    })


        this.physics.add.collider(this.state.faune, wallsLayer)
        // this.state.cursors = this.input.keyboard.createCursorKeys()
        this.state.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            run: Phaser.Input.Keyboard.KeyCodes.SHIFT
        })

    }

    update ()   
    {
        let run = 100
        let walk = 50

        if (this.state.cursors.left.isDown && this.state.cursors.run.isDown ) {
          this.state.faune.setVelocityX(-run);
          this.state.faune.setVelocityY(0);
          this.state.faune.anims.play('faune-run-side', true);
          this.state.faune.scaleX = -1
          this.state.faune.body.offset.x = 24
          this.state.direction = 'left'
        } 
        else if (this.state.cursors.left.isDown) {
            this.state.faune.setVelocityX(-walk);
            this.state.faune.setVelocityY(0);
            this.state.faune.anims.play('faune-walk-side', true);
            this.state.faune.scaleX = -1
            this.state.faune.body.offset.x = 24
            this.state.direction = 'left'
        } 
        else if (this.state.cursors.right.isDown && this.state.cursors.run.isDown ) {
            this.state.faune.setVelocityX(run);
            this.state.faune.setVelocityY(0);
            this.state.faune.anims.play('faune-run-side', true);
            this.state.faune.scaleX = 1
            this.state.faune.body.offset.x = 8
            this.state.direction = 'right'
          } 
          else if (this.state.cursors.right.isDown) {
              this.state.faune.setVelocityX(walk);
              this.state.faune.setVelocityY(0);
              this.state.faune.anims.play('faune-walk-side', true);
              this.state.faune.scaleX = 1
              this.state.faune.body.offset.x = 8
              this.state.direction = 'right'
            } 
            else if (this.state.cursors.up.isDown && this.state.cursors.run.isDown ) {
                  this.state.faune.setVelocityY(-run);
                  this.state.faune.setVelocityX(0);
                  this.state.faune.anims.play('faune-run-up', true);
                  this.state.direction = 'up'
                } 
                else if (this.state.cursors.up.isDown)  {
                    this.state.faune.setVelocityY(-walk);
                    this.state.faune.setVelocityX(0);
                    this.state.faune.anims.play('faune-walk-up', true);
                    this.state.direction = 'up'
                  }
            else if (this.state.cursors.down.isDown && this.state.cursors.run.isDown ) {
                  this.state.faune.setVelocityY(run);
                  this.state.faune.setVelocityX(0);
                  this.state.faune.anims.play('faune-run-down', true);
                  this.state.direction = 'down'
                }
                else if (this.state.cursors.down.isDown) {
                    this.state.faune.setVelocityY(walk);
                    this.state.faune.setVelocityX(0);
                    this.state.faune.anims.play('faune-walk-down', true);
                    this.state.direction = 'down'
                  }
            else {
                if(this.state.direction === 'up' || this.state.direction === 'down') {
                this.state.faune.anims.play(`faune-idle-${this.state.direction}`, true);
                } 
                else {
                    if(this.state.direction === 'left') {
                    this.state.faune.anims.play(`faune-idle-side`, true);
                    this.state.faune.scaleX = -1
                    }
                    else {
                    this.state.faune.anims.play(`faune-idle-side`, true);
                    }
                } 
                  this.state.faune.setVelocityX(0);
                  this.state.faune.setVelocityY(0);
                }

    }

}
