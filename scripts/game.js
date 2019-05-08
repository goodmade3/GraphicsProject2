// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

var renderer, scene, camera, pointLight, spotLight;

var fieldWidth = 400, fieldHeight = 200;

var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

var mirrorSphere, paddle1, paddle2;
var mirrorSphereDirX = 1, mirrorSphereDirY = 1, mirrorSphereSpeed = 2;

var score1 = 0, score2 = 0;
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

function setup()
{
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
	
	score1 = 0;
	score2 = 0;
	
	createScene();
	
	draw();
}

function createScene()
{
	var WIDTH = 640,
	  HEIGHT = 360;

	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	scene.add(camera);
	
	camera.position.z = 320;
	
	renderer.setSize(WIDTH, HEIGHT);

	c.appendChild(renderer.domElement);

	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;
		
	var paddle1Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x2980B9
		});
	var paddle2Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xD68910
		});
		
	//-----------------------------------------------------------------
	var texture = new THREE.TextureLoader().load( 'wild.png' );

	// immediately use the texture for material creation
	var planeMaterial = new THREE.MeshBasicMaterial( { map: texture } );
	
	
	
	
	
	
	
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x111111});
		
		
		
	//-----------------------------------------------------------------
	var tableMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x17202A
		});
	var pillarMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x641E16
		});
	var groundMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xAF601A
		});

	var ceilingMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x18FF07
		});
		
	var plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.95,
		planeHeight,
		planeQuality,
		planeQuality),

	  planeMaterial);
	  
	scene.add(plane);
	plane.receiveShadow = true;	
	
	
	var table = new THREE.Mesh(

	  new THREE.CubeGeometry(
		planeWidth * 1.05,
		planeHeight * 1.03,
		100,
		planeQuality,
		planeQuality,
		1),

	  tableMaterial);
	table.position.z = -51;	
	scene.add(table);
	table.receiveShadow = true;	
	
	radius = 5,
	 segments = 6,
	 rings = 6;
	
  var sphereGeom =  new THREE.SphereGeometry( 5, 6, 6 );// radius, segmentsWidth, segmentsHeight
	mirrorSphereCamera = new THREE.CubeCamera( 0.1, 5000, 512);
	scene.add( mirrorSphereCamera );
	var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
	mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
	
	mirrorSphere.position.x = 0;
	mirrorSphere.position.y = 0;
	mirrorSphere.position.z = radius;

	mirrorSphereCamera.position = mirrorSphere.position;

	scene.add(mirrorSphere);
	
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
		
	paddle1 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle1Material);

	scene.add(paddle1);
	paddle1.receiveShadow = true;
    paddle1.castShadow = true;
	
	paddle2 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle2Material);
	  
	scene.add(paddle2);
	paddle2.receiveShadow = true;
    paddle2.castShadow = true;	
	
	paddle1.position.x = -fieldWidth/2 + paddleWidth;
	paddle2.position.x = fieldWidth/2 - paddleWidth;
	
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
		
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(
		
		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  150, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = 230;
		backdrop.position.z = -70;		
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		  
		scene.add(backdrop);	
	}

	var railing1 = new THREE.Mesh(
		new THREE.CubeGeometry(
			500,
			30,
			30,
			1,
			1,
			1 ),
		pillarMaterial
	);
	railing1.position.x = 150;
	railing1.position.y = -230;
	railing1.position.z = 10;
	railing1.castShadow = true;
	railing1.receiveShadow = true;
	scene.add(railing1);

	var railing2 = new THREE.Mesh(
		new THREE.CubeGeometry(
			500,
			30,
			30,
			1,
			1,
			1 ),
		pillarMaterial
	);
	railing2.position.x = 150;
	railing2.position.y = 230;
	railing2.position.z = 10;
	railing2.castShadow = true;
	railing2.receiveShadow = true;
	scene.add(railing2);

	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  150, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = -230;
		backdrop.position.z = -70;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		
		scene.add(backdrop);	
	}

	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry( 
	  1000, 
	  1000, 
	  3, 
	  1, 
	  1,
	  1 ),

	  groundMaterial);
	ground.position.z = -150;
	ground.receiveShadow = true;	
	scene.add(ground);
	
	var ceiling = new THREE.Mesh(

	  new THREE.CubeGeometry( 
	  500, 
	  500, 
	  3, 
	  1, 
	  1,
	  1 ),

	  ceilingMaterial);
	ceiling.position.z = 70;
	ceiling.position.x = 250;
	ceiling.receiveShadow = true;	
	scene.add(ceiling);	
		
	pointLight =
		new THREE.PointLight(0xF8D898);
		
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	scene.add(pointLight);

    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
		
	renderer.shadowMapEnabled = true;		
}

