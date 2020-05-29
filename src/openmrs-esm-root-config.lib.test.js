import { routePrefix, routeRegex } from "./openmrs-esm-root-config.lib";

describe(`openmrs-esm-root-config.lib`, () => {
  beforeAll(() => {
    window.getOpenmrsSpaBase = () => "/openmrs/spa/";
  });

  it("routePrefix matches on the right location", () => {
    const result = routePrefix("home", {
      pathname: "/openmrs/spa/home"
    });
    expect(result).toBe(true);
  });

  it("routePrefix does not match on the wrong location", () => {
    const result = routePrefix("home", {
      pathname: "/openmrs/spa/foo"
    });
    expect(result).toBe(false);
  });

  it("routePrefix does match on the right prefix", () => {
    const result = routePrefix("home", {
      pathname: "/openmrs/spa/home/foo"
    });
    expect(result).toBe(true);
  });

  it("routeRegex matches on the right location", () => {
    const result = routeRegex(/^home\//, {
      pathname: "/openmrs/spa/home/foo"
    });
    expect(result).toBe(true);
  });

  it("routeRegex strips out the root path", () => {
    const result = routeRegex(/spa/, {
      pathname: "/openmrs/spa/foo"
    });
    expect(result).toBe(false);
  });

  it("routeRegex takes it literally and does not match", () => {
    const result = routeRegex(/foo-bar\/.*/, {
      pathname: "/openmrs/spa/foo-bar"
    });
    expect(result).toBe(false);
  });

  it("routeRegex takes it literally and matches", () => {
    const result = routeRegex(/foo-bar\/.*/, {
      pathname: "/openmrs/spa/foo-bar/qxz"
    });
    expect(result).toBe(true);
  });
});
