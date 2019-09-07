/* This file exists because rxjs does not publish a bundle
 * to npm that is compatible with import maps. To use rxjs,
 * you must do `import 'rxjs/operators'`. However, import maps interpret
 * the `/` character as a directory and expect there to be an entirely
 * separate file for the rxjs operators. The rxjs lib itself puts the operators
 * into the same umd file as the `rxjs` core stuff, not into a separate file.
 * This file makes it so that `import 'rxjs/operators'` works without requiring
 * it to be in a separate file.
 */

import * as rxjs from "rxjs";

const originalResolve = System.resolve;

System.resolve = function(name) {
  if (name === "rxjs/operators") {
    return "/rxjs-operators.js";
  } else {
    return originalResolve.apply(this, arguments);
  }
};

System.register("/rxjs-operators.js", [], _export => {
  _export(rxjs.operators);
  return {};
});
