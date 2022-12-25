import explosionImage from '@images/boom.png'
import boomSound from "@sounds/boom.wav"

const Explosions = () => {
  const CANVAS = document.getElementById('canvasForExplosions')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = 500)
  const CANVAS_HEIGHT = (CANVAS.height = 700)
  const EXPLOSIONS = []
  let canvasPosition = CANVAS.getBoundingClientRect() // provides info on the object and info about its size relative to the viewport

  //   ctx.fillStyle = 'white' // sets all canvas shapes to white
  //   ctx.fillRect(50,50,100,150)

  class Explosion {
    constructor(x, y) {
      this.spriteWidth = 200
      this.spriteHeight = 179
      this.width = this.spriteWidth * 0.7 // more performance effective to use multiply than divide here
      this.height = this.spriteHeight * 0.7
      // x and y come from the outside at a specific location
      // positionX,  positionY below
      this.x = x
      this.y = y
      this.image = new Image()
      this.image.src = explosionImage
      this.frame = 0
      this.timer = 0
      this.angle = Math.random() * 6.2 // 360° is roughly 6.2 radiants
      this.sound = new Audio()
      this.sound.src = boomSound
    }
    update() {
        if (this.frame === 0) this.sound.play() // play the sound on the first frame of the image only
      this.timer++
      if (this.timer % 5 === 0) {
        // this slows down the animation, the timer has to increase 5 times, before frame can move forward once
        this.frame++
      }
    }
    draw() {
      // we can make the explosion rotate with translate
      ctx.save() // this saves the state of canvas for one draw call
      
      ctx.translate(this.x, this.y) // rotates around its center
      ctx.rotate(this.angle)

      ctx.drawImage(
        this.image, // image to render
        this.spriteWidth * this.frame, // cycles through each image in the row of images
        0, // y axis
        this.spriteWidth, // width of image
        this.spriteHeight, // height of image
        0 - this.width / 2, // desination x axis, values already captured in ctx.translate(), with offset
        0 - this.height / 2, // destination y axis, values already captured in ctx.translate(), with offset
        this.width, // width of destination
        this.height // height of destination
      )
      ctx.restore() // restores back to the latest ctx.save so only one draw call is affected at one time
    }
  }
  window.addEventListener('click', function (e) {
    createAnimation(e)
  })

  function createAnimation(e) {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    // ctx.draw(x, y, width, height)
    //ctx.fillStyle = 'white'
    //ctx.fillRect(positionX - 25, positionY - 25, 50, 50) // using canvasPosition to offset the image under the mouse when clicked

    // we will push the explosion into the array and when the images have all run, its removed and deleted from the array
    EXPLOSIONS.push(new Explosion(positionX, positionY))
  }

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for (let i = 0; i < EXPLOSIONS.length; i++) {
      EXPLOSIONS[i].update()
      EXPLOSIONS[i].draw()
      // now we remove the explosion from the array if the frame property is higher than the total images in the png row
      if (EXPLOSIONS[i].frame > 5) {
        EXPLOSIONS.splice(i, 1) // looks for the index, removes 1
        i-- // this correctly updates the index of the next explosion in the array when its sibling was just deleted
      }
    }
    requestAnimationFrame(animate)
  }
  animate()
}

export default Explosions
