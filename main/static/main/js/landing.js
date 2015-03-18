INST.landing = {
	animateTagline: function(){
		INST.s('#tagline').classList.add('animateTagline');
		setTimeout(function(){
			INST.s('#instruo-dates').classList.add('animateDate');
		}, 2000);
	}
};

INST.wave = {
    container: INST.s('#container-canvas'),
    renderer: null,
    scene: null,
    light1: null,
    light2: null,
    geometry: null,
    material: null,
    mesh: null,
    now: Date.now(),
    start: this.now,
    xPos1: -800,
    xPos2: 0,
    running: false,
    init: function() {
		this.renderer = new FSS.CanvasRenderer();
	    this.scene = new FSS.Scene();
	    this.light1 = new FSS.Light('#2887c4', '#000000');
	    this.light2 = new FSS.Light('#2887c4', '#000001');
	    this.geometry = new FSS.Plane(1400, 300, 12, 4);
	    this.material = new FSS.Material('#2887c4', '#2887c4');
	    this.mesh = new FSS.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
		this.scene.add(this.light2);
		this.scene.add(this.light1);
		this.container.appendChild(this.renderer.element);
		window.addEventListener('resize', this.resize);
		this.running = true;
		this.animate();
    },
    resize: function() {
		INST.wave.renderer.setSize(INST.wave.container.offsetWidth, INST.wave.container.offsetHeight);
    },
    animate: function() {
		INST.wave.now = Date.now() - INST.wave.start;
		if (INST.wave.xPos1  > 800) {
		INST.wave.xPos1 = -800;
		}
		if (INST.wave.xPos2  > 800) {
		INST.wave.xPos2 = -800;
		}
		INST.wave.xPos1 += 4;
		INST.wave.xPos2 += 4;
		INST.wave.light1.setPosition(INST.wave.xPos1, -120, 60);
		INST.wave.light2.setPosition(INST.wave.xPos2, -120, 60);
		INST.wave.renderer.render(INST.wave.scene);
		if(INST.wave.running){
			requestAnimationFrame(INST.wave.animate);
		}
    },
    start: function(){
    	INST.wave.running = true;
    	INST.wave.resize();
    	INST.wave.animate();
    },
    stop: function(){
    	INST.wave.running = false;
    }
};

INST.wave.init();
INST.wave.resize();