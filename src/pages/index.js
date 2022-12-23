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
    const playerImage = new Image()
    playerImage.src = dog

    function animate() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clears the svg image between looping images
      // create a simple rectangle with positionX, positionY, width, height
      // ctx.fillRect(50, 50, 100, 100) // x here is the positionX, and then with x++ we iterate by 1 per loop

      // ctx.drawImage(playerImage, sourceImageX, sourceImageY, sourceImageWidth, sourceImageHeight, destinationX, destinationY, destinationWidth, destinationHeight)
      ctx.drawImage(
        playerImage,
        0,
        0,
      600,
        600,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      )

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
