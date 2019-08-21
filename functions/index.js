let { constructReplyMessage, publishMqtt, textMapping } = require("./utils");

const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
const admin = require("firebase-admin");
const { get, post } = require("./utils");
const { flex1 } = require("./flex.messages");
const moment = require("moment-timezone");
const insertRows = require("./db/cmmc-bq-no-partition");

process.env.LOG_LEVEL = "error";

admin.initializeApp();

const httpEndpoint = functions.config().iot.http.endpoint;
let topic = `CMMC/PLUG-002/$/command`;

exports.line_nat_chatbot_webhook = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).send("line_nat_chatbot_webhook GET OK " +
      JSON.stringify(req));
  } else {
    res.status(500).send("Forbidden!");
  }
});

exports.nat_chatbot = functions.https.onRequest(require("./fn/rocket"));
exports.pps_rocket_bot = functions.https.onRequest(require("./fn/rocket"));
exports.pps_pants_bot = functions.https.onRequest(require("./fn/pants"));
exports.pps_arrow_bot = functions.https.onRequest(require("./fn/arrow"));
exports.pps_countdown_bot = functions.https.onRequest(require("./fn/countdown"));
exports.pps_stretch_bot = functions.https.onRequest(require("./fn/stretch"));
exports.wave_function = functions.https.onRequest(require("./fn/stretch"));

exports.nat_insert_bq = functions.https.onRequest((req, res) => {

  const responseJson = {
    recv_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    recv_body_len: req.body.length
  };

  if (req.method === "POST") {
    if (Array.isArray(req.body)) {
      console.log("req is array");
      console.log("body = ", JSON.stringify(req.body));
      insertRows(req.body, (err, data) => {
        console.log("error = ", err, "data=", data);
      });
    } else {
      console.log("..... data is an object.");
      const body = Object.assign({}, req.body);
      console.log("body = ", JSON.stringify(body));
      insertRows([req.body], (err, data) => {
        console.log("error = ", err, "data=", data);
      });
    }

    res.status(200).send(JSON.stringify(responseJson));
  } else if (req.method === "PUT") {
    res.status(403).send("Forbidden!");
  } else {
    res.status(403).send("Forbidden!");
  }

});

exports.line_cmmc_chatbot_webhook = functions.https.onRequest((
  req, res) => {
  const config = {
    channelAccessToken: functions.config().cmmc.line["channel-access-token"],
    channelSecret: functions.config().cmmc.line["channel-secret"]
  };
  const client = new line.Client(config);
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === "message" && event.message.type === "text") {
        console.log("-----------------------------------------");
        console.log(`source type = ${event.source.type}`);
        console.log(`message text = ${event.message.text}`);
        console.log(`replyToken = ${event.replyToken}`);
        console.log(JSON.stringify(event));
        let data = constructReplyMessage(event.message.text);

        if (event.message.text === "Nat") {
          data.text = "หวัดดี";
        } else if (event.message.text === "flex") {
          data = flex1;
        } else {
          data.text = event.message.text;
        }

        client.replyMessage(event.replyToken, data).then(res => {
          console.log(`reply result = `, res);
        });

        // calling mqtt bridge
        get(`${httpEndpoint}?topic=${topic}&command=${event.message.text}`);
        console.log("/-----------------------------------------");
      }
    });
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).send("GET OK " + JSON.stringify(req));
  } else {

  }
});
