import enemyImageOne from '@images/enemy1.png'
import enemyImageTwo from '@images/enemy2.png'
import enemyImageThree from '@images/enemy3.png'
import enemyImageFour from '@images/enemy4.png'

const Enemies = () => {
  /** @type {HTMLCanvasElement} */ // tells JS this is a canvas project and thus we get options for ctx
  const CANVAS = document.getElementById('canvas3')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = 400)
  const CANVAS_HEIGHT = (CANVAS.height = 800)
  const NUMBER_OF_ENEMIES = 100
  const ENEMIES_ARRAY = []

  const ENEMY_IMAGE_2 = new Image()
  ENEMY_IMAGE_2.src = enemyImageTwo
  const ENEMY_IMAGE_3 = new Image()
  ENEMY_IMAGE_3.src = enemyImageThree
  const ENEMY_IMAGE_4 = new Image()
  ENEMY_IMAGE_4.src = enemyImageFour

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
      this.image.src = enemyImageOne
      this.x = Math.random() * CANVAS.width // randomise the enemy starting position
      this.y = Math.random() * CANVAS.height
      this.speed = Math.random() * 4 - 2 // creates a speed between -2 and +2
      this.spriteWidth = 293
      this.spriteHeight = 155
      this.width = this.spriteWidth / 3 // one third of sprite width
      this.height = this.spriteHeight / 3 // one third of sprite height
      this.frame = 0
      this.flapSpeed = Math.floor(Math.random() * 3 + 1) // random number between 1 and 4
    }
    update() {
      // a shared class method
      this.x += this.speed
      this.y += this.speed
      // animate sprites
      if (gameFrame % this.flapSpeed === 0) { // runs code every twoo loops of every animatioon loop
          this.frame > 4 ? this.frame = 0 : this.frame++
      }
    }
    draw() {
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
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

export default Enemies
