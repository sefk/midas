var _ = require('underscore');
var json2csv = require('json2csv');

var renderCSV = function (model, records) {
  var output = "";
  json2csv({
    data: records,
    fields: _.values(model.exportFormat),
    fieldNames: _.keys(model.exportFormat),
  }, function (err, csv) {
    if (err) {
      return {rc: 400, payload: {message: 'There was a render error.', error: err}};
    }
    // TODO: consider streaming to be memory-efficient for large data sets
    output += csv + "\n";
  });
  return {rc: 200, content: output};
}
