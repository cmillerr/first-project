$(document).ready(function(){
	console.log("sudfud");
//const is like a variable but more specific and uses less memory than a var 
const scene = new THREE.Scene();

//field of view - angle of view, aspect ratio, near, far) 
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000); 

const renderer = new THREE.WebGLRenderer( {clearColor:0x000000, alpha:true});

renderer.setSize(window.innerWidth, window.innerHeight);

// take body and add our renderer (width, height, etc.))

$('.body').append(renderer.domElement);

//making the scene a box (lenght, width, height)
const material = new THREE.MeshPhongMaterial({ color:0xff100f});


//putting a cube into the scene
//const cube = new THREE.Mesh(geom, material);

//scene.add(cube);

var sphereGeom = new THREE.SphereGeometry(1, 28, 32);
var earthMap  = new THREE.TextureLoader().load('spaceAssets/planetPics/earthmap1k.jpg');
var earthBump = new THREE.TextureLoader().load('spaceAssets/planetPics/earthbump1k.jpg');
var earthSpec = new THREE.TextureLoader().load('spaceAssets/planetPics/earthspec1k.jpg');
//const sphereTexture = new THREE.TextureLoader().load("https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg");
const sphereMaterial = new THREE.MeshPhongMaterial({ map: earthMap, bumpMap: earthBump, specularMap:earthSpec});

//putting a sphere into the scene
const sphere = new THREE.Mesh(sphereGeom, sphereMaterial)

scene.add(sphere);






//creating variable for a new sphere called moon and adding dimensions and textures to the moon 
var moonGeom = new THREE.SphereGeometry(.5, 28, 32);
var moonMap  = new THREE.TextureLoader().load('spaceAssets/planetPics/moonmap1k.jpg');
var moonBump = new THREE.TextureLoader().load('spaceAssets/planetPics/moonbump1k.jpg');
//const sphereTexture = new THREE.TextureLoader().load("https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg");
const moonMaterial = new THREE.MeshPhongMaterial({ map: moonMap, bumpMap: moonBump });

//putting the new sphere into the scene
const moon = new THREE.Mesh(moonGeom, moonMaterial)

scene.add(moon);

var moonOrbitRadius = 1.3;
var moonOrbitAngle = 0;
var moonOrbitSpeed = .5;



var cloudGeom = new THREE.SphereGeometry(1.02, 28, 32);
var cloudMap  = new THREE.TextureLoader().load('spaceAssets/planetPics/earth_clouds.png');
//var cloudBump = new THREE.TextureLoader().load('spaceAssets/planetPics/cloudbump1k.jpg');
//const sphereTexture = new THREE.TextureLoader().load("https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg");
const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudMap, opacity: .7, depthWrite: false, transparent: true });

//putting the new sphere into the scene
const cloud = new THREE.Mesh(cloudGeom, cloudMaterial)

scene.add(cloud);



//the position of the camera on the z axis 
camera.position.z = 12;

var aLight = new THREE.AmbientLight(0x888888);

var moonLight = new THREE.SpotLight(0xffffff,15);
moonLight.position.set(10, 0, 10); 
moonLight.target = sphere;
moonLight.angle = 0.4;
moonLight.distance = 14;

scene.add(aLight);
scene.add(moonLight);


function animate(){
	requestAnimationFrame(animate);

	//the amount the cube rotates per refresh (60 per second)
	//sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.003;

	//animating the new moon
	moon.rotation.y += 0.01;
	//moon.rotation.x += 0.07;

	//moon.position.y = 1.5;
	//moon.position.x = 2;

	//cloud.rotation.x -= 0.01;
	cloud.rotation.y -= 0.003;

	var moonRadians = (moonOrbitAngle * Math.PI) / 180;
	moonOrbitAngle += moonOrbitSpeed;


	moon.position.y = Math.cos (moonRadians) * moonOrbitRadius;
	moon.position.z = Math.sin (moonRadians) * moonOrbitRadius;
	moon.position.x = Math.cos (moonRadians) * moonOrbitRadius;

	renderer.render(scene, camera);



}
animate();

});