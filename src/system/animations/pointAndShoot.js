import ravenImg from '@images/raven.png'
import explosionImage from '@images/boom.png'
import boomSound from '@sounds/boom.wav'
import cawSound from '@sounds/caw.wav'

const PointAndShoot = () => {
  const CANVAS = document.getElementById('canvasForPointAndShoot')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = window.innerWidth)
  const CANVAS_HEIGHT = (CANVAS.height = window.innerHeight)
  const COLLISION_CANVAS = document.getElementById('collisionCanvas')
  const COLLISION_CTX = COLLISION_CANVAS.getContext('2d')
  COLLISION_CANVAS.width = window.innerWidth
  COLLISION_CANVAS.height = window.innerHeight

  let timeToNextRaven = 0 // this will accumulate the time between frames until it reaches the interval value and triggers the next frame
  let ravenInterval = 500 // half a second
  let lastTimeFromPreviousLoop = 0
  let score = 0
  let gameStart = false
  let gameOver = false
  ctx.font = '50px Impact'

  let ravens = []
  class Raven {
    constructor() {
      this.spriteWidth = 271
      this.spriteHeight = 194
      this.sizeModifier = Math.random() * 0.6 + 0.4
      this.width = this.spriteWidth * this.sizeModifier
      this.height = this.spriteHeight * this.sizeModifier

      this.x = CANVAS_WIDTH // ravens spawn from right side
      this.y = Math.random() * (CANVAS_HEIGHT - this.height) // excluding the height of the raven so its not hidden below the height of the canvas

      this.directionX = Math.random() * 5 + 3 // between 3 and 8
      this.directionY = Math.random() * 5 - 2.5 // between -2.5 and +2.5
      this.frame = 0
      this.markedForDeletion = false
      this.image = new Image()
      this.image.src = ravenImg
      this.timeSinceFlap = 0
      this.flapInterval = Math.random() * 50 + 50

      this.randomColours = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ]
      this.colour = `rgb(${this.randomColours[0]}, ${this.randomColours[1]}, ${this.randomColours[2]}, 255)`
      this.hasTrail = Math.random() > 0.5 // Math.random generates a number between 0 and 1
    }
    update(deltaTime) {
      // reverse y direction if thhey touch the top or bottoom
      if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
        this.directionY = this.directionY * -1
      }

      this.x -= this.directionX // moves it left
      this.y += this.directionY

      if (this.x < 0 - this.width) this.markedForDeletion = true // if the enemy is past the left side, reset to the right side

      this.timeSinceFlap += deltaTime
      // animate ravens
      if (this.timeSinceFlap > this.flapInterval) {
        this.frame > 4 ? (this.frame = 0) : this.frame++
        this.timeSinceFlap = 0
        if (this.hasTrail) {
          for (let i = 0; i < 5; i++) {
            // adds nicer effect to the particle trailing effect
            // draw particles to follow ravens if hasTrail is true
            particles.push(
              new Particles(this.x, this.y, this.width, this.colour)
            )
          }
        }
      }
      // if a raven crosses the screen safely, end the game
      if (this.x < 0 - this.width) gameOver = true
    }
    draw() {
      COLLISION_CTX.fillStyle = this.colour
      COLLISION_CTX.fillRect(this.x, this.y, this.width, this.height)
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

  let pointAndShootExplosions = []

  class PointAndShootExplosions {
    constructor(x, y, size) {
      // depends on the raven clicked on
      this.image = new Image()
      this.image.src = explosionImage
      this.spriteWidth = 200
      this.spriteHeight = 179
      this.x = x
      this.y = y
      this.size = size
      this.frame = 0
      this.sound = new Audio()
      this.sound.src = boomSound
      this.cawSound = new Audio()
      this.cawSound.src = cawSound
      this.timeSinceLastFrame = 0
      this.frameInterval = 50 // speed of explosion animation
      this.markedForDeletion = false
    }
    update(deltaTime) {
      if (this.frame === 0) {
        this.sound.play()
        // speed up caw caw soound based on the size of the raven
        switch (true) {
          case Math.floor(this.size) < 200:
            this.cawSound.playbackRate = 2.0
            break
          default:
            this.cawSound.playbackRate = 1.0
        }
        this.cawSound.play()
      }
      this.timeSinceLastFrame += deltaTime
      if (this.timeSinceLastFrame > this.frameInterval) {
        this.frame++
        this.timeSinceLastFrame = 0
        if (this.frame > 5) this.markedForDeletion = true
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
        this.y - this.size / 4,
        this.size,
        this.size
      )
    }
  }

  let particles = []
  class Particles {
    constructor(x, y, size, colour) {
      this.size = size
      this.x = x + this.size / 2 // centers the particles to the raven
      this.y = y + this.size / 3 // centers the particles to the raven
      // for drawing circles
      this.radius = (Math.random() * this.size) / 10
      this.maxRadius = Math.random() * 20 + 35
      this.markedForDeletion = false
      this.speedX = Math.random() * 1 + 0.5
      this.colour = colour
    }
    update() {
      this.x += this.speedX
      this.radius += 0.8 // increase particles by 0.8 per frame - this could be performance expensive though - this.hasTrail handles this
      if (this.radius > this.maxRadius - 5) this.markedForDeletion = true // minusing 5 triggers the boolean sooner
    }
    draw() {
      ctx.save()
      // fade out the particles
      ctx.globalAlpha = 1 - this.radius / this.maxRadius // genius - as the particle grows, eventually this.radius / this.maxRadius is 1 and thus transparency (ctx.globalAlpha) is 0
      // draw a simple circle
      ctx.beginPath()
      ctx.fillStyle = this.colour
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fill() // fills the path with colour
      ctx.restore() // this wraps the globalAlpha from spilling over, it goes between save and restore only
    }
  }

  function drawScore() {
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 20, 75)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 23, 78)
  }

  function drawStartSign()
  {
    ctx.textAlign = 'center'
    ctx.fontSize = '100px Impact'
    ctx.fillStyle = 'black'
    ctx.fillText(
      'FREAKIN\' RAVENS!',
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2
    )
    ctx.fillStyle = 'white'
    ctx.fillText(
        'FREAKIN\' RAVENS!',
        CANVAS_WIDTH / 2 + 5,
        CANVAS_HEIGHT / 2 + 5
      )
  }
  function drawGameOver() {
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText(
      'GAME OVER! Final Score: ' + score,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2
    )
    ctx.fillStyle = 'white'
    ctx.fillText(
      'GAME OVER! Final Score: ' + score,
      CANVAS_WIDTH / 2 + 5,
      CANVAS_HEIGHT / 2
    )
  }
  
  window.addEventListener('click', (e) => {
    const DETECT_PIXEL_COLOR = COLLISION_CTX.getImageData(e.x, e.y, 1, 1)
    // detect colour between pointer and raven background colour
    const PIXEL_COLOUR = DETECT_PIXEL_COLOR.data
    ravens.forEach((raven) => {
      if (
        raven.randomColours[0] === PIXEL_COLOUR[0] &&
        raven.randomColours[1] === PIXEL_COLOUR[1] &&
        raven.randomColours[2] === PIXEL_COLOUR[2]
      ) {
        // collision detected
        raven.markedForDeletion = true
        score++
        pointAndShootExplosions.push(
          new PointAndShootExplosions(raven.x, raven.y, raven.width)
        )
      }
    })
  })

  function animate(timestamp) {
    // use timestamps to optimise speeds for different devices
    COLLISION_CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let deltaTime = timestamp - lastTimeFromPreviousLoop // time between this loop and saved timestamp of previous loop
    lastTimeFromPreviousLoop = timestamp
    timeToNextRaven += deltaTime // deltaTime shows us how much time passes for each frame depending on the device used
    if (timeToNextRaven > ravenInterval) {
      ravens.push(new Raven())
      timeToNextRaven = 0
      // sort ravens by size so smaller ones are behind bigger ones
      ravens.sort((a, b) => {
        return a.width - b.width
      })
    }

    let newData = [...particles, ...ravens, ...pointAndShootExplosions] // this draws particles first, then ravens then explosions over them
    newData.forEach((object) => object.update(deltaTime))
    newData.forEach((object) => object.draw())
    ravens = ravens.filter((object) => !object.markedForDeletion)
    particles = particles.filter((object) => !object.markedForDeletion)
    pointAndShootExplosions = pointAndShootExplosions.filter(
      (object) => !object.markedForDeletion
    )

    // if the game is not over, run animations
    if (!gameStart) {
      drawStartSign()
      requestAnimationFrame(animate)
      setTimeout(() => {
        gameStart = true
      }, 2000)
    } else {
      if (!gameOver && gameStart) {
        drawScore()
        requestAnimationFrame(animate)
      } else {
        drawGameOver()
      }
    }
  }
  return animate(0)
}

export default PointAndShoot
