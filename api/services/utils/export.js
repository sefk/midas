var _ = require('underscore');
var json2csv = require('json2csv');
var moment = require('moment')

module.exports = {

  /**
   * Given a set of records, render to an string in CSV format. First line will be the
   * names of the columns.
   *
   * @param model -- an exportFormat object to describe what list to output. Each
   *        field maps the output column to the input field. If the input field is
   *        a string then it's a simple fetch, if it's an object itself then it should
   *        have a field member for the fetch, and a format field for the function to
   *        apply to that field.
   * @param records -- array of records to dump out
   * @returns {{rc: number, content: string}}
   */
  renderCSV: function (model, records) {
    var output = "";
    var fieldNames = _.keys(model.exportFormat);
    var fields = _.values(model.exportFormat);

    // clean up records
    fields.forEach(function (field, fIndex, fields) {
      if (typeof(field) === "object") {
        records.forEach(function (rec, rIndex, records) {
          records[rIndex][field.field] = field.filter.call(this, rec[field.field]);
        });
        fields[fIndex] = field.field;
      }
    });

    json2csv({
      data: records,
      fields: fields,
      fieldNames: fieldNames
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
  },

  /**
   * Format a date as a string that imports nicely into Excel. Uses the nice momentjs
   * library to do the heavy lifting.
   *
   * @param JS date object
   * @returns date string
   */
  excelDateFormat: function (date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

};
