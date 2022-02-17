#!/bin/bash
npm start & ./node_modules/.bin/wait-on http://localhost:8080
npx cypress run --browser chrome --headed