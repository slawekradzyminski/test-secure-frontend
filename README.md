## Local run

```commandline
npm install
npm start
```

## Docker local run

```commandline
docker build --tag=frontend:latest .
docker run -p8081:8081 frontend:latest
```

## Cypress config
```
/Users/ocado/Library/Caches/Cypress/9.2.0/Cypress.app/Contents/Resources/app/packages/server/config
```

## Docker remote run (warning: may be outdated)

```commandline
docker run -p8081:8081 slawekradzyminski/frontend:latest
```

## Verification

Application should run on [http://localhost:8081](http://localhost:8081)

## wait-on

```commandline
npm start & ./node_modules/.bin/wait-on http://localhost:8081 && npx cypress run --browser chrome --headed
```

## allure

```commandline
npm run
allure serve
```

## testrail

[Installation](https://www.gurock.com/testrail/docs/admin/installation/docker/overview)

## cypress grep

```commandline
npx cypress run --env grep="C2121; C2122",grepFilterSpecs=true
```
