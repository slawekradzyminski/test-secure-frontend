export TESTRAIL_HOST="http://localhost:8000"
export TESTRAIL_USERNAME="slawomir.radzyminski.consulting@gmail.com"
export TESTRAIL_PASSWORD="dredar"
export TESTRAIL_PROJECTID=2
NOW=$( date '+%F_%H:%M:%S' )
runName="Testing TestRail locally ${NOW}"
runDescription="Cypress tests on Dredar Training"
runId=$(npx testrail-start-run "${runName}" "${runDescription}")
echo "TestRail run id ${runId}"
export TESTRAIL_RUN_ID=${runId}
npx cypress run
npx testrail-close-run ${runId}