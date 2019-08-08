import { checkActivityFunctions } from "single-spa";
import { registerAllCoreApplications } from "./openmrs-esm-root-config.lib";

describe(`openmrs-esm-root-config.lib`, () => {
  beforeAll(() => {
    window.getOpenmrsSpaBase = () => "/openmrs/spa/";
  });

  beforeAll(registerAllCoreApplications);

  it(`makes devtools active when the openmrs:devtools localStorage is set`, () => {
    expect(appForRoute("@openmrs/esm-devtools", "/")).toBe(false);
    localStorage.setItem("openmrs:devtools", "/");
    expect(appForRoute("@openmrs/esm-devtools", "/")).toBe(true);
    localStorage.removeItem("openmrs:esm-devtools", "/");
  });

  it(`has correct routes for login`, () => {
    expect(appForRoute("@openmrs/esm-login", "/openmrs/spa/login")).toBe(true);
    expect(appForRoute("@openmrs/esm-login", "/openmrs/spa")).toBe(false);
    expect(
      appForRoute("@openmrs/esm-login", "/openmrs/spa/something-else")
    ).toBe(false);
  });
});

function appForRoute(appName, route) {
  return checkActivityFunctions({ pathname: route }).some(
    name => name === appName
  );
}
