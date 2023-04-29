import { useThree } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraController = () => {
    const { camera, gl } = useThree();
 

    React.useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
   
     
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

  /*
  import { FirstPersonControls, FlyControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

export const CameraController = ({args}:any) => {


  const {camera} = useThree()

 camera.lookAt(1,1,0)
  return(
  <FirstPersonControls{...args} />
)
}; */