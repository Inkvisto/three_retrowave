import * as THREE from 'three'
    import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { DoubleSide, Mesh, PerspectiveCamera } from 'three'
import { CameraController } from '../utils/cameraController'
import { BufferFigure } from './bufferGeometry'
import { Stats, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { IntroLayout } from './IntroLayout'


const Extrude = () => {




   
    const length = 1, width = 1;
    
    
        const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );
    
    const extrudeSettings = {
        steps: 4,
        depth: 8,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };
    
       
        // Set up state for the hovered and active state
    
        // Subscribe this component to the render-loop, rotate the mesh every frame
       // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
        // Return view, these are regular three.js elements expressed in JSX
    
        const texture = useTexture('paint2.jpeg')
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // CHANGED
       // texture.offset.set( 0, 0.5 ); // CHANGED
        //texture.repeat.set( 0.01, 0.01 ); // CHANGED
    
        const mesh = React.useRef<THREE.Mesh>(null);
        const [active, setActive] = useState(0);
    
     
       
      
            const { spring } = useSpring({
              spring: active,
            config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
            })
          
         const position = spring.to([0, 1], [1, 5])
    
    
        return (
          <a.mesh
          position-x={position}
          onClick={() => setActive(Number(!active))}
            ref={mesh}>
         <extrudeGeometry args={[shape,extrudeSettings]} />
         
          <meshStandardMaterial color={'white'}  wireframe map={texture} side={DoubleSide}   />
            
          </a.mesh>
        )
    }