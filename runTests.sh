#!/bin/bash
npm install
npm start & npx wait-on http://localhost:8081 && npx cypress run --browser chrome
