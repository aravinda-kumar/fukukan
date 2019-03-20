// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  shell: {
    debug: false,
    networkDelay: 2000
  },
  firebase: {
    apiKey: 'AIzaSyBCpFWRU2E3JRD_Sq98zKGdXRMAVAmVQqw',
    authDomain: 'fukukan-2e985.firebaseapp.com',
    databaseURL: 'https://fukukan-2e985.firebaseio.com',
    projectId: 'fukukan-2e985',
    storageBucket: 'fukukan-2e985.appspot.com',
    messagingSenderId: '935559232608'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
