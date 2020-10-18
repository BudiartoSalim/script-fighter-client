import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}    

	preload()
    {
        this.load.image('tiles', './tiles/dungeon_tiles.png')
        this.load.tilemapTiledJSON('dungeon', './tiles/dungeon-01.json')
        this.load.atlas('faune', './character/faune.png', './character/faune.json')
    }

    create()
    {

        let map = this.make.tilemap({ key: 'dungeon'}) //"dungeon" is from dungeon JSON file that we load
        let tileset = map.addTilesetImage('dungeon', 'tiles')//  "tiles" is from the IMAGE dungeon tiles  
        // console.log(map)
        // console.log(tileset)
        // this.add.text(0 , 0 , 'data')

        map.createStaticLayer('Ground', tileset)
        let wallsLayer = map.createStaticLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true })

        let debugGraphics = this.add.graphics().setAlpha(0.75)
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
