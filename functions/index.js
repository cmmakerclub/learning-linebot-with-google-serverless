const functions = require('firebase-functions');
const line = require('@line/bot-sdk');
const admin = require('firebase-admin');
const {get, post} = require('./utils');
const {flex1} = require('./flex.messages');
//const {mqtt} = require('cmmc-mqtt');

var mqtt = require('mqtt');
var mqttClient1 = mqtt.connect('mqtt://mqtt.cmmc.io');

mqttClient1.on('connect', function() {
  mqttClient1.subscribe('presence', function(err) {
    if (!err) {
      mqttClient1.publish('presence', 'Hello mqtt');
    }
  });
});

mqttClient1.on('message', function(topic, message) {
  console.log(message.toString());
});

process.env.LOG_LEVEL = 'error';

admin.initializeApp();

const constructReplyMessage = (text) => {
  let data = {type: 'text', text};
  return data;
};

const httpEndpoint = functions.config().iot.http.endpoint;
let topic = `CMMC/PLUG-002/$/command`;

exports.line_nat_chatbot_webhook = functions.https.onRequest((req, res) => {
  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    res.status(200).send('post ok');
  } else if (req.method === 'GET') {
    res.status(200).
    send('line_nat_chatbot_webhook GET OK ' + JSON.stringify(req));
  } else {
    res.status(500).send('Forbidden!');
  }
});

const textMapping = {
  'ปล่อยยาน': {text: 'ON', topic: ''},
  'ลงจอด': {text: 'OFF', topic: ''},
  'ยกแขนขึ้น': {text: 'ON', topic: ''},
  'ยกแขนลง': {text: 'OFF', topic: ''},
  'ขาสั้น': {text: 'ON', topic: ''},
  'ขายาว': {text: 'OFF', topic: ''},
};

//exports.line_KornWtp_chatbot_webhook = functions.https.onRequest((req, res) => {
//  if (req.method === 'POST') {
//    const body = Object.assign(req.body);
//    res.status(200).send('post ok');
//  } else if (req.method === 'GET') {
//    res.status(200).
//    send('line_KornWtp_chatbot_webhook GET OK ' + JSON.stringify(req));
//  } else {
//    res.status(500).send('Forbidden!');
//  }
//});

const publishMqtt = ({topic, msg}) => {
  try {
    mqttClient1.publish(topic, msg);
  } catch (e) {
    console.error(`found error.`, e);
  }
};

exports.pps_rocket_bot = functions.https.onRequest((req, res) => {
  let channelAccessToken = functions.config()['pps-rocket-bot']['line']['channel-access-token'];
  let channelSecret = functions.config()['pps-rocket-bot']['line']['channel-secret'];
  const client = new line.Client({channelAccessToken, channelSecret});

  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === 'message') {
        if (event.message.type === 'text') {
          if (textMapping[event.message.text]) {
            let msg = textMapping[event.message.text].text ||
                event.message.text;
            publishMqtt({topic: 'cf/rocket', msg});
          } else {
            publishMqtt({topic: 'cf/rocket', msg: event.message.text});
          }
          console.log(`event=`, event);

          client.replyMessage(event.replyToken,
              constructReplyMessage(event.message.text)).then(r => {
            //res.status(200).send('post ok');
          });
        } else {
          client.replyMessage(event.replyToken,
              constructReplyMessage(`ยังไม่รองรับข้อความประเภท ${event.message.type}`)).
          then(r => {
            //res.status(200).send('post ok');
          });
        }
        res.status(200).send('post ok');
      } else if (req.method === 'GET') {
        res.status(200).send('rocket GET OK ' + JSON.stringify(req));
      } else {
        res.status(500).send('Forbidden!');
      }
    });
  }
});

exports.pps_pants_bot = functions.https.onRequest((req, res) => {
  let channelAccessToken = functions.config()['pps-pants-bot']['line']['channel-access-token'];
  let channelSecret = functions.config()['pps-pants-bot']['line']['channel-secret'];
  console.log(`pants`, {channelAccessToken, channelSecret});
  const client = new line.Client({channelAccessToken, channelSecret});

  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === 'message') {
        if (event.message.type === 'text') {
          if (textMapping[event.message.text]) {
            let msg = textMapping[event.message.text].text ||
                event.message.text;
            publishMqtt({topic: 'cf/pants', msg});
          } else {
            publishMqtt({topic: 'cf/pants', msg: event.message.text});
          }
          console.log(`event=`, event);

          client.replyMessage(event.replyToken,
              constructReplyMessage(event.message.text)).then(r => {
            //res.status(200).send('post ok');
          });
        } else {
          client.replyMessage(event.replyToken,
              constructReplyMessage(`ยังไม่รองรับข้อความประเภท ${event.message.type}`)).
          then(r => {
            //res.status(200).send('post ok');
          });
        }
        res.status(200).send('post ok');
      } else if (req.method === 'GET') {
        res.status(200).send('rocket GET OK ' + JSON.stringify(req));
      } else {
        res.status(500).send('Forbidden!');
      }
    });
  }
});

exports.pps_arrow_bot = functions.https.onRequest((req, res) => {
  let channelAccessToken = functions.config()['pps-arrow-bot']['line']['channel-access-token'];
  let channelSecret = functions.config()['pps-arrow-bot']['line']['channel-secret'];
  const client = new line.Client({channelAccessToken, channelSecret});
  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === 'message' && event.message.type === 'text') {
        let data = constructReplyMessage(event.message.text);
        client.replyMessage(event.replyToken, data).then(res => { });
        res.status(200).send('post ok');
      } else if (req.method === 'GET') {
        res.status(200).
        send('pps_arrow_bot GET OK ' + JSON.stringify(req));
      } else {
        res.status(500).send('Forbidden!');
      }
    });
  }
});

exports.line_cmmc_chatbot_webhook = functions.https.onRequest((
    req, res) => {
  const config = {
    channelAccessToken: functions.config().cmmc.line['channel-access-token'],
    channelSecret: functions.config().cmmc.line['channel-secret'],
  };
  const client = new line.Client(config);
  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === 'message' && event.message.type === 'text') {
        console.log('-----------------------------------------');
        console.log(`source type = ${event.source.type}`);
        console.log(`message text = ${event.message.text}`);
        console.log(`replyToken = ${event.replyToken}`);
        console.log(JSON.stringify(event));

        if (event.message.text === 'Nat') {
          data.text = 'หวัดดี';
        } else if (event.message.text === 'flex') {
          data = flex1;
        } else {
          data.text = event.message.text;
        }

        client.replyMessage(event.replyToken, data).then(res => {
          console.log(`reply result = `, res);
        });

        // calling mqtt bridge
        get(`${httpEndpoint}?topic=${topic}&command=${event.message.text}`);
        console.log('/-----------------------------------------');
      }
    });
    res.status(200).send('post ok');
  } else if (req.method === 'GET') {
    res.status(200).send('GET OK ' + JSON.stringify(req));
  } else {

  }
});
