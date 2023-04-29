import * as THREE from 'three'
    import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber'
import { DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three'
import { CameraController } from '../utils/cameraController'
import { BufferFigure } from './bufferGeometry'
import { ContactShadows, Stats, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { IntroLayout } from './IntroLayout'
import { Car } from './Car'
import { Bloom, DepthOfField, EffectComposer, Noise, Select, Selection, SelectiveBloom, Vignette } from '@react-three/postprocessing'




function Box(props:any) {
  const [hovered, hover]:any = React.useState(null)
  return (
    <Select enabled={hovered} >
      <mesh {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <boxGeometry args={[5,5,5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Select>
  )
}


export const Scene = () => {

return (
    <Canvas shadows camera={{position:[0,1,7]}}     onCreated={({ gl }) => {
      const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8)
      gl.clippingPlanes = [plane]
      gl.localClippingEnabled = true
      gl.physicallyCorrectLights = true
      gl.info.autoReset = false;
    
    } }>
          {/*<Selection>
<EffectComposer multisampling={0} >
          <SelectiveBloom
        
        mipmapBlur radius={0.05} luminanceThreshold={0.2} intensity={10}
     
      
          luminanceSmoothing={0.025} 
         
         
          />
       
    
</EffectComposer>

      <Box position={[0,3,0]} />
  </Selection>*/}
        <CameraController />




<Car />

   <IntroLayout />
    <Stats />

  </Canvas>
)

}

/*    args = {{autoForward: false,
 dragToLook: true, movementSpeed: 20,
 rollSpeed: 0,
 activeLook:false,
 lookSpeed:0.5
}}*/