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

const originalResolve = System.resolve;

System.resolve = function(name) {
  const result = originalResolve.apply(this, arguments);
  if (result instanceof Promise) {
    return result.then(function(resolved) {
      moduleMap[name] = resolved;
      return resolved;
    });
  } else {
    moduleMap[name] = result;
    return result;
  }
};
