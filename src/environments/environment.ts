// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBeaInYCzh4JQxOOYR2jUguFtjEImFm6gM",
    authDomain: "clips-8c06a.firebaseapp.com",
    projectId: "clips-8c06a",
    storageBucket: "clips-8c06a.firebasestorage.app",
    // messagingSenderId: "823772545952",
    appId: "1:823772545952:web:86f6b8fb8b8c7d89979ac5"
  },
  cloudinary: {
    cloudName: 'clipz', // Your Cloudinary cloud name
    uploadPreset: 'upload_video', // Your Cloudinary upload preset,
    api_key: '711443898722693',
    api_secret: '7BR1Bqcz5o6nWSjmU2PfH-OnhF4'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
