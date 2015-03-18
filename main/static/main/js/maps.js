INST.gmap = {
    isLoaded: false,
    isShown: false,
    mapDiv: null,
    setup: function(controlDiv, map) {
        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Open in Maps';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Open in Maps';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to
        // IIEST Shibpur
        google.maps.event.addDomListener(controlUI, 'click', function() {
          var mapsUrl = "https://www.google.co.in/maps/place/Indian+Institute+of+Engineering+Science+and+Technology,+Shibpur/@22.555862,88.305706,17z/data=!3m1!4b1!4m2!3m1!1s0x3a0279c91a8d2d49:0xc6ee508c74cf031d?hl=en"
          var win = window.open(mapsUrl, '_blank');
          win.focus();
        });
    },

    init: function() {
        if(!this.isShown || !this.isLoaded){
            return;
        }
        this.mapDiv = INST.S('.location-gmaps')[0];
        var myLatlng = new google.maps.LatLng(22.5558,88.3057)
        var mapOptions = {
          zoom: 16,
          center: myLatlng,
          scrollwheel: false,
        };

        var map = new google.maps.Map(this.mapDiv,mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'IIEST Shibpur'
        });
        var centerControlDiv = document.createElement('div');
        var centerControl = new this.setup(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);
    },

    load: function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyjFcbQbCn48QHVsK-ax6Rh8lvtKHLEzk&v=3.exp&' +
        'callback=INST.gmap.init';
        this.isLoaded = true;
        document.body.appendChild(script);
    }
};

INST.gmap.load();

