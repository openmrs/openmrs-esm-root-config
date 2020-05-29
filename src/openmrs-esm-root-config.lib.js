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

export { getPublicPath } from "./public-path/public-path-helpers";
export { getModuleUrl } from "./public-path/public-path-helpers";
