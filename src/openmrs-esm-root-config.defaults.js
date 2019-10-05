import "./set-public-path";
import { registerAllCoreApplications } from "./openmrs-esm-root-config.lib";
import { start } from "single-spa";
import { foo } from "./test.json";

export * from "./openmrs-esm-root-config.lib";

registerAllCoreApplications();
start();
