#!/bin/bash

# Build the image
docker build -t pw-img-webkit-linux .

# Create a temporary container
docker create --name temp-container pw-img-webkit-linux

# Copy files (replace with your specific needs)
docker cp temp-container:/app/render-with-cache-response-ss.png ./
docker cp temp-container:/app/render-with-base64-ss.png ./

# Remove the temporary container
docker rm temp-container
