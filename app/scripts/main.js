/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	/* create leaflet map */
	var map = L.map('map', {
		center: [52.5377, 13.3958],
		zoom: 4
	});

	/* add hash */
	var hash = new L.Hash(map);

	/* add default stamen tile layer */
	new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 18,
		attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	}).addTo(map);

	var overlay = L.tileLayer('http://98.202.195.171/osm/{z}/{x}/{y}.png').addTo(map);

	var range = document.getElementById('range');

	function clip() {
		var nw = map.containerPointToLayerPoint([0, 0]), 
		se = map.containerPointToLayerPoint(map.getSize()),
		clipX = nw.x + (se.x - nw.x) * range.value;
		overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
	}

	range['oninput' in range ? 'oninput' : 'onchange'] = clip;
	map.on('move', clip);

	clip();
	map.setView([52.2644,5.2899], 10);
}(window, document, L));