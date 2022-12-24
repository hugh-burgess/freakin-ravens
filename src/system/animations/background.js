import layer1 from '@images/layer-1.png'
import layer2 from '@images/layer-2.png'
import layer3 from '@images/layer-3.png'
import layer4 from '@images/layer-4.png'
import layer5 from '@images/layer-5.png'

const Background = () => {
  const CANVAS = document.getElementById('canvas1')
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
  let x = 0
  let x2 = 2400
  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
    ctx.drawImage(BACKGROUND_LAYER_4, x, 0)
    ctx.drawImage(BACKGROUND_LAYER_4, x2, 0)
    if (x < -2400) {
      x = 2400 - gameSpeed
    } // reset when the background leaves the screen
    else {
      x -= gameSpeed
    }
    if (x2 < -2400) {
      x2 = 2400 - gameSpeed
    } // reset when the background leaves the screen
    else {
      x2 -= gameSpeed
    }
    requestAnimationFrame(animate) // built in, runs once, but adding "animate" runs the parent funciton and thus a loop
  }
  return animate()
}

export default Background
