import { routePrefix } from "../openmrs-esm-root-config.lib";

export const coreApplications = {
  "@openmrs/esm-login": shouldShowLogin,
  "@openmrs/esm-devtools": shouldShowDevtools
};

// To learn more about top level routing in single-spa, go to https://single-spa.js.org/docs/configuration.html#activity-function

function shouldShowLogin(location) {
  return routePrefix("login", location);
}

function shouldShowDevtools() {
  return localStorage.getItem("openmrs:devtools");
}
