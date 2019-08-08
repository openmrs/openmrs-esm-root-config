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

  it(`correctly routes the primary navigation`, () => {
    expect(
      appForRoute("@openmrs/esm-primary-navigation", "/openmrs/spa/login")
    ).toBe(false);
    expect(
      appForRoute(
        "@openmrs/esm-primary-navigation",
        "/openmrs/spa/patient/4f5sd67fds56f54/dashboard"
      )
    ).toBe(true);
    expect(
      appForRoute(
        "@openmrs/esm-primary-navigation",
        "/openmrs/spa/something-totally-random"
      )
    ).toBe(true);
  });

  it(`correctly routes the patient dashboard`, () => {
    expect(
      appForRoute("@openmrs/esm-patient-dashboard", "/openmrs/spa/login")
    ).toBe(false);
    expect(
      appForRoute(
        "@openmrs/esm-patient-dashboard",
        "/openmrs/spa/patient/7fs8d98f7s8f7sdt67f8s/dashboard"
      )
    ).toBe(true);
    expect(
      appForRoute(
        "@openmrs/esm-patient-dashboard",
        "/openmrs/spa/something-totally-random"
      )
    ).toBe(false);
  });
});

function appForRoute(appName, route) {
  return checkActivityFunctions({ pathname: route }).some(
    name => name === appName
  );
}
