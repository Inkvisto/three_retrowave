import { Html, useHelper } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import React from 'react'
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import { colorMixer } from '../utils/color'
import '../index.css'

colorMixer([227, 32, 198], [0,0,0], 0.5);
console.log(colorMixer([227, 32, 198], [0,0,0], 0.5));



export const Sun = () => {
  const [color,setColor] = React.useState("#e320c6")



  const state = useThree()
     
    const sun = React.useRef<any>(null)
    const directionalLight = React.useRef<any>(null)

    const target = new THREE.Object3D()
    target.position.set(0,0,0)
    state.scene.add(target)

  useHelper(directionalLight,DirectionalLightHelper)
    return(
     <>
     <Html wrapperClass='sunColor'>
     <span className="colorPicker">Sun<input name="sunColor" type="color" value={color} onChange={e => {setColor( e.target.value)} 
} /></span>
     </Html>
   
    
            <mesh position={[0,5,-150]} ref={sun} >
        <directionalLight ref={directionalLight} color={new THREE.Color(color)} intensity={12} position={[0, 7, 10]}  />
        <sphereGeometry args={[40,40,30]} />
         <meshBasicMaterial color={'orange'} />
      </mesh>
      </>
         
    )
}