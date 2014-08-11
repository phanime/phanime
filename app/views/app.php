<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Phanime</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="/" />

    <link rel="stylesheet" href="assets/vendor.css">
    <link rel="stylesheet" href="assets/phanime.css">
  </head>
  <body>
    <script>
      window.PhanimeENV = {"environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true},"simple-auth-oauth2":{"serverTokenEndpoint":"/api/v1/oauth/token"},"simple-auth":{"authorizer":"simple-auth-authorizer:oauth2-bearer"}};
      window.EmberENV = window.PhanimeENV.EmberENV;
    </script>
    <script src="assets/vendor.js"></script>
    <script src="assets/phanime.js"></script>
    <script>
      window.Phanime = require('phanime/app')['default'].create(PhanimeENV.APP);
    </script>
  </body>
</html>
