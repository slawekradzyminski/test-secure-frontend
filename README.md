## Allure
npm install -g allure-commandline
copy-paste z instrukcji https://github.com/Shelex/cypress-allure-plugin
allure serve

## Cypress grep
copy-paste z instrukcji https://github.com/cypress-io/cypress-grep
npx cypress run --env grep="C1211; C1212",grepFilterSpecs=true

## Local run

```commandline
npm install
npm start
```

## Docker local run

```commandline
docker build --tag=frontend:latest .
docker run -p8080:8080 frontend:latest
```

## Docker remote run (warning: may be outdated)

```commandline
docker run -p8080:8080 slawekradzyminski/frontend:latest
```

## Verification

Application should run on [http://localhost:8080](http://localhost:8080)