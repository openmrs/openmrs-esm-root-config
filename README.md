# openmrs-esm-root-config

A javascript module for setting up and configuring your SPA. See [openmrs-rfc-frontend](https://github.com/openmrs/openmrs-rfc-frontend)
for what this project is and how it works.

## Local development

```sh
npm install
npm start <port-number> # e.g., npm start 8080
```

Then go to a deployed environment and run the following in the browser console:

```js
importMapOverrides.addOverride(
  "@openmrs/root-config",
  "http://localhost:8080/root-config-dist.js"
);
```
