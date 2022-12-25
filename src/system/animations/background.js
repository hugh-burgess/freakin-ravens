import layer1 from '@images/layer-1.png'
import layer2 from '@images/layer-2.png'
import layer3 from '@images/layer-3.png'
import layer4 from '@images/layer-4.png'
import layer5 from '@images/layer-5.png'

const Background = () => {
  const CANVAS = document.getElementById('canvasForBackground')
  const ctx = CANVAS.getContext('2d')
  const CANVAS_WIDTH = (CANVAS.width = 800)
  const CANVAS_HEIGHT = (CANVAS.height = 700)
  const BACKGROUND_LAYER_1 = new Image()
  BACKGROUND_LAYER_1.src = layer1
  const BACKGROUND_LAYER_2 = new Image()
  BACKGROUND_LAYER_2.src = layer2
  const BACKGROUND_LAYER_3 = new Image()
  BACKGROUND_LAYER_3.src = layer3
  const BACKGROUND_LAYER_4 = new Image()
  BACKGROUND_LAYER_4.src = layer4
  const BACKGROUND_LAYER_5 = new Image()
  BACKGROUND_LAYER_5.src = layer5
  let gameSpeed = 6
  // let gameFrame = 0

  // to make a group background, lets make a layer object with 5 instances of that layer class each of the layers. all images go into an array to be cycled through and drawn.
  // JS Classes are used when you want to create many similar objects

  class Layer {
    constructor(image, speedModifier) {
      // speedModifier is the speed of pixels per frame
      this.x = 0 // set x on this particular property to 0
      this.y = 0
      this.width = 2400
      this.height = 700
      this.image = image
      this.speedModifier = speedModifier
      this.speed = gameSpeed * this.speedModifier
    } //method is function attached to an object
    update() {
      this.speed = gameSpeed * this.speedModifier
      if (this.x <= -this.width) {
        this.x = 0
      }

      this.x = this.x - this.speed
      //this.x = gameFrame * this.speed % this.width

    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }

  const LAYER_1 = new Layer(BACKGROUND_LAYER_1, 0.2) // creates an instance of a custom JS Class
  const LAYER_2 = new Layer(BACKGROUND_LAYER_2, 0.4)
  const LAYER_3 = new Layer(BACKGROUND_LAYER_3, 0.6)
  const LAYER_4 = new Layer(BACKGROUND_LAYER_4, 0.8)
  const LAYER_5 = new Layer(BACKGROUND_LAYER_5, 1)

  const GAME_LAYERS = [LAYER_1, LAYER_2, LAYER_3, LAYER_4, LAYER_5]

const SLIDER = document.getElementById('slider')
SLIDER.value = gameSpeed
const SHOW_GAME_SPEED = document.getElementById('showGameSpeed')
SHOW_GAME_SPEED.innerHTML = gameSpeed
SLIDER.addEventListener('change', function(e){
gameSpeed = e.target.value
SHOW_GAME_SPEED.innerHTML = e.target.value

})

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
    GAME_LAYERS.forEach((layer) => {
      layer.update()
      layer.draw()
    })
    // gameFrame--
    requestAnimationFrame(animate) // built in, runs once, but adding "animate" runs the parent funciton and thus a loop
  }
  return animate()
}

export default Background
