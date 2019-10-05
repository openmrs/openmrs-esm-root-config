const configs = []
const schemas = {}

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
