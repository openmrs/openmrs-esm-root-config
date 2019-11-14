import { registerApplication } from "single-spa";
import { coreApplications } from "./single-spa-applications/core-applications";

export {
  translationsPromise as promiseBeforeStart
} from "./i18next/init-i18next";

export function routePrefix(prefix, location) {
  return location.pathname.startsWith(window.getOpenmrsSpaBase() + prefix);
}

export function routeRegex(regex, location) {
  const result = regex.test(
    location.pathname.replace(window.getOpenmrsSpaBase(), "")
  );
  return result;
}

export function registerAllCoreApplications() {
  Object.keys(coreApplications).forEach(coreAppName => {
    registerApplication(
      coreAppName,
      () => System.import(coreAppName),
      coreApplications[coreAppName]
    );
  });
}

export function registerCoreApplicationsExcept(names) {
  if (!Array.isArray(names) || names.some(name => typeof name !== "string")) {
    throw Error(
      `registerCoreApplicationsExcept must be called with an array of string application names`
    );
  }

  const registeredApps = [];

  Object.keys(coreApplications).forEach(appName => {
    if (!names.includes(appName)) {
      registerApplication(
        appName,
        () => System.import(appName),
        coreApplications[appName]
      );
      registeredApps.push(appName);
    }
  });

  return registeredApps;
}

export { getPublicPath } from "./public-path/public-path-helpers";
export { getModuleUrl } from "./public-path/public-path-helpers";
