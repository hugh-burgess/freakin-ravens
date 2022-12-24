import React from 'react'
import dog from '@images/shadow_dog.png'
import dog_animation_database from '@system/animations/database'
import '@styles/style.css'

const IndexPage = () => {
  setTimeout(() => {
    let playerState = 'idle'
    const DROPDOWN = document.getElementById('animations')
    DROPDOWN.addEventListener('change', function (e) {
      playerState = e.target.value
    })

    const CANVAS = document.getElementById('canvas1')
    const ctx = CANVAS.getContext('2d')
    const CANVAS_WIDTH = (CANVAS.width = 600)
    const CANVAS_HEIGHT = (CANVAS.height = 600)
    const SPRITE_WIDTH = 575 // width of svg of player divided by total columns in images + 2px margin
    const SPRITE_HEIGHT = 523 // height of svg of player divided by total rows in images
    const PLAYER_IMAGE = new Image()
    PLAYER_IMAGE.src = dog

    // slow the animation down
    let gameFrame = 0
    const STAGGER_FRAMES = 4 // lower is faster, higher is slower
    const SPRITE_ANIMATIONS = []
    const ANIMATION_STATES = dog_animation_database

    ANIMATION_STATES.forEach((state, index) => {
      let frames = {
        loc: [],
      }
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * SPRITE_WIDTH
        let positionY = index * SPRITE_HEIGHT
        frames.loc.push({ x: positionX, y: positionY })
      }
      SPRITE_ANIMATIONS[state.name] = frames // create a new key value in SPRITE_ANIMATIONS, call it by the name of the looped object and assign it the value of frames.loc which is the relevant positions given for that animation
    })

    function animate() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
      let position =
        Math.floor(gameFrame / STAGGER_FRAMES) %
        SPRITE_ANIMATIONS[playerState].loc.length // each row has total of 6 seen images without blank spaces afterwards, e.g. image 8 on row 1. This calculation only cycles between 0 and the number given.
      let frameX = SPRITE_WIDTH * position
      let frameY = SPRITE_ANIMATIONS[playerState].loc[position].y
      // ctx.drawImage(PLAYER_IMAGE, sourceImageX, sourceImageY, sourceImageWidth, sourceImageHeight, destinationX, destinationY, destinationWidth, destinationHeight)
      ctx.drawImage(
        PLAYER_IMAGE,
        frameX, // moving the width from 1 frame to the next by the width of the image
        frameY,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        0,
        0,
        SPRITE_WIDTH, // setting it here to the original width of the single cropped image
        SPRITE_HEIGHT // setting it here to the original height of the single cropped image
      )

      // if (gameFrame % STAGGER_FRAMES === 0) {
      //   if (frameX < 6) {frameX++} else frameX = 0
      // } <-- We can refactor this better!

      gameFrame++
      requestAnimationFrame(animate) // built in, runs once, but adding "animate" runs the parent funciton and thus a loop
    }
    animate() // calls the function and renders the shape
  }, 10)

  return (
    <main className="pageStyles">
      <h1 className="headingStyles">Dog Animations</h1>
      <canvas id="canvas1"></canvas>
      <div className="controls">
        <label for="animations">Choose animation: </label>
        <select id="animations" name="animations">
          <option value="idle">Idle</option>
          <option value="jump">Jump</option>
          <option value="fall">Fall</option>
          <option value="run">Run</option>
          <option value="dizzy">Dizzy</option>
          <option value="rest">Rest</option>
          <option value="roll">Roll</option>
          <option value="bite">Bite</option>
          <option value="dead">Dead</option>
          <option value="hit">Hit</option>
        </select>
      </div>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Hugh's Dog</title>
