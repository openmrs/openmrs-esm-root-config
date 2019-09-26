const configs = []
const schemas = {}

import(/* webpackIgnore: true */ "@openmrs/config")
  .then(res => {
    console.log(res);
    configs.push(res);
  })
  .catch(err => {
    console.log("No importable config provided. No sweat.");
  })

export function loadConfig(moduleName) {
  console.log("Taking schema for " + moduleName);
  schemas[moduleName] = "foo";
  console.log("Current configs: " + JSON.stringify(configs))
}

export function provide(config) {
  console.log("Received config")
  console.log(config)
  configs.push(config)
  console.log("Current schemata: " + JSON.stringify(schemas))
}
