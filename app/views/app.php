<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>phanime</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="/" />

    <link rel="stylesheet" href="assets/vendor.css">
    <link rel="stylesheet" href="assets/front.css">
  </head>
  <body>
    <script>
      window.FrontENV = {"environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"LOG_RESOLVER":true,"LOG_ACTIVE_GENERATION":true,"LOG_MODULE_RESOLVER":true,"LOG_VIEW_LOOKUPS":true},"simple-auth-oauth2":{"serverTokenEndpoint":"/api/v1/oauth/token"},"LOG_MODULE_RESOLVER":true};
      window.EmberENV = window.FrontENV.EmberENV;
    </script>
    <script src="assets/vendor.js"></script>
    <script src="assets/front.js"></script>
    <script>
      window.Front = require('front/app')['default'].create(FrontENV.APP);
    </script>
  </body>
</html>
