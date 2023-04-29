import { GridHelperProps, } from '@react-three/fiber';

import React from 'react';
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three';


 const defaultLines = [
    [ 0, 0, 0], [80, 0, 0],
    [ 0, 0, 0], [0, 0, 100],
    [ 0, 0, 0], [0, 0, -100],
    [ 0, 0, 0], [-80, 0, 0],
    ['empty'],

 ]
 let rightTopPart = [];



const platesCalc = (array, count) => {
  let result = array.map((elem, index, arr) => {
    let dividedValue;

    if (arr[1][0] === 0) {
      dividedValue = arr[1][0] - 0.25;
    } else {
      dividedValue = arr[0][0] - 2.5;
    }
    if (index % 2 !== 0) {
      return elem.map((e, i, a) => {
        if (index === 1) {
          if (i === 0) {
            return (e = dividedValue * 10 < -25 ? -80 : dividedValue * 32);
          } else if (i === 2) {
            return (e = -dividedValue);
          } else {
            return e;
          }
        } else if (index === 3) {
          if (i === 0) {
            return (e = dividedValue);
          } else {
            return (e = 0);
          }
        } else if (index === 5) {
          if (i === 2) {
            return (e = -dividedValue);
          } else {
            return e;
          }
        } else {
          if (i === 0) {
            return (e = dividedValue);
          } else if (i === 2) {
            return (e = -dividedValue * 8 > 30 ? 100 : -dividedValue * 40);
          } else {
            return e;
          }
        }
      });
    } else {
      return elem.map((e, i, a) => {
        if (i === 0) {
          return (e = dividedValue);
        } else if (i === 2) {
          return (e = -dividedValue);
        } else {
          return e;
        }
      });
    }
  });

  result.push(['empty']);
  rightTopPart.push(...result);

  let counter = count--;

  if (counter >= 0) {

    platesCalc(result, count);
  }

};

platesCalc(defaultLines,30)

 export  const Plates = () => {
    const ref = React.useRef(null)

  

 let rightBottomPart = rightTopPart.flatMap((e)=>{
  return [e.map((e)=>{
    if(e<0){
      return e = -e
    } else {
      return e
    }
  })]
})

let leftBottomPart = rightTopPart.flatMap((e)=>{
  return [e.map((e)=>{
    if(e>0){
      return e = -e
    } else {
      return e
    }
  })]
})

let leftTopPart = rightTopPart.flatMap((e)=>{
  return [e.map((e)=>{
  
      return e = -e
    
  })]
})


   
    const vectorsArray = [...defaultLines,...rightTopPart,...rightBottomPart,...leftBottomPart,...leftTopPart]
    
    React.useLayoutEffect(() => {
      ref.current.geometry.setFromPoints(vectorsArray.map((point) => new THREE.Vector3(...point)))
    }, [defaultLines])
  

    const color4 = new THREE.Color("purple");

    
    return (<group>
    
 
        <line ref={ref} >

        <bufferGeometry />
        <lineBasicMaterial color={color4} />
    </line>
      </group>
    )
  }