function draw()
{	
	mirrorSphere.visible = false;
	mirrorSphereCamera.updateCubeMap( renderer, scene );
	mirrorSphere.visible = true;

	renderer.render(scene, camera);
	requestAnimationFrame(draw);
	
	mirrorSpherePhysics();
	paddlePhysics();
	cameraPhysics();
	playerPaddleMovement();
	opponentPaddleMovement();
}

function mirrorSpherePhysics()
{
	if (mirrorSphere.position.x <= -fieldWidth/2)
	{	
		score2++;
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		resetmirrorSphere(2);
		matchScoreCheck();	
	}
	
	if (mirrorSphere.position.x >= fieldWidth/2)
	{	
		score1++;
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		resetmirrorSphere(1);
		matchScoreCheck();	
	}
	
	if (mirrorSphere.position.y <= -fieldHeight/2)
	{
		mirrorSphereDirY = -mirrorSphereDirY;
		mirrorSphereSpeed = 0;
	}	
	if (mirrorSphere.position.y >= fieldHeight/2)
	{
		mirrorSphereDirY = -mirrorSphereDirY;
	}
	
	mirrorSphere.position.x += mirrorSphereDirX * mirrorSphereSpeed;
	mirrorSphere.position.y += mirrorSphereDirY * mirrorSphereSpeed;

	if (mirrorSphereDirY > mirrorSphereSpeed * 2)
	{
		mirrorSphereDirY = mirrorSphereSpeed * 2;
	}
	else if (mirrorSphereDirY < -mirrorSphereSpeed * 2)
	{
		mirrorSphereDirY = -mirrorSphereSpeed * 2;
	}
}

function opponentPaddleMovement()
{
	paddle2DirY = (mirrorSphere.position.y - paddle2.position.y) * difficulty;
	
	if (Math.abs(paddle2DirY) <= paddleSpeed)
	{	
		paddle2.position.y += paddle2DirY;
	}
	else
	{
		if (paddle2DirY > paddleSpeed)
		{
			paddle2.position.y += paddleSpeed;
		}
		else if (paddle2DirY < -paddleSpeed)
		{
			paddle2.position.y -= paddleSpeed;
		}
	}
}

function playerPaddleMovement()
{
	if (Key.isDown(Key.A))		
	{
		if (paddle1.position.y < fieldHeight * 0.45)
		{
			paddle1DirY = paddleSpeed * 0.5;
		}
		else
		{
			paddle1DirY = 0;
		}
	}	
	else if (Key.isDown(Key.D))
	{
		if (paddle1.position.y > -fieldHeight * 0.45)
		{
			paddle1DirY = -paddleSpeed * 0.5;
		}
		else
		{
			paddle1DirY = 0;
		}
	}
	else
	{
		paddle1DirY = 0;
	}
	paddle1.position.y += paddle1DirY;
}

function cameraPhysics()
{
	spotLight.position.x = mirrorSphere.position.x * 2;
	spotLight.position.y = mirrorSphere.position.y * 2;
	
	camera.position.x = paddle1.position.x - 100;
	camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-mirrorSphere.position.x + paddle1.position.x);
	
	camera.rotation.x = -0.01 * (mirrorSphere.position.y) * Math.PI/180;
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

function paddlePhysics()
{
	if (mirrorSphere.position.x <= paddle1.position.x + paddleWidth
	&&  mirrorSphere.position.x >= paddle1.position.x)
	{
		if (mirrorSphere.position.y <= paddle1.position.y + paddleHeight/2
		&&  mirrorSphere.position.y >= paddle1.position.y - paddleHeight/2)
		{
			if (mirrorSphereDirX < 0)
			{
				mirrorSphereDirX = -mirrorSphereDirX;
				mirrorSphereDirY -= paddle1DirY * 0.7;
			}
		}
	}
	
	if (mirrorSphere.position.x <= paddle2.position.x + paddleWidth
	&&  mirrorSphere.position.x >= paddle2.position.x)
	{
		if (mirrorSphere.position.y <= paddle2.position.y + paddleHeight/2
		&&  mirrorSphere.position.y >= paddle2.position.y - paddleHeight/2)
		{
			if (mirrorSphereDirX > 0)
			{
				mirrorSphereDirX = -mirrorSphereDirX;
				mirrorSphereDirY -= paddle2DirY * 0.7;
			}
		}
	}
}

function resetmirrorSphere(loser)
{
	mirrorSphere.position.x = 0;
	mirrorSphere.position.y = 0;
	
	if (loser == 1)
	{
		mirrorSphereDirX = -1;
	}
	else
	{
		mirrorSphereDirX = 1;
	}
	mirrorSphereDirY = 1;
}

var bounceTime = 0;
function matchScoreCheck()
{
	if (score1 >= maxScore)
	{
		mirrorSphereSpeed = 0;
		document.getElementById("scores").innerHTML = "Player wins!";		
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	}
	else if (score2 >= maxScore)
	{
		mirrorSphereSpeed = 0;
		document.getElementById("scores").innerHTML = "CPU wins!";
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	}
}