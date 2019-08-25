let { constructReplyMessage, publishMqtt, textMapping } = require("./utils");

let f = require("firebase-functions");
const line = require("@line/bot-sdk");
const admin = require("firebase-admin");
const { get, post } = require("./utils");
const { flex1 } = require("./flex.messages");
const moment = require("moment-timezone");
const insertRows = require("./db/cmmc-bq-no-partition");
const request = require("request-promise");

process.env.LOG_LEVEL = "error";
const configs = f.config();
//asia-northeast1
const functions = ((f) => f.region("asia-east2").runWith({
  timeoutSeconds: 4, memory: "2GB"
}))(f);

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  }
);

const db = admin.firestore();

const httpEndpoint = configs.iot.http.endpoint;
let topic = `CMMC/PLUG-002/$/command`;

const postToDialogflow = (req, body) => {
  req.headers.host = "bots.dialogflow.com";
  return request.post({
    uri: `${configs.nat.dialogflow}`,
    headers: req.headers,
    body: JSON.stringify(body)
  });
};

exports.line_nat_chatbot_webhook = functions.https.onRequest(
  (req, res) => {
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
exports.nat_chatbot = functions.https.onRequest(
  require("./fn/rocket"));
exports.pps_rocket_bot = functions.https.onRequest(
  require("./fn/rocket"));
exports.pps_pants_bot = functions.https.onRequest(
  require("./fn/pants"));
exports.pps_arrow_bot = functions.https.onRequest(
  require("./fn/arrow"));
exports.pps_countdown_bot = functions.https.onRequest(
  require("./fn/countdown"));
exports.pps_stretch_bot = functions.https.onRequest(
  require("./fn/stretch"));
exports.wave_function = functions.https.onRequest(
  require("./fn/wave_funtion"));

exports.nat_insert_bq = functions.https.onRequest(
  (req, res) => {
    const responseJson = {
      recv_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      recv_body_len: req.body.length
    };

    console.log("xxxxxxxx ");

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
    } else if (req.method === "GET") {
      let data = db.collection("").doc("1").get() // collection ของ DB ที่มี Document ที่ชื่อว่า 1
        .then(c => {
          console.log(c);
        });
    } else if (req.method === "PUT") {
      res.status(403).send("Forbidden!");
    } else {
      res.status(403).send("Forbidden!");
    }

  });

exports.myFunctionName = f.firestore
  .document("users/nat").onWrite((change, context) => {
    // ... Your code here
    consle.log("users/nat onWrite!");
  });

exports.line_cmmc_chatbot_webhook = functions.https.onRequest((
  req, res) => {
  const config = {
    channelAccessToken: configs.nat.line.bot1["channel-access-token"],
    channelSecret: configs.nat.line.bot1["channel-secret-token"]
  };

  console.log(config);

  const client = new line.Client(config);
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    body.events.map(event => {
      console.log(event);
      if (event.type === "message" && event.message.type === "text") {
        console.log("-----------------------------------------");
        console.log(`source type = ${event.source.type}`);
        console.log(`message text = ${event.message.text}`);
        console.log(`replyToken = ${event.replyToken}`);
        console.log(JSON.stringify(event));
        const body = Object.assign({}, req.body);
        postToDialogflow(req, body);
      } else {
        let data = constructReplyMessage(event.message.text);
        data.text = JSON.stringify(req.body);
        try {
          console.log(data);
          client.replyMessage(event.replyToken, data).then(res => {
            console.log(`reply result = `, res);
          });
        } catch (e) {
          console.log("error", e);
        }

        // calling mqtt bridge
        //get(`${httpEndpoint}?topic=${topic}&command=${event.message.text}`);
        console.log("/-----------------------------------------");
      }
    });
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).send("GET OK " + JSON.stringify(req));
  } else {

  }

});
const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true });
const app = express();

app.use(cors);
app.use(cookieParser);
//app.use(validateFirebaseIdToken);
//app.use(cookieParser);
//app.use(validateFirebaseIdToken);
app.get("/hello", (req, res) => {
  res.send(`Hello /hello`);
  res.end();
});

app.get("/", (req, res) => {
  res.send("This is GET.");
  res.end();
});

exports.cronSyntax = functions.pubsub
  .schedule("5 * * * *")
  .timeZone("Asia/Bangkok")
  .onRun(context => {
    console.log("triggered every 5 minutes", context);
  });

exports.widget = functions.https.onRequest(app);
