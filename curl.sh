curl -H "Content-Type: application/json" \
  -u 'slawomir.radzyminski.consulting@gmail.com:dredar' \
  --request POST \
  --data '{"name":"test run 1","description":"testing..."}' \
  "http://localhost:8000/index.php?/api/v2/add_run/2"
