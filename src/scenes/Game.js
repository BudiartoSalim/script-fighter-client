import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
        super('game')
        this.state = {
            faune: '', //faune is the character's name
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
	}    

	preload()
    {   

        setTimeout(() => {
            this.state.username = 'character'
        }, 2000)
        // console.log(JSON.parse(localStorage.getItem('userstatus')))
        // this.state.username = localStorage.getItem('username')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')
        // this.state.userStatus.level = localStorage.getItem('userstatus')


        var progress = this.add.graphics();
                
        this.load.on('progress', function (value) {
            console.log('progress kepanggil')
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);
            
        });
        
        
        this.load.on('complete', function () {
            progress.destroy();
            
        });

        this.load.image('tiles', '/tiles/dungeon_tiles.png')
        this.load.image('outdoor-tiles', '/tiles/nature-env.png')
        this.load.tilemapTiledJSON('dungeon', '/tiles/dungeon-02.json')
        this.load.tilemapTiledJSON('nature-env', '/tiles/dungeon-02.json')
        this.load.atlas('faune', '/character/faune.png', '/character/faune.json')
        // this.load.spritesheet('character', '/character/converted-faune-walkv2.png', {frameWidth : 24, frameHeight: 32})
    }

    create()
    {

        let dungeon = this.make.tilemap({ key: 'dungeon'}) //"dungeon" is from dungeon JSON file that we load
        
        let tileset = dungeon.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  
        
        dungeon.createStaticLayer('Ground', tileset)
        dungeon.createStaticLayer('Dungeon-Properties', tileset)
        


 
        //////////////

        let outdoor = this.make.tilemap({ key: 'nature-env'})

        let tileSet2 = outdoor.addTilesetImage('nature-env', 'outdoor-tiles')

        outdoor.createStaticLayer('Ground', tileSet2)
        outdoor.createStaticLayer('More-Grass', tileSet2)
        outdoor.createStaticLayer('Properties', tileSet2)



        let wallsLayer = dungeon.createStaticLayer('Walls', tileset)
        
        wallsLayer.setCollisionByProperty({ collides: true })
        
        this.state.faune = this.physics.add.sprite(100,100, 'faune', 'sprites/walk-down/walk-down-3.png')

        let debugGraphics = this.add.graphics().setAlpha(0.75)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

       //idle position
       this.anims.create({
        key:'faune-idle-down', // config for the animation
        frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-down-3.png'}]
    })

    this.anims.create({
        key:'faune-idle-up', 
        frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-up-3.png'}]
    })

    this.anims.create({
        key:'faune-idle-side',
        frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-side-3.png'}]
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
        } 
        else if (this.state.cursors.left.isDown) {
            this.state.faune.setVelocityX(-walk);
            this.state.faune.setVelocityY(0);
            this.state.faune.anims.play('faune-walk-side', true);
            this.state.faune.scaleX = -1
        } 
        else if (this.state.cursors.right.isDown && this.state.cursors.run.isDown ) {
            this.state.faune.setVelocityX(run);
            this.state.faune.setVelocityY(0);
            this.state.faune.anims.play('faune-run-side', true);
            this.state.faune.scaleX = 1
          } 
        else if (this.state.cursors.right.isDown) {
            this.state.faune.setVelocityX(walk);
            this.state.faune.setVelocityY(0);
            this.state.faune.anims.play('faune-walk-side', true);
            this.state.faune.scaleX = 1
        } 
        else if (this.state.cursors.up.isDown && this.state.cursors.run.isDown ) {
                this.state.faune.setVelocityY(-run);
                this.state.faune.setVelocityX(0);
                this.state.faune.anims.play('faune-run-up', true);
            } 
        else if (this.state.cursors.up.isDown)  {
            this.state.faune.setVelocityY(-walk);
            this.state.faune.setVelocityX(0);
            this.state.faune.anims.play('faune-walk-up', true);
            }
        else if (this.state.cursors.down.isDown && this.state.cursors.run.isDown ) {
                this.state.faune.setVelocityY(run);
                this.state.faune.setVelocityX(0);
                this.state.faune.anims.play('faune-run-down', true);
            }
        else if (this.state.cursors.down.isDown) {
            this.state.faune.setVelocityY(walk);
            this.state.faune.setVelocityX(0);
            this.state.faune.anims.play('faune-walk-down', true);
            }
        else 
            {
                this.state.faune.setVelocityX(0);
                this.state.faune.setVelocityY(0)
                this.state.faune.anims.play(this.state.faune, true);
            }

    }

}
