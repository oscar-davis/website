import {GLTFLoader} from '/libraries/three.js/GLTFLoader.js';
/////////////////////////
//  GLOBAL VARIABLES   //
/////////////////////////
//scene
var scene;
var camera;
var stats;
var renderer;
var start=0;
//ANIMATION
var head;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
///////////////////
// BOOTSTRAPPING //
///////////////////
initScene();
scene1();
animate();
////////////////////
// EVENT HANDLERS //
////////////////////
$(window).keydown(function( event ) {
  if ( event.which == 82 ) {// r key pressed
    console.log("camera: x:"+ Math.round(camera.position.x)+" y:"+Math.round(camera.position.y)+" z:"+Math.round(camera.position.z));
  }
});
function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = event.clientX / window.innerWidth;
	mouse.y = event.clientY / window.innerHeight;
  head.rotation.z=(Math.PI/2)+(mouse.x*Math.PI);
  head.rotation.x=(mouse.y*Math.PI/3)-(Math.PI/1.8);
}
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'touchstart', onMouseMove, false );
////////////////////
// SETUP FUNCTION //
////////////////////
function initScene(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x666666 );
	scene.fog = new THREE.Fog( 0x666666, 200, 600 );

	renderer = new THREE.WebGLRenderer({antialias:true});
	// render canvas set to the size of the window
	renderer.setSize(window.innerWidth, window.innerHeight);
	// append the renderer to the html page
	$("#visualContainer").append(renderer.domElement);
  // create camera to provide a user's perspective
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 2000 );
}
function render() {
    renderer.render( scene, camera );
}
////////////////////
//  SELECT SCENE  //
////////////////////
//scene 1
function scene1(){
  loadHeads();
  //position the camera so we can see the whole scene
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 400;
	// LIGHTS

	var ambientLight = new THREE.AmbientLight( 0xFFFFFF,2);
	scene.add(ambientLight);
}
function loadHeads(){
    var path = '/resources/cube1/';
    var format = '.jpg';
    var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;
  	var loader1 = new GLTFLoader().setPath( '/resources/head1/' );
  	loader1.load( 'head1.gltf', function ( gltf ) {
  		head = gltf.scene;
  		head.receiveShadow = true;
  		head.scale.multiplyScalar( 16 );
  		head.rotation.z += 3.1415;
      head.translateZ(-window.innerHeight/8);
  		head.traverse((node) => {
  			if (!node.isMesh) return;
  			node.material.color = new THREE.Color(0xAA1177);
        node.material = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );
        // node.material.wireframe = true;
  		});
  		scene.add( head );
  	});
}
///////////////////
//   ANIMATION   //
///////////////////
function animate() {
  /////////////////
  // SYSTEM BITS //
  /////////////////
  start++;
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );
}
