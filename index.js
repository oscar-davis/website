import {GLTFLoader} from '/libraries/three.js/GLTFLoader.js';
import {OrbitControls} from "/libraries/three.js/OrbitControls.js";
/////////////////////////
//  GLOBAL VARIABLES   //
/////////////////////////
//scene
var scene;
var camera;
var stats;
var renderer;
var start=0;
var controls;
//ANIMATION
var head;
var tvPlane;
var cube;
var raycaster = new THREE.Raycaster();
var headMouse = new THREE.Vector2();
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
    console.log("camera: x:"+ Math.round(camera.position.x)+" y:"+Math.round(camera.position.y)+" z:"+Math.round(camera.position.z)+", rotation x: "+ camera.rotation.x);
  }
});
function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	headMouse.x = (event.pageX+(window.innerWidth/15)) / window.innerWidth;
	headMouse.y = event.pageY / window.innerHeight;
  head.rotation.x=(headMouse.y*Math.PI/3)-(Math.PI/1.5);
  if(headMouse.x>0.2 && headMouse.x<0.8){
    head.rotation.z=(Math.PI/2)+(headMouse.x*Math.PI);
      head.rotation.y=(headMouse.y*Math.PI*0.2)-0.2;
  }
  else{
    head.rotation.z=(Math.PI/2)+(headMouse.x*Math.PI);
      head.rotation.y=(headMouse.y*Math.PI*0.2)-0.2;
  }

}
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'touchstart', onMouseMove, false );
////////////////////
// SETUP FUNCTION //
////////////////////
function initScene(){
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias:true,alpha: true});
	// render canvas set to the size of the window
	renderer.setSize(700,500);
  renderer.setClearColor( 0x000000, 0 ); // the default
	// append the renderer to the html page
	$("#canv").append(renderer.domElement);
  // create camera to provide a user's perspective
	camera = new THREE.PerspectiveCamera( 75, 700/500, 0.1, 2000 );
  // initialise OrbitControls
  controls = new OrbitControls( camera, renderer.domElement );
  // controls.addEventListener( 'change', render );
}
function render() {
    renderer.render( scene, camera );
}
////////////////////
//  SELECT SCENE  //
////////////////////
//scene 1
function scene1(){
   scene.add( new THREE.AxesHelper(200,200,200) );
  // generate reflection cube
  let path = '/resources/cube1/';
  let format = '.jpg';
  let urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
  ];
  let reflectionCube = new THREE.CubeTextureLoader().load( urls );
  reflectionCube.format = THREE.RGBFormat;

  loadTv();
  loadCube(reflectionCube);
  loadHead(reflectionCube);

  //position the camera so we can see the whole scene
	// camera.position.x = 0;
	//camera.position.y = -65;
	camera.position.z = 400;

  //camera.rotation.x=0.15155376716593535;
	// LIGHTS
	let ambientLight = new THREE.AmbientLight( 0xFFFFFF,2);
	scene.add(ambientLight);
}
function loadHead(reflectionCube){
  	let loader1 = new GLTFLoader().setPath( '/resources/head1/' );
  	loader1.load( 'head1.gltf', function ( gltf ) {
  		head = gltf.scene;
  		head.receiveShadow = false
  		head.scale.multiplyScalar( window.innerHeight/40 );
  		head.rotation.z += 3.1415;
      head.translateX(window.innerWidth/15);
      head.translateZ(-window.innerHeight/3);
      head.translateY(window.innerHeight/4);
  		head.traverse((node) => {
  			if (!node.isMesh) return;
        node.material = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );
        // node.material.wireframe = true;
  		});
  		scene.add( head );
  	});
}
function loadTv(){
  //tv texture onto plane
  const loader = new THREE.TextureLoader();
  loader.load('/resources/textures/tv.png' , function(texture){
    let geometry = new THREE.PlaneGeometry( 700,500, 1 );
    let material = new THREE.MeshBasicMaterial( { map: texture , transparent: true } )
    tvPlane = new THREE.Mesh( geometry, material );
    tvPlane.translateZ(10);
    scene.add( tvPlane );

  //create tv box
  // let geometry = new THREE.BoxGeometry( 640,500, 520 );
  // let cubeMaterials = [
  //   new THREE.MeshStandardMaterial({color:0xF01629, opacity:1, side: THREE.DoubleSide}),
  //   new THREE.MeshStandardMaterial({color:0xF01629, opacity:1, side: THREE.DoubleSide}),
  //   new THREE.MeshStandardMaterial({color:0xF01629, opacity:1, side: THREE.DoubleSide}),
  //   new THREE.MeshStandardMaterial({color:0xF01629, opacity:1, side: THREE.DoubleSide}),
  //   new THREE.MeshBasicMaterial( { map: texture , transparent: true } ),//front
  //   new THREE.MeshStandardMaterial({color:0xF01629, opacity:1, side: THREE.DoubleSide})
  // ];
  // // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
  // let material = new THREE.MeshFaceMaterial(cubeMaterials);
  // cube = new THREE.Mesh( geometry, material );
  // cube.translateX(-30);
  // cube.translateY(0);
  // cube.translateZ(-255);
  // scene.add( cube );
});
}

function loadCube(){
  let geometry = new THREE.BoxGeometry( 500,410, 500 );
  let cubeMaterials = [
    new THREE.MeshBasicMaterial({color:0xff0000, opacity:1, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00ff00, opacity:1, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x0000ff, opacity:1, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xffff00, opacity:1, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.4, side: THREE.DoubleSide}),//front
    new THREE.MeshBasicMaterial({color:0x00ffff, opacity:1, side: THREE.DoubleSide})
  ];
  // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
  let material = new THREE.MeshFaceMaterial(cubeMaterials);
  cube = new THREE.Mesh( geometry, material );
  cube.translateX(-80);
  cube.translateY(20);
  cube.translateZ(-249);
  scene.add( cube );
}
///////////////////
//   ANIMATION   //
///////////////////
function animate() {
  /////////////////
  // SYSTEM BITS //
  /////////////////
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( headMouse, camera );
  // controls.update();
}
