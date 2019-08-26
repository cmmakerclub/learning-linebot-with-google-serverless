#!/bin/bash

# curl -X POST -H "Authorization: Bearer $LINE_TOKEN" -F "message=Cloud Functions DEPLOYED! status=$?" https://notify-api.line.me/api/notify
curl -X POST "$NOTIFY_URL"
