import { registerApplication } from "single-spa";

const coreApplications = {
  "@openmrs/devtools": () => localStorage.getItem("openmrs:devtools")
};

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
      registeredApps.poush(appName);
    }
  });

  return registeredApps;
}
