// See https://github.com/systemjs/systemjs/issues/1939 for what
// we are doing here and why.

const moduleMap = {};

export function getModuleUrl(name) {
  const url = moduleMap[name];
  if (url) {
    return url;
  } else {
    throw Error("Cannot find url for module " + name);
  }
}

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
