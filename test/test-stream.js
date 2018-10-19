const geojsonvt = require('../geojson-vt-dev');
const {
  Readable
} = require('stream');
const fs = require('fs');

var geoJSON = JSON.parse(fs.readFileSync('./fixtures/us-states.json', 'utf8'));
var maxZoom = 14;

var options = {
  stream: new Readable(),
  maxZoom: maxZoom, // max zoom to preserve detail on; can't be higher than 24
  tolerance: 1, // simplification tolerance (higher means simpler)
  extent: 4096, // tile extent (both width and height)
  buffer: 64, // tile buffer on each side
  debug: 0, // logging level (0 to disable, 1 or 2)
  lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
  promoteId: null, // name of a feature property to promote to feature.id. Cannot be used with `generateId`
  generateId: false, // whether to generate feature ids. Cannot be used with `promoteId`
  indexMaxZoom: maxZoom, // max zoom in the initial tile index
  indexMaxPoints: 0 // max number of points per tile in the index / you can pre-generate all possible tiles for data by setting indexMaxZoom and maxZoom to the same value and setting indexMaxPoints to 0
};

options.stream._read = function () {};
options.stream.on('end', function (data) {
  // console.log('done');
  // process.stdout.write('\n]');
});

// var first = true;
options.stream.on('data', function (data) {
  // console.log('write', data.toString());
  // var out = "";
  // if (first)  out = out +('[\n  ');
  // if (!first) out = out + (',\n  ');
  // process.stdout.write(out + data);
  process.stdout.write(data + '\n');
  // first = false;
});

// build an initial index of tiles
var tileIndex = geojsonvt(geoJSON, options);
// console.log('ready?');
