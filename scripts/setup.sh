#!/usr/bin/env bash

function start_debugger() {
  echo "Attempt to start a debugger session for host $1"

  if [ -z "$1" ]; then
    echo ""
    echo "No hostname passed to use for debugger session."
    echo "  e.g.: npm run start:debugger localhost"
    echo ""

    exit 1
  fi

  node --inspect-brk="$1:9229" index.js
}

"$@"
