import React from 'react'
import '@styles/style.css'
import PointAndShoot from '@animations/pointAndShoot'

const IndexPage = () => {
  setTimeout(() => {
    PointAndShoot()
  }, 10)

  return (
    <main>
      <div id="container">
        <canvas id="collisionCanvas"></canvas>
        <canvas id="canvasForPointAndShoot"></canvas>
      </div>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Freakin' Ravens!</title>
