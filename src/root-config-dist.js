// For angular
import "zone.js";

import { registerAllCoreApplications } from "./root-config-lib";
import { start } from "single-spa";

export * from "./root-config-lib";

registerAllCoreApplications();
start();

// Workaround / waiting for https://github.com/systemjs/systemjs/issues/1939
const moduleMap = {};

export function getPublicPath(name) {
  const path = moduleMap[name];
  if (path) {
    return path.slice(0, path.lastIndexOf("/") + 1);
  } else {
    throw Error("Cannot find public path for " + name);
  }
}

const originalResolve = window.System.resolve;

window.System.resolve = function(name) {
  return originalResolve.apply(this, arguments).then(function(resolved) {
    moduleMap[name] = resolved;
    return resolved;
  });
};

// We don't have a styleguide, so here's the very rudimentary version of one
const css = `
html {
  background-color: #F4F5F8;
}
`;

const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);
