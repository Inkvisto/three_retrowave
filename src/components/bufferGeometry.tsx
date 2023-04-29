import { useTexture } from '@react-three/drei';
import * as THREE from 'three'
import { DoubleSide } from 'three';


const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );

// itemSize = 3 because there are 3 values (components) per vertex
//geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );



export const BufferFigure = () => {
	const texture = useTexture('walls.jpeg')

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	return(
		<mesh>
			<bufferGeometry>
				<bufferAttribute 
				count={vertices.length / 3}
				attach='attributes-position'
				array={vertices}
				itemSize={3}
				/>
			 
        
			</bufferGeometry>
			<meshBasicMaterial color={'purple'} side={DoubleSide}  map={texture}/>
		</mesh>
	)
}