#!/bin/bash

# Step 1: Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Step 2: Start the npm project
echo "Starting the npm project..."
npm start & # The ampersand runs the command in the background

# Step 3: Wait for port 8081 to be active with a 2-minute timeout
echo "Waiting for port 8081 to be active..."

# Use the timeout command to limit the waiting time to 2 minutes
timeout 2m bash -c '
 # Loop until the port is active or the timeout is reached
 until echo -n | telnet localhost 8081 > /dev/null 2>&1; do
    echo "Port 8081 is not active yet. Retrying..."
    sleep 5 # Wait for 5 seconds before retrying
 done
'

# Check if the timeout command exited due to a timeout or because the port became active
if [ $? -eq 124 ]; then
 echo "Timeout reached. Port 8081 did not become active within 2 minutes."
 exit 1
else
 echo "Port 8081 is active."
fi

# Step 4: Continue with the rest of the script
echo "Port 8081 is now active. Proceeding with the rest of the script..."
