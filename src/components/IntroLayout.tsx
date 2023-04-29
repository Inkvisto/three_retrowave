import { GridHelperProps, useFrame, useThree, } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three'
import  '../index.css'

import { BakeShadows, ContactShadows, Html, useGLTF, useHelper, useTexture } from '@react-three/drei';
import { Plates} from './plates';
import { Mountains } from './Mountains';
import { Starfield } from './Starfield';
import { Sun } from './Sun';



export const IntroLayout = () => {
  const { gl } = useThree()



  const landBox = React.useRef<any>(null)
  

  
 
  const roadColor = new THREE.Color("rgb(54, 47, 53)")
/*useFrame(()=>{
  landBox.current.translateZ(0.08)
 if(landBox.current.position.z > -20){
  landBox.current.translateZ(-20)
 }
 
})*/


/*const texture = useTexture('/floor.jpg')
texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // CHANGED
 texture.offset.set( 0, 0.5 ); // CHANGED
texture.repeat.set( 3, 3 ); // CHANGED*/

  function ClippingPlane() {
   


    React.useEffect(() => {
      //stats
     
      // Save previous defaults 
      const { clippingPlanes, localClippingEnabled } = gl
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 3)
   
      
      gl.clippingPlanes = [plane]
      gl.localClippingEnabled = true
      // Go back to defaults on unmount
      return () => {Object.assign(gl, { clippingPlanes, localClippingEnabled})}
    }, [])
   
    
    return null
  }


const {memory,programs,render} = gl.info
console.log(gl.renderLists);

    return (
        <>
     <Html wrapperClass='child'>
 
  <ul>
  <h4 className='memory'>Memory:</h4>
  <li className='list'>
      geometries:{memory.geometries}
     
  </li>
  <li className='list'>
  textures:{memory.textures}
     
  </li>
  <h4 className='programs'>Programs:</h4>
  <li className='list'>
      names:{programs?.map((e:any)=><div>{e.name}</div>)}
     
  </li>

  <h4 className='render'>Render:</h4>
  <li className='list'>
      calls:{render.calls}
     
  </li>
  <li className='list'>
  frame:{render.frame}
     
  </li>
  <li className='list'>
  lines:{render.lines}
     
  </li>
  <li className='list'>
  points:{render.points}
     
  </li>
  <li className='list'>
  triangles:{render.triangles}
     
  </li>



  </ul>
</Html>
        <ClippingPlane />
        
   
       
          
        <Starfield />
    <Mountains />  
     
 
<Sun />
         <group  ref={landBox} position={[0,0,-60]}> 
        
       <Plates />
       
   
 {/*  <hemisphereLight intensity={0.2} />
 <ambientLight intensity={0.2} />*/}
  <ambientLight intensity={2} />
        <mesh position={[0,0,0]} rotation={[-1.57,0,0]} >
            <planeBufferGeometry attach="geometry" args={[160, 180, 1]} />
            <meshStandardMaterial attach="material" color={roadColor} />
           
      </mesh>
        </group>
     
        <group position={[0,-0.1,-60]}>
        
        </group>
        </>
    )
}