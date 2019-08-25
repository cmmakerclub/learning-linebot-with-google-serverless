const fetch = require("node-fetch");

var mqtt = require("mqtt");
var mqttClient1 = mqtt.connect("mqtt://mqtt.cmmc.io");

//var mqttClient2 = mqtt.connect('mqtt://gb.netpie.io', {
//  username: '6EiMMOxwOEcW7Cn',
//  password: 'LFXAklU3qDAI2L7bXqZ2f27t6FI=',
//  clientId: 'rIfoUxMpLxfly0AN',
//  port: 1883,
//  keepalive: 1000,
//  protocolId: 'MQIsdp',
//  cleanSession: true,
//  protocolVersion: 3,
//});
//
//mqttClient2.on('connect', function() {
//  console.log('on connect');
//});
//
//mqttClient2.on('message', function(topic, message) {
//  // message is buffer
//  console.log(message.tostring());
//});
//
//mqttClient2.on('close', function(topic, message) {
//  // message is buffer
//  // console.log(message.tostring())
//  console.log('closed');
//});

mqttClient1.on("connect", function() {
  console.log(`mqtt1.on connect`);
  mqttClient1.subscribe("presence", function(err) {
    if (!err) {
      //mqttClient1.publish("presence", "Hello mqtt");
    }
  });
});

mqttClient1.on("message", function(topic, message) {
  console.log(message.toString());
});

const textMapping = {
  "ปล่อยยาน": { text: "ON", topic: "" },
  "ลงจอด": { text: "OFF", topic: "" },
  "ยกแขนขึ้น": { text: "ON", topic: "" },
  "ยกแขนลง": { text: "OFF", topic: "" },
  "ขาสั้น": { text: "OFF", topic: "" },
  "ขายาว": { text: "ON", topic: "" },
  "หมุนขึ้น": { text: "ON", topic: "" },
  "หมุนลง": { text: "OFF", topic: "" },
  "หมุนซ้าย": { text: "ON", topic: "" },
  "หมุนขวา": { text: "OFF", topic: "" }
};

const get = (url) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      timeout: 5 * 1000
    }
  };
  return fetch(url, options).then(response => response.json());
};

const post = (url, body, req) => {
  console.log("http requesting.. ", url);
  let headers;
  if (req.headers) {
    headers = req.headers;
  } else {
    headers = {
      "Content-Type": "application/json",
      timeout: 5 * 1000
    };
  }
  console.log(headers);
  const options = {
    method: "POST",
    body: body,
    headers
  };
  return fetch(url, options)
    .then(response => {
      console.log(response);
      let t = response.text();
      return t;
    });
};

const constructReplyMessage = (text) => {
  let data = { type: "text", text };
  return data;
};

const publishMqtt = ({ topic, msg }) => {
  try {
    topic = `/CMMCxPaperSignals/gearname/${topic}`;
    mqttClient1.publish(topic, msg);
  } catch (e) {
    console.error(`found error.`, e);
  }
};

module.exports = {
  get,
  post,
  textMapping,
  constructReplyMessage,
  publishMqtt
};
