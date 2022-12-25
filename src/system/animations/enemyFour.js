import enemyImageFour from '@images/enemy4.png'
import { textChangeRangeIsUnchanged } from 'typescript'

const EnemyFour = () => {
  /** @type {HTMLCanvasElement} */ // tells JS this is a canvas project and thus we get options for ctx
  const CANVAS = document.getElementById('canvas3')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = 400)
  const CANVAS_HEIGHT = (CANVAS.height = 800)
  const NUMBER_OF_ENEMIES = 5
  const ENEMIES_ARRAY = []

  let gameFrame = 0

  //   const ENEMY_1 = {
  //     x: 10, // the vertical and horizontal positions where we draw the enemy
  //     y: 10,
  //     width: 100,
  //     height: 100,
  //   }

  class Enemy {
    // a factory which generates one new object everytime we ask it
    constructor() {
      // mandatory class every Class must have containing a blueprint based on which every enemy is created
      this.image = new Image()
      this.image.src = enemyImageFour
      this.speed = Math.random() * 4 + 1 // creates a speed between 1 and 5 pixels per frame
      this.spriteWidth = 213
      this.spriteHeight = 213
      this.width = this.spriteWidth / 2.5 // one third of sprite width
      this.height = this.spriteHeight / 2.5 // one third of sprite height
      this.x = Math.random() * (CANVAS.width - this.width) // randomise the enemy starting position
      this.y = Math.random() * (CANVAS.height - this.height)
      this.newX = Math.random() * (CANVAS.width - this.width)
      this.newY = Math.random() * (CANVAS.height - this.height)
      this.frame = 0
      this.flapSpeed = Math.floor(Math.random() * 3 + 1) // random number between 1 and 4
      this.interval = Math.floor(Math.random() * 200 + 50) // random interval between 50 and 250
    }
    update() {
      if (gameFrame % this.interval === 0) { // resets every this.interval frames
        this.newX = Math.random() * CANVAS.width
        this.newY = Math.random() * CANVAS.height
      }
      let dx = this.x - this.newX // get difference between x and new position X
      let dy = this.y - this.newY
      this.x -= dx/70 // move them towards newY from x
      this.y -= dy/70

      if (this.x + this.width < 0) this.x = CANVAS.width // if the enemy is past the left side, reset to the right side

      // animate sprites
      if (gameFrame % this.flapSpeed === 0) {
        // runs code every twoo loops of every animatioon loop
        this.frame > 7 ? (this.frame = 0) : this.frame++
      }
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  }

  // const ENEMY_1 = new Enemy() // setting the constant to an instance of the new Enemy Class

  // create many random enemy count
  for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
    ENEMIES_ARRAY.push(new Enemy())
  }

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
    // ENEMY_1.update()
    // ENEMY_1.draw()
    ENEMIES_ARRAY.forEach((enemy) => {
      enemy.update()
      enemy.draw()
    })
    gameFrame++
    requestAnimationFrame(animate) // calls the animation loop and passes the function that surrounds it
  }

  return animate()
}

export default EnemyFour
