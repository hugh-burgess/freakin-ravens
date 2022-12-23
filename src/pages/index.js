import React from 'react'
import icon from '@public/images/icon.png'
import dog from '@public/images/shadow_dog.png'
import '@styles/style.css'

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

const IndexPage = () => {
  setTimeout(() => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    const CANVAS_WIDTH = (canvas.width = 600)
    const CANVAS_HEIGHT = (canvas.height = 600)
    const SPRITE_WIDTH = 575 // width of svg of player divided by total columns in images + 2px margin
    const SPRITE_HEIGHT = 523 // height of svg of player divided by total rows in images
    const PLAYER_IMAGE = new Image()
    PLAYER_IMAGE.src = dog
    let frameX = 0
    let frameY = 0

    // slow the animation down
    let gameFrame = 0
    const STAGGER_FRAMES = 3 // lower is faster, higher is slower

    function animate() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
      // create a simple rectangle with positionX, positionY, width, height
      // ctx.fillRect(50, 50, 100, 100) // x here is the positionX, and then with x++ we iterate by 1 per loop

      // ctx.drawImage(PLAYER_IMAGE, sourceImageX, sourceImageY, sourceImageWidth, sourceImageHeight, destinationX, destinationY, destinationWidth, destinationHeight)
      ctx.drawImage(
        PLAYER_IMAGE,
        frameX * SPRITE_WIDTH, // moving the width from 1 frame to the next by the width of the image
        frameY * SPRITE_HEIGHT,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        0,
        0,
        SPRITE_WIDTH, // setting it here to the original width of the single cropped image
        SPRITE_HEIGHT, // setting it here to the original height of the single cropped image
      )
      if (gameFrame % STAGGER_FRAMES === 0) {
        if (frameX < 6) {frameX++} else frameX = 0
      }

      gameFrame++
      requestAnimationFrame(animate) // built in, runs once, but adding "animate" runs the parent funciton and thus a loop
    }
    animate() // calls the function and renders the shape
  }, 10)

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Hugh's Little Game</h1>
      <p style={paragraphStyles}>Let's play!</p>
      <canvas id="canvas1"></canvas>
      <img alt="Gatsby G Logo" src={icon} />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Hugh's Little Game</title>
