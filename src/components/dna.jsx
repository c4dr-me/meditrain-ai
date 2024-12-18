import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cylinder, Sphere } from '@react-three/drei'

const DNA = ({ mousePosition }) => {
  const dnaRef = useRef()

  useFrame(({ clock }) => {
    if (dnaRef.current) {
      const elapsedTime = clock.getElapsedTime()
      dnaRef.current.rotation.y = elapsedTime * 1
      dnaRef.current.rotation.x = mousePosition.x * 0.5 + Math.sin(elapsedTime) * 0.2
      dnaRef.current.rotation.z = mousePosition.y * 0.3 + Math.cos(elapsedTime) * 0.1
    }
  })

  return (
    <group ref={dnaRef} scale={[2.5, 2.5, 2.5]}>
      {[...Array(20)].map((_, i) => (
        <group key={i} position={[0, i - 10, 0]} rotation={[0, (i * Math.PI) / 8, 0]}>
          <Sphere args={[0.4, 128, 128]} position={[-1.2, 0, 0]}>
            <meshStandardMaterial color="#1f2937" />
          </Sphere>
          <Sphere args={[0.4, 128, 128]} position={[1.2, 0, 0]}>
            <meshStandardMaterial color="#1f2937" />
          </Sphere>
          <Cylinder args={[0.15, 0.15, 2.4, 128]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#fff" />
          </Cylinder>
        </group>
      ))}
    </group>
  )
}

DNA.propTypes = {
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
}

const DNAAnimation = ({ mousePosition }) => {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 65 }} antialias pixelRatio={window.devicePixelRatio}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <DNA mousePosition={mousePosition} />
        </Canvas>
  )
}

DNAAnimation.propTypes = {
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
}

export default DNAAnimation