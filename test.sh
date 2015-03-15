#! /bin/bash
set -e

curl https://install.meteor.com | /bin/sh

meteor --test --once