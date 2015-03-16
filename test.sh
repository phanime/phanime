#! /bin/bash
set -e

curl https://install.meteor.com | /bin/sh
meteor update --release 1.0.4-rc.0
meteor --test