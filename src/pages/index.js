import React from 'react'
import '@styles/style.css'
import Dog from '@animations/dog'
import Controls from "@components/Controls"
import Background from '@animations/background'

const IndexPage = () => {
  setTimeout(() => {
    Background()
    // Dog()
  }, 10)

  return (
    <main className="pageStyles">
      <h1 className="headingStyles">Dog Animations</h1>
      <canvas id="canvas1"></canvas>
      <Controls />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Hugh's Dog</title>
