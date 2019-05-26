const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
const admin = require("firebase-admin");
const {get, post} = require("./utils");

admin.initializeApp();

const httpEndpoint = functions.config().iot.http.endpoint;
let topic = `CMMC/PLUG-002/$/command`;

exports.line_nat_chatbot_webhook = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).
    send("line_nat_chatbot_webhook GET OK " + JSON.stringify(req));
  } else {
    res.status(500).send("Forbidden!");
  }
});

exports.line_KornWtp_chatbot_webhook = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).
    send("line_KornWtp_chatbot_webhook GET OK " + JSON.stringify(req));
  } else {
    res.status(500).send("Forbidden!");
  }
});

exports.line_Boat_chatbot_webhook = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    const body = Object.assign(req.body);
    res.status(200).send("post ok");
  } else if (req.method === "GET") {
    res.status(200).
    send("line_Boat_chatbot_webhook GET OK " + JSON.stringify(req));
  } else {
    res.status(500).send("Forbidden!");
  }
});

exports.line_cmmc_chatbot_webhook = functions.https.onRequest((req, res) => {
  const config = {
    channelAccessToken: functions.config().cmmc.line["channel-access-token"],
    channelSecret: functions.config().cmmc.line["channel-secret"],
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

        const data = {
          type: "text",
          text: event.message.text,
        };

        if (event.message.text === "Nat") {
          data.text = "หวัดดี";
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
    res.status(500).send("Forbidden!");
  }
});
