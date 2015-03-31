var _ = require('underscore');
var json2csv = require('json2csv');

module.exports = {

  renderCSV: function (model, records) {
    var output = "";
    json2csv({
      data: records,
      fields: _.values(model.exportFormat),
      fieldNames: _.keys(model.exportFormat),
    }, function (err, csv) {
      if (err) {
        return {
          rc: 400,
          content: {message: 'There was a render error.', error: err}
        };
      }
      // TODO: streaming would be more memory efficient
      output += csv + "\n";
    });
    return {rc: 200, content: output};
  }

};
