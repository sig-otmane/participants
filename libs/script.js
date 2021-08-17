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
		
//var style
const style = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new ol.style.Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});
//var highlightStyle
const highlightStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#f00',
    width: 1,
  }),
  fill: new ol.style.Fill({
    color: 'rgba(255,0,0,0.1)',
  }),
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#f00',
      width: 3,
    }),
  }),
});
//VectorLayer
const featureOverlay = new ol.layer.Vector({
  source: new ol.source.Vector(),
  map: map,
  style: function (feature) {
    highlightStyle.getText().setText(feature.get('name'));
    return highlightStyle;
  },
});
////////
      var fondmap = new ol.layer.Group({
	  title: 'Fonds de carte',
	  layers: [
	  new ol.layer.Tile({
                       title: 'World TOPO ESRI',
                        type: 'base',
                        visible: true,
                                  'opacity': 1.000000,

                        source: new ol.source.XYZ({
                        attributions: ' ',
                                  url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                    })
                    }),
	  new ol.layer.Tile({
                              'title': 'World Imagery ESRI',
                              'type': 'base',
                              'opacity': 1.000000,
                              
                              
                              source: new ol.source.XYZ({
                      attributions: ' ',
                                  url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                              })
                        }),
						 new ol.layer.Tile({
                              'title': 'World Relief ESRI',
                              'type': 'base',
                              'opacity': 1.000000,
                              
                              
                              source: new ol.source.XYZ({
                      attributions: ' ',
                                  url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
                              })
                        }),
						new ol.layer.Tile({
                              'title': 'World Street ESRI',
                              'type': 'base',
                              'opacity': 1.000000,
                              
                              
                              source: new ol.source.XYZ({
                      attributions: ' ',
                                  url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
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
          }),
		  style: new ol.style.Style({
            stroke: new ol.style.Stroke({
				color: 'red',
				 lineDash: [3],
			     width: 1,
				 }),
				 fill: new ol.style.Fill({
				 color: 'transparent',
    })
          })
        }),
		new ol.layer.VectorImage({
      title: 'Formations de sol',
         // extent: [-180, -90, -180, 90],
          source: new ol.source.Vector({
			  format: new ol.format.GeoJSON(),
            url: 'https://raw.githubusercontent.com/sig-otmane/webmapping/main/SIG_BELGAMRA/Composants_sol.geojson'
          }),
		  style: function (feature) {
    style.getText().setText(feature.get('name'));
    return style;
  }
        }),
        new ol.layer.VectorImage({
      title: 'réseaux routier',
         // extent: [-180, -90, -180, 90],
          source: new ol.source.Vector({
			  format: new ol.format.GeoJSON(),
            url: 'https://raw.githubusercontent.com/sig-otmane/webmapping/main/SIG_BELGAMRA/r%C3%A9seaux%20routier.geojson'
          }),
		  style: new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'black', width: 2})
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
  //ident
  let highlight;
const displayFeatureInfo = function (pixel) {
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  const info = document.getElementById('info');
  if (feature) {
    info.innerHTML = feature.getId() + ': ' + feature.get('name');
  } else {
    info.innerHTML = '&nbsp;';
  }

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});

   })();
