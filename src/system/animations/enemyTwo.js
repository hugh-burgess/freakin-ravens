import enemyImageTwo from '@images/enemy2.png'

const EnemyTwo = () => {
  /** @type {HTMLCanvasElement} */ // tells JS this is a canvas project and thus we get options for ctx
  const CANVAS = document.getElementById('canvas3')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = 400)
  const CANVAS_HEIGHT = (CANVAS.height = 800)
  const NUMBER_OF_ENEMIES = 30
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
      this.image.src = enemyImageTwo
      this.speed = Math.random() * 4 + 1 // creates a speed between 1 and 5 pixels per frame
      this.spriteWidth = 266
      this.spriteHeight = 188
      this.width = this.spriteWidth / 2.5 // one third of sprite width
      this.height = this.spriteHeight / 2.5 // one third of sprite height
      this.x = Math.random() * (CANVAS.width - this.width) // randomise the enemy starting position
      this.y = Math.random() * (CANVAS.height - this.height)
      this.frame = 0
      this.flapSpeed = Math.floor(Math.random() * 3 + 1) // random number between 1 and 4
      this.angle = 0
      this.angleSpeed = Math.random() * 0.2 // set between 0 and 0.2
      this.curve = Math.random() * 5
    }
    update() {
      // a shared class method
      this.x -= this.speed

      // add a sine wave for  up and down motion
      this.y += this.curve * Math.sin(this.angle) // values cycle between -5 and +5
      this.angle += this.angleSpeed

      //this.y -= this.speed
      if (this.x + this.width < 0) this.x = CANVAS.width // if the enemy is past the left side, reset to the right side
      // animate sprites
      if (gameFrame % this.flapSpeed === 0) {
        // runs code every twoo loops of every animatioon loop
        this.frame > 4 ? (this.frame = 0) : this.frame++
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

export default EnemyTwo
