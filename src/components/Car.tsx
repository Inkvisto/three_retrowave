import { BakeShadows, ContactShadows, Environment, Html, Select, SpotLight, useGLTF, useHelper } from "@react-three/drei"
import * as THREE from 'three'
import React from "react";
import { DirectionalLightHelper, Mesh, PointLightHelper, SpotLightHelper } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Selection, SelectiveBloom } from "@react-three/postprocessing";
import '../index.css'
import { hexToRgb } from "../utils/color";
import { Sun } from "./Sun";

export const Car = (props:any) => {
  let [color,setColor]=  React.useState({bodyColor:'#ff0000',detailsColor:'#000000',glassColor:'#ffffff'})
  const state = useThree()



  

    const { scene,nodes, materials }:any = useGLTF('gltf/ferrari.glb')


    const bodyMaterial = new THREE.MeshPhysicalMaterial( {
      color: color.bodyColor, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
    } );
    const detailsMaterial = new THREE.MeshStandardMaterial( {
      color: color.detailsColor, metalness: 1.0, roughness: 0.5
    } );

    const glassMaterial = new THREE.MeshPhysicalMaterial( {
      color: color.glassColor, metalness: 0.25, roughness: 0, transmission: 1.0
    } );


  const  headlightsMaterial= new THREE.MeshStandardMaterial( {
    color: '#ff0000', metalness: 0.4, roughness: 0.5
  } );

  React.useEffect(()=>{
    bodyMaterial.color.set(color.bodyColor)
    
    
  },[color.bodyColor])

  React.useEffect(()=>{
    detailsMaterial.color.set(color.detailsColor)
  },[color.detailsColor])

  React.useEffect(()=>{
    glassMaterial.color.set(color.glassColor)
  },[color.glassColor])


    const carModel = scene.children[ 0 ];
  
  
    carModel.getObjectByName( 'body' ).material = bodyMaterial;

    carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
    carModel.getObjectByName( 'trim' ).material = detailsMaterial;


    carModel.getObjectByName( 'brakes' ).material = headlightsMaterial;
   let lights_red:any = carModel.getObjectByName( 'lights_red' )
  
    console.log(lights_red);
    
    carModel.getObjectByName( 'glass' ).material = glassMaterial;
    const wheels:any = [];
    wheels.push(
      carModel.getObjectByName( 'wheel_fl' ),
      carModel.getObjectByName( 'wheel_fr' ),
      carModel.getObjectByName( 'wheel_rl' ),
      carModel.getObjectByName( 'wheel_rr' )
    );

    

    



      
      const directionalLight = React.useRef<any>(null)
      const spotLight = React.useRef<any>(null)
      const pointLight= React.useRef<any>(null)


      useHelper(directionalLight,DirectionalLightHelper)
      useHelper(spotLight,SpotLightHelper)
      useHelper(pointLight,PointLightHelper)

const leftTarget = new THREE.Object3D()
const rightTarget = new THREE.Object3D()
const redLights = []
leftTarget.position.set(0.7,0,-5)
rightTarget.position.set(-1,0,-5)
state.scene.add(leftTarget,rightTarget)




const Striplight = ({ color = 'white', emissiveIntensity = 2, ...props }) => {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissiveIntensity} toneMapped={false} />
    </mesh>
  )
}


/*useFrame(()=>{

  for ( let i = 0; i < wheels.length; i ++ ) {

    wheels[ i ].rotation.x -=0.1

  }

  
})*/
console.log(lights_red);



    return <>
   {/*} <Environment>
  <Striplight rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
        <Striplight rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
      
        <Striplight rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
        <Striplight rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
</Environment>*/}

<Selection>
<EffectComposer multisampling={0} >
          <SelectiveBloom
        
        mipmapBlur  luminanceThreshold={0.2} intensity={10}
     
      
          luminanceSmoothing={0.025} 
         
         
          />
       
    
</EffectComposer>
<Select>

</Select>

  </Selection>

<pointLight ref={pointLight} intensity={4} position={[-2,4,-1]} color={'white'}/>
<pointLight ref={pointLight} intensity={4} position={[2,4,-1]} color={'white'}/>


    <ContactShadows resolution={1024} frames={1} position={[0, 0, 0]} scale={10} blur={0} opacity={1} far={20} />
    <BakeShadows />
    <Html wrapperClass="picker" >
    <span className="colorPicker">Body<input name="bodyColor" type="color" value={color.bodyColor} onChange={e => {setColor({...color, [e.target.name]: e.target.value})} 
} /></span>
			<span className="colorPicker">Details<input name="detailsColor" type="color" value={color.detailsColor}  onChange={e => {setColor({...color, [e.target.name]: e.target.value})} 
}></input></span>
			<span className="colorPicker" >Glass<input name="glassColor" type="color" value={color.glassColor}  onChange={e => {setColor({...color, [e.target.name]: e.target.value})} 
}></input></span>
    </Html>
  {/*<spotLight ref={spotLight} position={[0.7,0.5,-2.2]}  target={leftTarget} angle={0.4}  penumbra={0.7} decay={2} power={700} distance={20} />
  <spotLight ref={spotLight} position={[-0.7,0.5,-2.2]}  target={rightTarget} angle={0.4}  penumbra={0.7} decay={2} power={700} distance={20}  />*/}
 {/*<pointLight ref={pointLight} color={'red'} position={[0.7,0.7,2]} distance={1} intensity={10}
 />*/}
  {/*
  //perfomance mode 

  <spotLight ref={spotLight} position={[0,0.5,-1.8]}  target={target} angle={1.2} distance={30} intensity={3.5} penumbra={0.8} decay={2} />
  
  */}
    <primitive object={scene} {...props} />
    </>
  }



  useGLTF.preload('gltf/ferrari.glb')