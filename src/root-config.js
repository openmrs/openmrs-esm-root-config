import { registerAllCoreApplications } from "./root-config-lib";
import { start } from "single-spa";

export * from "./root-config-lib";

registerAllCoreApplications();
start();
