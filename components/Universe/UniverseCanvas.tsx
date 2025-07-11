'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Stars from './Stars'

export default function UniverseCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  )
}