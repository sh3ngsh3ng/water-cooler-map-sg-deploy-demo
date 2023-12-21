#!/bin/bash

# pre install
npm install

# Create a directory for MongoDB data if not exists
mkdir -p ./data

# Start MongoDB
mongod --dbpath=./data --fork --logpath=./data/mongodb.log
