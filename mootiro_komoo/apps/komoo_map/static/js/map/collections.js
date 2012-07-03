/**
 * collections.js
 * requires compat.js
 */


if (!window.komoo) komoo = {};
if (!komoo.event) komoo.event = google.maps.event;

if (!komoo.collections) komoo.collections = {};

/** FeatureCollection Factory **/

komoo.collections.makeFeatureCollection = function (opts) {
    var options = opts || {};
    var features = options.features || [];
    var map = options.map || null;

    var featureCollection = new komoo.collections.FeatureCollection(options);

    if (map) featureCollection.setMap(map);
    if (features) features.forEach(function (feature, index, orig) {
        featureCollections.push(feature);
    });

    return featureCollection;
};


/** Feature Collection **/

komoo.collections.FeatureCollection = function (opts) {
    var options = opts || {};
    this.minZoomGeometry = options.minZoomGeometry || 0;
    this.maxZoomGeometry = options.maxZoomGeometry || 100;
    this.minZoomMarker = options.minZoomMarker || 0;
    this.maxZoomMarker = options.maxZoomMarker || 100;
    this.features_ = [];
    this.length = 0;
};

komoo.collections.FeatureCollection.prototype.getGeoJson = function () {
    var features = [];
    var geoJSON = {
        'type': 'FeatureCollection',
        'features': features
    };
    this.features_.forEach(function (feature, index, orig) {
        features.push(feature.getGeoJsonFeature());
    });
    return geoJSON;
};

komoo.collections.FeatureCollection.prototype.clear = function () {
    this.features_ = [];
    this.updateLength_();
};

komoo.collections.FeatureCollection.prototype.removeAllFromMap = function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.removeFromMap();
    });
};

komoo.collections.FeatureCollection.prototype.getAt = function (index) {
    return this.features_[index];
};

komoo.collections.FeatureCollection.prototype.setVisible = function (flag) {
    this.features_.forEach(function (feature, index, orig) {
        feature.setVisible(flag);
    });
};

komoo.collections.FeatureCollection.prototype.show = function () {
    this.setVisible(true);
};

komoo.collections.FeatureCollection.prototype.hide = function () {
    this.setVisible(false);
};

komoo.collections.FeatureCollection.prototype.setMap = function (map) {
    this.map_ = map;
    this.features_.forEach(function (feature, index, orig) {
        feature.setMap(map);
    });
    this.handleMapEvents()
}

komoo.collections.FeatureCollection.prototype.showGeometries = function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.showGeometry();
    });
};

komoo.collections.FeatureCollection.prototype.hideGeometries = function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.hideGeometry();
    });
};

komoo.collections.FeatureCollection.prototype.showMarkers = function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.showMarker();
    });
};

komoo.collections.FeatureCollection.prototype.hideMarkers = function () {
    this.features_.forEach(function (feature, index, orig) {
        feature.hideMarker();
    });
};

komoo.collections.FeatureCollection.prototype.handleMapEvents = function () {
    var that = this;
    komoo.event.addListener(this.map_, 'zoom_changed', function (zoom) {
        that.onZoomChanged(zoom);
    });
};

komoo.collections.FeatureCollection.prototype.onZoomChanged = function (zoom) {
    if (zoom <= this.maxZoomGeometry && zoom >= this.minZoomGeometry) {
        this.showGeometries();
    } else {
        this.hideGeometries();
    }
    if (zoom <= this.maxZoomMarker && zoom >= this.minZoomMarker) {
        this.showMarkers();
    } else {
        this.hideMarkers();
    }
};


/* Private methods */

komoo.collections.FeatureCollection.prototype.updateLength_ = function () {
    this.length = this.features_.length;
}


/* Delegations */

komoo.collections.FeatureCollection.prototype.push = function (feature) {
   this.features_.push(feature); 
   feature.setMap(this.map_);
   this.updateLength_();
};

komoo.collections.FeatureCollection.prototype.pop = function () {
   var element = this.features_.pop(); 
   this.updateLength_();
   return element;
};

komoo.collections.FeatureCollection.prototype.forEach = function (callback, thisArg) {
   this.features_.forEach(callback, thisArg); 
};
