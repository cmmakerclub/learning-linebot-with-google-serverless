// Imports the Google Cloud client library
const { BigQuery } = require("@google-cloud/bigquery");
const moment = require("moment-timezone");

// Your Google Cloud Platform project ID
const projectId = "cmmc-dsc1";

// Creates a client
const bigquery = new BigQuery({
  projectId: projectId
});

const config = {
  DATASET: "ds1",
  TABLE: "table1"
};

function insertRows(rows, cb) {
  const table = config.TABLE;
  // var partition = moment.tz('Asia/Bangkok').format('YYYYMMDD')
  // var table = config.TABLE + '$' + partition
  // rows = rows.map(row => {
  //   row.gps_utc = moment.tz('Asia/Bangkok').format();
  //   return row;
  // });

  bigquery.dataset(config.DATASET).table(table).insert(rows).then((data) => {
    cb(null, data);
  }).catch((err) => {
    console.error(`INSERT ERROR: `, JSON.stringify(err));
    if (Array.isArray(err.errors)) {
      err.errors.forEach((v, idx) => {
        if (!v.errors) {
          console.log("[x] eror=", JSON.stringify(v.errors));
        } else {
          v.errors.forEach((v, idx) => {
            console.error(`---- error: ${v.message}`);
          });
        }
      });
    }
    cb(err);
  });
}

//const row = Object.assign({}, {raw: 'test', unix: new Date().getTime() })
//const rows = [row]

module.exports = insertRows;

