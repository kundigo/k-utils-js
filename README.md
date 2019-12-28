# Developpement

This package has been initiated using https://github.com/team-innovation/vue-sfc-rollup

# Description

Utils components for kundigo projects

# Install the package

This package belongs to Kundigo and it's supposed to remain private and to be used in kundigo's projects. Add this package to `package.json` file

```js
"k-utils-js": "git+https://kundigo-ci:2381bb4546b420a55d62592192be6e65c201bf06@github.com/kundigo/k-utils-js.git#master",
```

Then import the components you need in your Rails App.

```js
import { Api, Utils} from 'k-utils-js'
```

# Updating

Updating the package:

* Make the updates to the components
* When adding new components, update `README.md` and `src/lib-components/index.js`
* Bump the version in `package.json`
* run the command `npm run build`
* commit and push changes

Get the updates in your Rails app

* Run :  `yarn upgrade k-form-js`
* Note : You can use another branch in you app, by replacing `master` with the name of the branch in the rails apps `package.json` 

# Testing

None :( 