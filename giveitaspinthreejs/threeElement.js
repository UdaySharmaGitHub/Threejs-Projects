import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import gsap from "gsap";
import "./style.css"
/*
Creating the scene
To actually be able to display anything with THREE.js, 
we need THREE things: scene, camera and renderer, 
so that we can render the scene with camera.
*/
const scene  = new THREE.Scene();
/*
There are a few different cameras in THREE.js. For now, let's use a PerspectiveCamera.
    PersepectiveCamera has fours parameters
THREE.PerspectiveCamera("Feild of view","aspect ration","near","far")
*/
// Creating a Sphere Geometery
const geometery = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
    color:"#00ff83",
    roughness:0.3,
});
const mesh = new THREE.Mesh(geometery,material)
scene.add(mesh);

// Size
const sizes={
    width:window.innerWidth,
    height :window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff,80,100,1.5)
light.position.set(10,10,10)
scene.add(light)

// Persecpective Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20;
scene.add(camera);


//Render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(2)
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)

// Controls
const controls = new OrbitControls(camera,canvas)  // for rotating function
// Adding the Dumbling to the OrbitControler
controls.enableDamping = true // slower the rotating,moving and Grabing function (Boolean)
controls.enablePan =false // for moving the object from the onplace to another on screen (Boolean)
controls.enableZoom = false // for zooming functionality (Boolean)
controls.autoRotate = true // for autorotate functionality (Boolean)
controls.autoRotateSpeed = 5.0  // for changing the rotatind speed (Float)

// Resize
window.addEventListener('resize',()=>{
    // console.log(window.innerWidth,window.innerHeight)
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
})

const loop =()=>{
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

// Timeline magin
const t1 = gsap.timeline({defaults:{duration:1}});
t1.fromTo(mesh.scale,{z:0,y:0,x:0},{z:1,y:1,x:1})
t1.fromTo('nav',{y:"-100%"},{y:"0%"})
t1.fromTo(".title",{opacity:0},{opacity:1})

// Mouse Animation Color
let mouseDown = false;
let rgb =[12,,23,55];
window.addEventListener('mousedown',()=>{
    mouseDown=true
})
window.addEventListener('mouseup',()=>{
    mouseDown=false
})

window.addEventListener('mousemove',(e)=>{
if(mouseDown){
    rgb =[
        Math.round((e.pageX/sizes.width)*255),
        Math.round((e.pageX/sizes.height)*255),
        150    ]
    // console.log(rgb)
//lets animate
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
gsap.to(mesh.material.color,{
    r:newColor.r,
    g:newColor.g,
    b:newColor.b
})
}
})