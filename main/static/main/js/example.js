
  //------------------------------
  // Mesh Properties
  //------------------------------
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function cRand(param1 ,param2)
{
  return parseInt(Math.randomInRange(param1,param2));
}
updateLoading();
  var MESH = {
    width: 1.2,
    height: 1.2,
    depth: 0,
    segments: 8,
    slices: 5,
    xRange: 0.4,
    yRange: 0.1 ,
    zRange: 1.0,
    ambient: '#461e3b',
    diffuse: '#512153',
    // ambient: rgbToHex(cRand(50, 100), cRand(0, 100), cRand(50, 100)),
    // diffuse: rgbToHex(cRand(50, 100), cRand(0, 100), cRand(50, 100)),
    speed: 0.001
  };

  mash = MESH;
  //------------------------------
  // Light Properties
  //------------------------------
  var LIGHT = {
    count: 4,
    xyScalar: 1, 
    zOffset: 100,
    // ambient: "#880066",
    // diffuse: "#FF8800",
    // ambient: rgbToHex(cRand(50, 150), cRand(0, 150), cRand(50, 150)),
    // diffuse: rgbToHex(cRand(50, 150), cRand(0, 150), cRand(50, 150)),
    ambient: '#000000',
    diffuse: '#999999',
    speed: 0.001,
    gravity: 1200,
    dampening: 0.95,
    minLimit: 10,
    maxLimit: null,
    minDistance: 20,
    maxDistance: 400,
    autopilot: false,
    draw: true,
    bounds: FSS.Vector3.create(),
    step: FSS.Vector3.create(
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0)
    )
  };

  //------------------------------
  // Render Properties
  //------------------------------

  var RENDER = {
    renderer: 'canvas'
  };
  var sidebarOffset = 100;

  //------------------------------
  // Export Properties
  //------------------------------
  var EXPORT = {
    width: 2000,
    height: 1000,
    drawLights: false,
    minLightX: 0.4,
    maxLightX: 0.6,
    minLightY: 0.2,
    maxLightY: 0.4,
    export: function() {
      var l, x, y, light,
          depth = MESH.depth,
          zOffset = LIGHT.zOffset,
          autopilot = LIGHT.autopilot,
          scalar = this.width / renderer.width;

      LIGHT.autopilot = true;
      LIGHT.draw = this.drawLights;
      LIGHT.zOffset *= scalar;
      MESH.depth *= scalar;

      resize(this.width, this.height);

      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        x = Math.randomInRange(this.width*this.minLightX, this.width*this.maxLightX);
        y = Math.randomInRange(this.height*this.minLightY, this.height*this.maxLightY);
        FSS.Vector3.set(light.position, x, this.height-y, this.lightZ);
        FSS.Vector3.subtract(light.position, center);
      }

      update();
      render();
      window.open(canvasRenderer.element.toDataURL(), '_blank');

      LIGHT.draw = true;
      LIGHT.autopilot = autopilot;
      LIGHT.zOffset = zOffset;
      MESH.depth = depth;

      resize(container.offsetWidth, container.offsetHeight);
    }
  };


  //------------------------------
  // Global Properties
  //------------------------------
  var now, start = Date.now();
  sstart = start;
  var center = FSS.Vector3.create();
  var attractor = FSS.Vector3.create();
  var container = document.getElementById('container-canvas');
  // var controls = document.getElementById('controls');
  var output = document.getElementById('output-canvas');
  // var ui = document.getElementById('ui');
  var renderer, scene, mesh, geometry, material;
  var webglRenderer, canvasRenderer, svgRenderer;
  // var gui, autopilotController;

  //------------------------------
  // Methods
  //------------------------------
  function initialise() {
    createRenderer();
    createScene();
    createMesh();
    createLights();
    addEventListeners();
    // addControls();
    resize(container.offsetWidth, container.offsetHeight);
    animate();
  }

  function createRenderer() {
    //fuck
    // webglRenderer = new FSS.WebGLRenderer();
    canvasRenderer = new FSS.CanvasRenderer();
    // svgRenderer = new FSS.SVGRenderer();
    setRenderer(RENDER.renderer);
  }


  function setRenderer(index) {
    if (renderer) {
      output.removeChild(renderer.element);
    }

    renderer = canvasRenderer;
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    output.appendChild(renderer.element);
  }

  function createScene() {
    scene = new FSS.Scene();
  }

  function createMesh() {
    scene.remove(mesh);
    renderer.clear();
    geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
    material = new FSS.Material(MESH.ambient, MESH.diffuse);
    mesh = new FSS.Mesh(geometry, material);
    scene.add(mesh);

    // Augment vertices for animation
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.anchor = FSS.Vector3.clone(vertex.position);
      vertex.step = FSS.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
      );
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }
  }

  function createLights() {
    var l, light;
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];
      scene.remove(light);
    }
    renderer.clear();
    for (l = 0; l < LIGHT.count; l++) {
      light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
      light.ambientHex = light.ambient.format();
      light.diffuseHex = light.diffuse.format();
      scene.add(light);

      // Augment light for animation
      light.mass = Math.randomInRange(0.5, 1);
      light.velocity = FSS.Vector3.create();
      light.acceleration = FSS.Vector3.create();
      light.force = FSS.Vector3.create();

      // Ring SVG Circle
      light.ring = document.createElementNS(FSS.SVGNS, 'circle');
      light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
      light.ring.setAttributeNS(null, 'stroke-width', '0.5');
      light.ring.setAttributeNS(null, 'fill', 'none');
      light.ring.setAttributeNS(null, 'r', '10');

      // Core SVG Circle
      light.core = document.createElementNS(FSS.SVGNS, 'circle');
      light.core.setAttributeNS(null, 'fill', light.diffuseHex);
      light.core.setAttributeNS(null, 'r', '4');
    }
  }

  function resize(width, height) {
    renderer.setSize(width + 100, height);
    FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
    createMesh();
  }

  var toAnimate = true;

  function animate() {
    if (toAnimate)
    {
      now = Date.now() - start;
      update();
      render();
      // requestAnimationFrame(animate);
    }
  }

  setInterval(function()
    {
      animate();
    }, 50)

  function stopAnim()
  {
    toAnimate = false;
  }

  function startcanvas()
  {
    toAnimate = true;
    // attractornimate();
  }

  function update() {
    var ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;

    // Update Bounds
    FSS.Vector3.copy(LIGHT.bounds, center);
    FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

    // Update Attractor
    FSS.Vector3.setZ(attractor, LIGHT.zOffset);

    // Overwrite the Attractor position
    if (LIGHT.autopilot) {
      ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
      oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
      FSS.Vector3.set(attractor,
        LIGHT.bounds[0]*ox,
        LIGHT.bounds[1]*oy,
        LIGHT.zOffset);
    }

    scene.lights[0].position = [2*sidebarOffset - renderer.width/2, -renderer.height/2, LIGHT.zOffset];
    scene.lights[1].position = [2*sidebarOffset - renderer.width/2, -renderer.height/2, LIGHT.zOffset];
    scene.lights[2].position = [renderer.width/2 - 2*sidebarOffset, -renderer.height/2, LIGHT.zOffset];
    scene.lights[3].position = [renderer.width/2 - 2*sidebarOffset, -renderer.height/2, LIGHT.zOffset];
    // scene.lights[4].position = [0, renderer.height/2, LIGHT.zOffset];


    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
      FSS.Vector3.set(vertex.position,
        MESH.xRange*geometry.segmentWidth*ox,
        MESH.yRange*geometry.sliceHeight*oy,
        MESH.zRange*offset*oz - offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
  }

  function render() {
    renderer.render(scene);

    // Draw Lights
    if (LIGHT.draw) {
      var l, lx, ly, light;
      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        lx = light.position[0];
        ly = light.position[1];
       
      }
    }
  }

  function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('click', onMouseClick);
    container.addEventListener('mousemove', onMouseMove);
  }


  //------------------------------
  // Callbacks
  //------------------------------
  function onMouseClick(event) {
    FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
    FSS.Vector3.subtract(attractor, center);
    LIGHT.autopilot = !LIGHT.autopilot;
    // autopilotController.updateDisplay();
  }

  function onMouseMove(event) {
     
  }

  function onWindowResize(event) {
    resize(container.offsetWidth, container.offsetHeight);
    render();
  }



  // Let there be light!
  initialise();
  stopAnim();
