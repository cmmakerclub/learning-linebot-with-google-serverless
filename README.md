# Configuration
```
$ firebase functions:config:set user.line.channel-access-token="xxxx"
$ firebase functions:config:set user.line.channel-secret="xxxxxx"
$ firebase functions:config:set user.iot.http.endpoint="xxxxxx"
```
# Code

```
  const functions = require("firebase-functions");
  functions.config().iot.http.endpoint;
```
# Deploying

```
$ firebase deploy
```
