import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}    

	preload()
    {
        
    }

    create()
    {
       const map = this.make.tilemap({ key: 'dungeon' }) //"dungeon" is from dungeon JSON file that we load
       const tileset = map.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  

       map.createStaticLayer('Ground', tileset)
       const wallsLayer = map.createStaticLayer('Walls', tileset)

       wallsLayer.setCollisionByProperty({ collides: true })

       const debugGraphics = this.add.graphics().setAlpha(0.75)
       wallsLayer.renderDebug(debugGraphics, {
           tileColor: null,
           collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
           faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

    }

    update () 
    {

    }
}
