const event = {};
const valveText = "valveText";
const replyMessage = {
  "type": "flex",
  "altText": "แผงควบคุมระบบรดน้ำในฟาร์ม",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "รายงานสถานะจากอุปกรณ์",
          "align": "center",
          "weight": "bold",
        },
      ],
    },
    "hero": {
      "type": "image",
      "url": "https://firebasestorage.googleapis.com/v0/b/thaifarmer-1be95.appspot.com/o/condition.png?alt=media&token=8c44813c-9e16-49a2-a2c8-1718f3c7bcf7",
      "size": "lg",
      "aspectRatio": "1:1",
      "aspectMode": "fit",
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "flex": 1,
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/thaifarmer-1be95.appspot.com/o/pot.png?alt=media&token=d926d245-3726-4d92-b307-14f4383a0069",
              "flex": 0,
              "align": "start",
              "size": "xxs",
              "aspectRatio": "2:1",
            },
            {
              "type": "text",
              "text": "อุณหภูมิ",
              "weight": "bold",
            },
            {
              "type": "text",
              "text": `${event.temperature}°C`,
              "align": "end",
            },
            {
              "type": "spacer",
            },
          ],
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/thaifarmer-1be95.appspot.com/o/humidity.png?alt=media&token=393f1c2b-67f9-4f27-93ad-58660d813c00",
              "flex": 0,
              "align": "start",
              "size": "xxs",
              "aspectRatio": "2:1",
            },
            {
              "type": "text",
              "text": "ความชื้น",
              "align": "start",
              "weight": "bold",
            },
            {
              "type": "text",
              "text": `${event.humidity}%`,
              "align": "end",
            },
            {
              "type": "spacer",
            },
          ],
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/thaifarmer-1be95.appspot.com/o/soil.png?alt=media&token=422971be-a433-4d4a-8c6f-22976e936111",
              "flex": 0,
              "align": "start",
              "size": "xxs",
              "aspectRatio": "2:1",
            },
            {
              "type": "text",
              "text": "ความชื้นในดิน",
              "weight": "bold",
            },
            {
              "type": "text",
              "text": `${event.soilMoisture}%`,
              "align": "end",
            },
            {
              "type": "spacer",
            },
          ],
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/thaifarmer-1be95.appspot.com/o/watering.png?alt=media&token=ddd07a8e-5fed-4c95-9019-e62b6cd08f91",
              "flex": 0,
              "align": "start",
              "size": "xxs",
              "aspectRatio": "2:1",
            },
            {
              "type": "text",
              "text": "สถานะวาล์ว",
              "weight": "bold",
            },
            {
              "type": "text",
              "text": `${valveText}`,
              "flex": 1,
              "align": "end",
            },
            {
              "type": "spacer",
            },
          ],
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "spacer",
            },
            {
              "type": "text",
              "text": `${event.time}`,
              "align": "center",
            },
            {
              "type": "spacer",
            },
          ],
        },
        {
          "type": "spacer",
        },
      ],
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "เปิดระบบน้ำ",
            "text": "openValve",
          },
          "style": "primary",
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ปิดระบบน้ำ",
            "text": "closeValve",
          },
          "margin": "sm",
          "style": "secondary",
        },
      ],
    },
  },
};

module.exports = {
  flex1: replyMessage,
};
