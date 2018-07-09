#!/usr/bin/env bash

# Fetch dependency
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.56.tar.gz
tar zxvf bcm2835-1.56.tar.gz
cd bcm2835-1.56 || exit

# Configure build steps
./configure

# Build binary
make
sudo make check
sudo make install && cd .. && rm bcm2835-1.xx.tar.gz && rm -rf bcm2835-1.56
