import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const miDiv = useRef(null)

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event

      setPosition({ x: clientX, y: clientY })
    }
    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      console.log('clean')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  return (
    <main>
      <div
        ref={miDiv}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          opacity: 0.2,
          borderRadius: '50%',
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 45,
          height: 45,

          transform: `translate(${position.x}px,${position.y}px)`
        }}
      ></div>
      <button
        onClick={() => {
          setEnable(!enable)
          enable
            ? miDiv.current.classList.add('inactive')
            : miDiv.current.classList.remove('inactive')
        }}
      >
        {enable ? 'Disable' : 'Enable'} Mouse Follower
      </button>
    </main>
  )
}

export default App
