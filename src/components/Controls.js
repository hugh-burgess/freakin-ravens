import React from 'react'

const Controls = () => {
  return (
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
  )
}

export default Controls
