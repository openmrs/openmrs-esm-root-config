import { registerAllCoreApplications } from "./openmrs-esm-root-config.lib";
import { start } from "single-spa";

export * from "./openmrs-esm-root-config.lib";

registerAllCoreApplications();
start();
