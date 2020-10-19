


export default function preload() {
  this.load.image('tiles', '/tiles/dungeon_tiles.png')
  this.load.image('outdoor-tiles', '/tiles/nature-env.png')
  this.load.tilemapTiledJSON('dungeon', '/tiles/dungeon-02.json')
  this.load.tilemapTiledJSON('nature-env', '/tiles/dungeon-02.json')
  this.load.atlas('faune', '/character/faune.png', '/character/faune.json')
  this.load.spritesheet('tree','/moving-object/tree-top.png', {frameWidth : 100, frameHeight: 74})
  this.load.spritesheet('brown-monster','/moving-object/brown-monster.png', {frameWidth : 32, frameHeight: 35})
  // this.load.spritesheet('character', '/character/converted-faune-walkv2.png', {frameWidth : 24, frameHeight: 32})
}