# openmrs-esm-root-config

[![Build Status](https://travis-ci.org/openmrs/openmrs-esm-root-config.svg?branch=master)](https://travis-ci.org/openmrs/openmrs-esm-root-config)

## What is this?

openmrs-esm-root-config is an 
[in-browser javascript module](https://github.com/openmrs/openmrs-rfc-frontend/blob/master/text/0002-modules.md) 
that serves as the
[single-spa root config](https://single-spa.js.org/docs/configuration.html)
for OpenMRS. It is the very first javascript module that is loaded, and controls 
which other modules are loaded and active for any particular URL.

## How do I use it?

openmrs-esm-root-config is available on npm to be downloaded.

### Usage (no customization)

To accept all OpenMRS defaults for modules, do the following:

1. `npm install --save @openmrs/esm-root-config`.
  Alternatively, go to get the files from
  [jsdelivr](https://www.jsdelivr.com/package/npm/@openmrs/esm-root-config?path=dist).
1. Make the file `node_modules/@openmrs/esm-root-config/dist/openmrs-esm-root-config.defaults.js`
  available in your import map with the name `@openmrs/esm-root-config`.

### Usage (with customization)

To customize which modules and single-spa applications are used, do the following:

1. Create a new repo that will be your custom root config. For example, ampath-esm-root-config.
1. `npm install --save @openmrs/esm-root-config`. Alternatively, go to get the files from
  [jsdelivr](https://www.jsdelivr.com/package/npm/@openmrs/esm-root-config?path=dist).
1. Make your repo's bundle available in your import map, with the name `@openmrs/esm-root-config`.
1. In your repo's entry file, add the following code:
    ```js
    import { registerApplication, start } from 'single-spa';
    import { registerAllCoreApplications } from '@openmrs/esm-root-config';

    // Get all the core applications
    registerAllCoreApplications();
    // or: registerAllCoreApplicationsExcept(['@openmrs/esm-login', '@openmrs/esm-devtools'])

    // Add your own application
    registerApplication(
      'my-custom-app',
      () => System.import('my-custom-app'),
      location => location.pathname.startsWith('/custom')
    )

    // start everything up
    start();
    ```
    
## API

The following functions are exported from @openmrs/esm-root-config.

### registerAllCoreApplications()

registerAllCoreApplications is a function that calls
[singleSpa.register()](https://single-spa.js.org/docs/api.html#registerapplication)
for each of the OpenMRS core applications.

#### Arguments
None

#### Return value
None (undefined)

#### Example

```js
import { registerAllCoreApplications } from '@openmrs/esm-root-config';

registerAllCoreApplications();
```

### registerAllCoreApplicationsExcept(applicationNames)

`registerAllCoreApplicationsExcept` allows you to specify an array of application 
names that you do not want to be registered from the set of all OpenMRS core applications.

#### Arguments

1. `applicationNames` (required): an array of string names that must correspond with the
OpenMRS core applications that you don't want registered.

#### Return value
None (undefined)

#### Example

```js
import { registerAllCoreApplicationsExcept } from '@openmrs/esm-root-config';

registerAllCoreApplicationsExcept(['@openmrs/esm-login', '@openmrs/esm-primary-navigation']);
```

### routePrefix(prefix, location)

`routePrefix` is a utility function that helps you implement
[single-spa activity functions](https://single-spa.js.org/docs/configuration.html#activity-function).
The word "route" refers to the browser's url and the word "prefix" refers to a prefix in the
[pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname).

#### Arguments

1. `prefix` (required): A string that starts with a `/` character. Any time the browser's
  url's pathname starts with that url, your application will be active.
2. `location` (required): A Location object. You can just pass in the location given to
  your activity function.

#### Return value

A boolean that is `true` when the location matches the prefix, and `false` otherwise.

#### Example

See [code examples](https://github.com/openmrs/openmrs-esm-root-config/blob/master/src/single-spa-applications/core-applications.js).

```js
import { registerApplication } from 'single-spa';
import { routePrefix } from '@openmrs/esm-root-config';

registerApplication('my-custom-app', () => System.import('my-custom-app'), isCustomAppActive);

function isCustomAppActive(location) {
  return routePrefix('/custom', location);
}
```

### routeRegex(regex, location)

`routeRegex` is a utility function that helps you implement
[single-spa activity functions](https://single-spa.js.org/docs/configuration.html#activity-function).
The word "route" refers to the browser's url and the word "prefix" refers to a prefix in the
[pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname).

#### Arguments

1. `regex` (required). A regular expression that will be matched against the location's pathname.
1. `location` (required). A Location object. You can just pass in the location given to your activity function.

#### Return value

A boolean that is `true` when the location matches the prefix, and `false` otherwise.

#### Example

```js
import { registerApplication } from 'single-spa';
import { routeRegex } from '@openmrs-esm-root-config';

registerApplication('my-custom-app', () => System.import('my-custom-app'), isCustomAppActive);

function isCustomAppActive(location) {
  return routeRegex(/^patient\/.+\/dashboard/, location);
}
```
