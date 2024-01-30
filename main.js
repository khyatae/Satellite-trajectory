import * as THREE from 'three';
import './style.css'
import gsap from "gsap" 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'  


const scene= new THREE.Scene();

const earthGeometry=new THREE.SphereGeometry(3,64,64)
const textureLoader = new THREE.TextureLoader();
const earthMaterial=new THREE.MeshPhongMaterial({
  metalness: 0,
  roughness: 1,
  map: textureLoader.load('images//earth texture.jpeg'),
  bumpMap: textureLoader.load('images//B&W earth texture.jpeg'),
  bumpScale: 0.3,
})

const earthMesh= new THREE.Mesh(earthGeometry,earthMaterial)
scene.add(earthMesh)


function calcPosFromLatLonRad(lat,lon,radius){
	
var phi   = (90-lat)*(Math.PI/180);
var theta = (lon+180)*(Math.PI/180);

const x = -((radius) * Math.sin(phi)*Math.cos(theta));
const z = ((radius) * Math.sin(phi)*Math.sin(theta));
const y = ((radius) * Math.cos(phi));
    
    
	//console.log([x,y,z]);
   return [x,y,z];
}


var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= '../'




THREEx.Planets.createRandomPoints	= function(){

const meshes=[];
for(var i = 0 ; i < 10 ; i++){
	
	var geometry	= new THREE.SphereGeometry(0.025, 20, 20)
	var material	= new THREE.MeshBasicMaterial({
		color: new THREE.Color('red')
	})
	var mesh	= new THREE.Mesh(geometry, material)
	meshes.push(mesh);
}


	
	return meshes
}

const latlons = [[-27.175074856719203, 86.14670432409585],[-20.682768866213028, 102.07059279091415]];

const currentMesh=earthMesh

function addPoints(){
		var meshes= THREEx.Planets.createRandomPoints()	;
		for(var i = 0; i< meshes.length; i++ ){
			const mesh = meshes[i];
		currentMesh.add(mesh)
        
		const latlon=latlons[Math.floor(Math.random()*latlons.length)];
     
    const latlonpoint = calcPosFromLatLonRad(latlon[0], latlon[1], 3);
mesh.position.set(latlonpoint[0], latlonpoint[1], latlonpoint[2]);

		}
		
	}

addPoints();

const sizes={
  width: window.innerWidth,
  height: window.innerHeight,
}

const light=new THREE.AmbientLight(0xffffff,0.2)
scene.add(light)

const light2=new THREE.PointLight(0xffffff,0.9)
light2.position.set(5,3,5)
scene.add(light2)

const camera=new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,100)
camera.position.z=20
scene.add(camera)



const canvas=document.querySelector('.webgl')
const renderer=new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)


const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false

window.addEventListener('resize',()=>{
  sizes.width=window.innerWidth;
  sizes.height=window.innerHeight;
  camera.aspect=sizes.width/sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height);
})

const loop=()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
  earthMesh.rotation.y-=0.0015
}
loop()

const tl=gsap.timeline({defaults: { duration: 1 }})
tl.fromTo(earthMesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo('nav',{y: "-100%"},{y: "0%"})
tl.fromTo('.title',{opacity:0},{opacity:1})




