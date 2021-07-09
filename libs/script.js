(function () {

//view
		var view = new ol.View({
        projection: 'EPSG:4326',
        center: [-9, 30 ],
        zoom: 6
    });
	
//overview
		var overview = new ol.View({
		projection: 'EPSG:4326',
        center: [-9, 30 ],
        zoom: 5
		});

//map
    var map = new ol.Map({
        target: 'map',
        view: view
		});
		//variable pour overview
		var OSM = new ol.layer.Tile({
		title: 'OSM',
		type:'base',
		source: new ol.source.OSM()
		});
////////
      var fondmap = new ol.layer.Group({
	  title: 'Fonds de carte',
	  layers: [
	  new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    }),
	  new ol.layer.Tile({
                              'title': 'Google Satellite',
                              'type': 'base',
                              'opacity': 1.000000,
                              
                              
                              source: new ol.source.XYZ({
                      attributions: ' ',
                                  url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'
                              })
                        })
						]
						});

      var couches = new ol.layer.Group({
                'title': 'Mes couches',
                layers: [
				new ol.layer.VectorImage({
      title: 'Provinces du Maroc',
         // extent: [-180, -90, -180, 90],
          source: new ol.source.Vector({
			  format: new ol.format.GeoJSON(),
            url: 'https://raw.githubusercontent.com/sig-otmane/webmapping/main/SIG_BELGAMRA/Provinces%20Maroc.geojson'
          })
        }),
		new ol.layer.VectorImage({
      title: 'réseaux routier',
         // extent: [-180, -90, -180, 90],
          source: new ol.source.Vector({
			  format: new ol.format.GeoJSON(),
            url: 'https://raw.githubusercontent.com/sig-otmane/webmapping/main/SIG_BELGAMRA/r%C3%A9seaux%20routier.geojson'
          }),
		  style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'red', width: 2})
          })
        })
		]
		});
		 
      map.addLayer(fondmap);
      map.addLayer(couches);

//Position de la souris
	var mouse_position = new ol.control.MousePosition();
	map.addControl(mouse_position);

//Echelle
	var echel = new ol.control.ScaleLine();
	map.addControl(echel);
  
  //OverviewMap
	var ensemble = new ol.control.OverviewMap({
	view: overview,
	collapseLabel:'O', 
label: 'O',
layers:[OSM]
	});
	map.addControl(ensemble);
	
	  //Zoom Vers Étendue
	var zoom_ex = new ol.control.ZoomToExtent({
	extent:[
              -7.80,33.60,
                    -7.35,33.35
            ],
			label: 'E'
			});
	map.addControl(zoom_ex);
	
	//Curseur de zoom _ zoomer avec glissage _ outil comme + -
	var slider = new ol.control.ZoomSlider();
	map.addControl(slider);
	
		//Plein écran
	var full_sc = new ol.control.FullScreen({
	label:'F'
	});
	map.addControl(full_sc);
  
//Gestionnaire de couches
  var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    tipLabel: 'Layers', // Optional label for button
    groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: 'Collapse layers',
  });
  map.addControl(layerSwitcher);
  

   })();