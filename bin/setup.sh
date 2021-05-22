#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [[ -z "${JSONBIN_TOKEN}" ]] ; then
  echo "Missing jsonbin authorization token; aborting."
  exit 1
fi

GUILD_ID=$1
URL=https://jsonbin.org/kittysparkles/$GUILD_ID

status_code=$(curl -H "authorization: token $JSONBIN_TOKEN" \
     --write-out "%{http_code}\n" \
     --silent \
     --output /dev/null \
     "$URL")

if [[ "$status_code" == 200 ]] ; then
  echo "Path $GUILD_ID already exists; aborting."
  exit 1
elif [[ "$status_code" == 404 ]] ; then
  curl -X POST \
       -H "authorization: token $JSONBIN_TOKEN" \
       -d '{ "scores": {}, "gameids": {} }' \
       "$URL"
  exit 0
else
  echo "Unexpected HTTP status code $status_code; aborting."
fi
