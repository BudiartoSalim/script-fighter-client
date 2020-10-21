


export default function preload() {

  this.load.audio('nyan', './audio/nyan.mp3')
  this.load.audio('victory', './audio/victory.wav')
  this.load.audio('lose', './audio/lose.wav')
  let my = this.state
  this.state.username = localStorage.getItem('username')   
  let stat = JSON.parse(localStorage.getItem('userStatus')) //getting data user
  let mons = JSON.parse(localStorage.getItem('monster')) //getting data monster

  if(localStorage.getItem('x') && localStorage.getItem('y')) {
    my.lastPosition.x = Number(Math.floor(localStorage.getItem('x')))
    my.lastPosition.y = Number(Math.floor(localStorage.getItem('y')))
  }
  
  my.userStatus.level = stat.level
  my.userStatus.hp = stat.hp
  my.userStatus.atk = stat.atk
  my.userStatus.def = stat.def
  my.userStatus.experience = stat.collectedExp
  my.userStatus.money = stat.money
  my.userStatus.requiredExp = stat.requiredExp
  my.userStatus.reputation = stat.reputation
  my.userStatus.difficulty = stat.currentDifficulty
  my.listMons = mons.monsters
  my.question = mons.questions
  my.statusBattle = localStorage.getItem('statusbattle')
  
  localStorage.removeItem('x')
  localStorage.removeItem('y')
  localStorage.removeItem('monster-now')
  localStorage.removeItem('question')
  localStorage.removeItem('statusbattle')
  
  this.load.image('scroll', '/icon/scroll_3.png')
  this.load.image('board', '/bg/bgwhite.png')
  this.load.image('tiles', '/tiles/dungeon_tiles.png')
  this.load.image('outdoor-tiles', '/tiles/nature-env.png')
  this.load.image('grass-tiles', '/tiles/grass.png')
  this.load.image('street-tiles', '/tiles/grass-style-2.png')
  this.load.image('buildings-tiles', '/tiles/buildings.png')

  this.load.tilemapTiledJSON('dungeon', '/tiles/dungeon-02.json')
  this.load.tilemapTiledJSON('nature-env', '/tiles/dungeon-02.json')
  this.load.tilemapTiledJSON('grass-env', '/tiles/dungeon-02.json')
  this.load.tilemapTiledJSON('street-env', '/tiles/dungeon-02.json')
  this.load.tilemapTiledJSON('buildings-env', '/tiles/dungeon-02.json')

  this.load.atlas('faune', '/character/faune.png', '/character/faune.json')
  this.load.spritesheet('tree','/moving-object/tree-top.png', {frameWidth : 100, frameHeight: 74})
  this.load.spritesheet('brown-monster','/moving-object/brown-monster.png', {frameWidth : 32, frameHeight: 35})
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
  // this.load.spritesheet('character', '/character/converted-faune-walkv2.png', {frameWidth : 24, frameHeight: 32})
}