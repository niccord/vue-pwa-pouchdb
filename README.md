# vue-pwa-pouchdb

> Figuring out how vue-pwa can work with pouchdb

## Use `vue-cli + pwa` as a template combined with `pouchdb` to build a PWA with complete offline support? Do they work together? And how??

## Let's find out!!

    $> vue-cli pwa
    $> npm install pouchdb

    Set a global database name, if you want.

    In the `created` hook of the list component, populate the list via `db.allDocs`, manupulate the objects directly via vue, and call `allDocs` if you want to refresh data from db.

    Remember to update `rev` when update a document.

    The state management is simple in this case, so I don't need redux or vuex or another state manager: I simply pass the function(s) to the child component.

Nothing else!

Is that possible??

![magic gif](./magic.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
