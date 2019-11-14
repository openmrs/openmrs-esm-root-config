import "./set-public-path";
import { registerAllCoreApplications } from "./openmrs-esm-root-config.lib";
import { start } from "single-spa";
import { translationsPromise } from "./i18next/init-i18next";

export * from "./openmrs-esm-root-config.lib";

registerAllCoreApplications();

translationsPromise.then(start).catch(err => {
  console.error(`Failed to initialize i18next translations`);
  console.error(err);
});
