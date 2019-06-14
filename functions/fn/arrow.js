let {constructReplyMessage, publishMqtt, textMapping} = require('../utils');
const functions = require('firebase-functions');
const line = require('@line/bot-sdk');

module.exports = (req, res) => {
  let channelAccessToken = functions.config()['pps-arrow-bot']['line']['channel-access-token'];
  let channelSecret = functions.config()['pps-arrow-bot']['line']['channel-secret'];
  const client = new line.Client({channelAccessToken, channelSecret});
  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(event => {
      if (event.type === 'message') {
        if (event.message.type === 'text') {
          if (textMapping[event.message.text]) {
            let msg = textMapping[event.message.text].text ||
                event.message.text;
            publishMqtt({topic: 'cf/arrow', msg});
          } else {
            publishMqtt({topic: 'cf/arrow', msg: event.message.text});
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
};
