#!/bin/bash

curl -X POST -H "Authorization: Bearer $LINE_TOKEN" -F "message=Cloud Functions DEPLOYED!" https://notify-api.line.me/api/notify
