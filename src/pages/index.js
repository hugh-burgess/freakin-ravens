import React from 'react'
import '@styles/style.css'
//import Dog from '@animations/dog'
import Background from '@animations/background'

const IndexPage = () => {
  setTimeout(() => {
    Background()
   // Dog()
  }, 10)

  return (
    <main className="pageStyles">
      <h1 className="headingStyles">Dog Animations</h1>
      <div id="container">
        <canvas id="canvas1"></canvas>
        {/* <canvas id="canvas2"></canvas> */}
        <p>
          Game speed: <span id="showGameSpeed"></span>
        </p>
        <input type="range" min="0" max="20" className="slider" id="slider" />
      </div>
      {/* <div className="controls">
        <label for="animations">Choose animation: 
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
        </label>
      </div> */}
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Hugh's Dog</title>
