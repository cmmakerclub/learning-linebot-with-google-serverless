# Configuration
```
$ firebase functions:config:set user.line.channel-access-token="xxxx"
$ firebase functions:config:set user.line.channel-secret="xxxxxx"
$ firebase functions:config:set user.iot.http.endpoint="xxxxxx"
$ firebase functions:config:get
```
# Code

```
  const functions = require("firebase-functions");
  functions.config().user.iot.http.endpoint;
```
# Deploying

```
$ firebase deploy
```
