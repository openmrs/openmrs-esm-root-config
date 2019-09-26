import "./set-public-path";
import { registerAllCoreApplications } from "./openmrs-esm-root-config.lib";
import { start } from "single-spa";
import { foo } from "./test.json";

console.log(foo);

export * from "./openmrs-esm-root-config.lib";
export * from "./config-lib/config-lib";

registerAllCoreApplications();
start();
