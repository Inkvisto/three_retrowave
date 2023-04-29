import React from "react"
import SimplexNoise from 'simplex-noise';



const simplex = new SimplexNoise()
export const Mountains = () => {
    const mesh = React.useRef<any>(null)
    
    const updateBufferGeometry = () => {
      const { geometry } = mesh.current
      const { position } = geometry.attributes

       let verticles = position.array;
  
       const hVerts = geometry.parameters.heightSegments + 1;
       const wVerts = geometry.parameters.widthSegments + 1;
       for (let j = 0; j < hVerts; j++) {
         for (let i = 0; i < wVerts; i++) {
           const ex = 1.1;
           verticles[3 * (j * wVerts + i) + 2] =
             (simplex.noise2D(i / 100, j / 100) +
               simplex.noise2D((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
               simplex.noise2D((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
               simplex.noise2D((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
               +(simplex.noise2D((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) * 13;
         }
       }
     
    
      position.needsUpdate = true
      geometry.computeVertexNormals()
    }


    React.useEffect(() => updateBufferGeometry())
    return(
   
        <mesh ref={mesh} position={[0,-3,-180]} rotation={[-Math.PI / 2, 0, 0]} >
        
            <planeBufferGeometry args={[600, 100, 30,30]}   />
    
        <meshStandardMaterial wireframe transparent={true} opacity={0.3}   color={'red'} />
        {/*opacity={0.3} transparent={true} */}
        </mesh>
   
       

    )
}