import { routePrefix, routeRegex } from "../openmrs-esm-root-config.lib";

export const coreApplications = {
  "@openmrs/esm-login": shouldShowLogin,
  "@openmrs/esm-devtools": shouldShowDevtools,
  "@openmrs/esm-primary-navigation": shouldShowPrimaryNavigation,
  "@openmrs/esm-patient-dashboard": shouldShowPatientDashboard,
  "@openmrs/esm-home": shouldShowHome
};

// To learn more about top level routing in single-spa, go to https://single-spa.js.org/docs/configuration.html#activity-function

function shouldShowLogin(location) {
  return routePrefix("login", location);
}

function shouldShowDevtools() {
  return localStorage.getItem("openmrs:devtools");
}

function shouldShowPrimaryNavigation(location) {
  return !shouldShowLogin(location);
}

function shouldShowPatientDashboard(location) {
  return routeRegex(/^patient\/.+\/dashboard/, location);
}

function shouldShowHome(location) {
  return routePrefix("home", location);
}
