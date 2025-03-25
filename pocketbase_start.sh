#!/bin/bash

case $(uname -m) in\
    x86_64 | amd64 | x64) PB_ARCH='amd64' ;;\
    arm64 | aarch64 | armv8* | armv9*) PB_ARCH='arm64' ;;\
    *) echo "Unknown architecture" ;;\
esac

./pocketbase_${PB_ARCH} serve --http 0.0.0.0:4000

