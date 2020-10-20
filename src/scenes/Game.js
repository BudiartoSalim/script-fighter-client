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
            listMons: [],
            question: [],
            mons: {},
            username: '',
            lastPosition: {
                x: 100,
                y: 100
            },
            coordinate: [{x: 670, y:150 },{x:350 , y: 230 },{x:100 , y:300 },{x: 200 , y:150 },{x:120 , y:500 },{x: 420 , y:100 },{x: 250, y: 400 },{x: 450 , y: 330},{x: 630 , y: 350 },{x: 700 , y: 410}],
            userStatus: {
                level: 0,
                hp: 0,
                atk: 0,
                def: 0,
                experience: 0,
                money: 0,
                difficulty: 0,
                reputation: 0
            },
            statusBattle: '',
            statusBattleText : ''
        }
        this.preload = preload.bind(this);
	}    

    create()
    {   
        //dungeonTileSet is from dungeon tile set image (PNG)
        //outdoorTileSet is from outdoor tile set image (PNG)
        let dungeon = this.make.tilemap({ key: 'dungeon'}) //"dungeon" is from dungeon JSON file that we load
        let outdoor = this.make.tilemap({ key: 'nature-env'})
        let dungeonTileSet = dungeon.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  
        let outdoorTileSet = outdoor.addTilesetImage('nature-env', 'outdoor-tiles')

        // Creating Layer for Environment First Create is the Lowest Part
        dungeon.createStaticLayer('Ground', dungeonTileSet)
        dungeon.createStaticLayer('Dungeon-Properties', dungeonTileSet)
        outdoor.createStaticLayer('Ground', outdoorTileSet)
        outdoor.createStaticLayer('More-Grass', outdoorTileSet)
        outdoor.createStaticLayer('Properties', outdoorTileSet)

        //creating animation monster
        this.anims.create({
            key:'brown-monster',
            frames: this.anims.generateFrameNumbers('brown-monster', {start: 0, end: 3}),
            repeat: -1,
            frameRate: 14
        })

        //creating physics character
        this.state.faune = this.physics.add.sprite(this.state.lastPosition.x,this.state.lastPosition.y, 'faune', 'sprites/walk-down/walk-down-3.png')
        //set hitbox physics for character
        this.state.faune.body.setSize(15,20)

        // Initiate monster as much as Coordinate length
        for(let i = 0 ; i < this.state.coordinate.length ; i++){

            let visible = Math.floor(Math.random() * 20)
            
            if(visible > 7 && this.state.coordinate[i].x != localStorage.getItem('monster-position-x') && this.state.coordinate[i].y != localStorage.getItem('monster-position-y')) {
                let randMonster = Math.floor(Math.random() * this.state.listMons.length)

                // Creating Monster
                this.state.mons[this.state.listMons[randMonster].id] = this.physics.add.staticSprite(this.state.coordinate[i].x , this.state.coordinate[i].y , 'brown-monster', 'moving-object/brown-monster.png') 
                this.state.mons[this.state.listMons[randMonster].id].anims.play('brown-monster')
                this.state.mons[this.state.listMons[randMonster].id].id = this.state.listMons[randMonster].id
                this.state.mons[this.state.listMons[randMonster].id].body.setSize(10,20)
                
                // Adding Collider to Monster Created by Looping
                this.physics.add.collider(this.state.faune, this.state.mons[this.state.listMons[randMonster].id], () => {

                    // Save All Question & Battle Monster
                    localStorage.setItem('question', JSON.stringify(this.state.question))
                    localStorage.setItem('monster-now', JSON.stringify(this.state.listMons[randMonster]))
                    // Save Last Position User and Last Position Monster
                    localStorage.setItem('monster-position-x', this.state.coordinate[i].x)
                    localStorage.setItem('monster-position-y', this.state.coordinate[i].y)                    
                    localStorage.setItem('x', this.state.faune.body.center.x)
                    localStorage.setItem('y', this.state.faune.body.center.y)
                    
                    // Change page into /battle
                    window.location.href = '/battle'
                    // Destroy Monster Body
                    this.state.mons[this.state.listMons[randMonster].id].disableBody(true,true)
                })
            }
           
        }
        
        // Creating Roof Layer
        dungeon.createStaticLayer('Roof', dungeonTileSet)

        // Creating Walls for environment
        let wallsLayer = dungeon.createStaticLayer('Walls', dungeonTileSet)
        // Setting Collission for Walls
        wallsLayer.setCollisionByProperty({ collides: true }) // From Tiled application
        
        // Add Text for level
        this.add.text(0,0 , `level : ${this.state.userStatus.level}`)

        // Add Text status After Battle
        if(this.state.statusBattle) {
            this.state.statusBattleText = this.add.text(this.state.lastPosition.x - 35 ,this.state.lastPosition.y - 30, `You ${this.state.statusBattle}`)
        }

        // To See Hitbox for walls
        // let debugGraphics = this.add.graphics().setAlpha(0.75)
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });

        // Create Tree Object
        let tree1 = this.add.sprite(93,614, 'tree')
        let tree2 = this.add.sprite(205,582, 'tree')
        
        // Creating Animation for Tree
        this.anims.create({
            key:'treeanims',
            frames: this.anims.generateFrameNumbers( 'tree', {start: 0, end: 7}),
            repeat: -1,
            frameRate: 10
        })

        // Creating monster character
        // this.state.monster.brown = this.physics.add.staticSprite(x , y , 'brown-monster', 'moving-object/brown-monster.png') 
        // Set Size of Hitbox for Monster Character
        // this.state.monster.brown.body.setSize(10,20)
        // playing animation for monster character
        // this.state.monster.brown.anims.play('brown-monster')

        // Playing animation for tree
        tree1.anims.play('treeanims')
        tree2.anims.play('treeanims')

        //creating animation and set key for using the animation (Idle Animation)
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

        //creating animation and set key for using the animation (Move Animation)
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

        //adding camera movement (follow)

        this.cameras.main.startFollow(this.state.faune, true)


        // adding collider for wall and character (can't walk through wall)
        this.physics.add.collider(this.state.faune, wallsLayer)

        // adding keyboard input
        this.state.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            run: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        })

    }

    update ()   
    {
        //destroy text status if win / lose
        if(this.state.statusBattleText) {
            setTimeout(() => {
                this.state.statusBattleText.destroy()
            }, 1000)
        }
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
