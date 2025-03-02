#!/bin/bash

source .env
#Required values
REQUEST_URL='https://api.podcastindex.org/api/1.0/podcasts/trending'

API_KEY="${PODCASTINDEX_API_KEY}"
API_SECRET="${PODCASTINDEX_API_SECRET}"
API_HEADER_TIME="$(date +%s)"

# Has values to get Authorization token
HASH="$(echo -n "${API_KEY}${API_SECRET}${API_HEADER_TIME}" | sha1sum | awk '{print $1}')"

# Set required header
HEADERS=(-H "User-Agent: bash-podcastindex-org-example/0.1" -H "X-Auth-Key: ${API_KEY}" -H "X-Auth-Date: ${API_HEADER_TIME}" -H "Authorization: ${HASH}")

# Make request
curl "${HEADERS[@]}"  "${REQUEST_URL}" | jq

