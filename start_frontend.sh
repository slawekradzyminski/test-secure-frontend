#!/bin/bash

# Step 1: Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Step 2: Start the npm project
echo "Starting the npm project..."
npm start & # The ampersand runs the command in the background

# Step 3: Wait for port 8081 to be active
echo "Waiting for port 8081 to be active..."

# Use a loop to repeatedly check if the port is open
while true; do
 # Use curl to send a request to http://localhost:8081
 # The -s option makes curl silent, -o /dev/null redirects the output to null,
 # and -w "%{http_code}" prints the HTTP status code
 RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081)

 # Check if the response code is 200
 if [ "$RESPONSE" -eq 200 ]; then
    echo "Port 8081 is active."
    break
 else
    echo "Port 8081 is not active yet. Retrying..."
    sleep 5 # Wait for 5 seconds before retrying
 fi
done

# Step 4: Continue with the rest of the script
echo "Port 8081 is now active. Proceeding with the rest of the script..."
