const fetch = require('node-fetch');

var mqtt = require('mqtt');
var mqttClient1 = mqtt.connect('mqtt://mqtt.cmmc.io');
var mqttClient2 = mqtt.connect('mqtt://gb.netpie.io', {
  username: '6EiMMOxwOEcW7Cn',
  password: 'LFXAklU3qDAI2L7bXqZ2f27t6FI=',
  clientId: 'rIfoUxMpLxfly0AN',
});

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

const textMapping = {
  'ปล่อยยาน': {text: 'ON', topic: ''},
  'ลงจอด': {text: 'OFF', topic: ''},
  'ยกแขนขึ้น': {text: 'ON', topic: ''},
  'ยกแขนลง': {text: 'OFF', topic: ''},
  'ขาสั้น': {text: 'ON', topic: ''},
  'ขายาว': {text: 'OFF', topic: ''},
};

const get = (url) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      timeout: 5 * 1000,
    },
  };
  return fetch(url, options).then(response => response.json());
};

const post = (url, body) => {
  console.log('http requesting.. ', url);
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      timeout: 5 * 1000,
    },
  };
  return fetch(url, options).then(response => response.text());
};

const constructReplyMessage = (text) => {
  let data = {type: 'text', text};
  return data;
};

const publishMqtt = ({topic, msg}) => {
  try {
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
  publishMqtt,
};
