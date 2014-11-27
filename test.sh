#! /bin/bash
set -e

curl https://install.meteor.com | /bin/sh

../node_modules/velocity-ci/velocity-ci.js