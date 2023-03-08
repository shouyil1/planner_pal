// //https://fireship.io/lessons/google-calendar-api-with-firebase/

// //Option A - Authenticate with gapi, then login to Firebase manually with the resulting ID token (JSON web token). 
// //This requires us to include an extra JS script, but it will manage access tokens automatically.

// // Option B - Login with with the Firebase GoogleAuthProvider and add additional scopes. This will 
// // grant us permission, but we will need to manage access and refresh tokens manually.

// //we are using Option B, meaning we need to manage and refresh tokens manually
// //  may need to consider using option A (there's sample code on how to do it in the link above)
// //  or at least using this workaround of 

// var gcalScripts = document.createElement('script');  
// gcalScripts.setAttribute('src','https://apis.google.com/js/api.js');
// document.head.appendChild(gcalScripts);


// //ng generate service auth

// declare var gapi: any;


// //don't demo
// const loadGCal = async () => {
//     const events = await gapi.client.calendar.events.list({
//       calendarId: 'primary',
//       timeMin: new Date().toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//     //   maxResults: 10,
//       orderBy: 'startTime'
//     });

//     console.log(events);
//     this.calendarItems = events.result.items;

//     const result = axios({
//                     method: 'put',
//                     url: 'http://35.184.237.74:8080/updateCalTask',
//                     data: {
//                         "calendar": calId,
//                         "startTime": startTime,
//                         "endTime": endTime,
//                         "taskName": taskName,
//                         "description": description,
//                         "taskType": "CALENDAR"
//                     }
//                   });
//     console.log(result);
       
// }

// //add an event to the google calendar, to be called after any api call to /createCalTask in frontend logic
// const insertEventInGCal = async (startTime, endTime, calendarName, eventName, desc) => {
//     const insert = await gapi.client.calendar.events.insert({
//       calendarId: calendarName,
//       start: {
//         dateTime: startTime,
//         timeZone: 'America/Los_Angeles'
//       }, 
//       end: {
//         dateTime: endTime,
//         timeZone: 'America/Los_Angeles'
//       }, 
//       summary: eventName,
//       description: desc
//     })
  
//     //await this.getCalendar();
//   }

//   //add an event to the google calendar, to be called after any api call to /deleteCalTask in frontend logic
//   //if this doesn't work to well, we don't have to demo it 
//   const deleteEventFromGCal = async (calendarName, eventName) =>  {
//     const remove = await gapi.client.calendar.events.delete(calendarName, eventName);
  
//     //await this.getCalendar();
//   }
  
  

//   // Initialize the Google API client with desired scopes
//   //ng g service auth
// function initClient(token) {
//     gapi.load('client', () => {
//       console.log('loaded client')

//       // It's OK to expose these credentials, they are client safe.
//       gapi.client.init({
//         apiKey: "AIzaSyChDrz3PLkTjXR6imb8tow2mWUnz9CsgCs",
//         clientId: "371347553043-1rl8rlpruktjmggbog8u0cjlscm1c01n.apps.googleusercontent.com",
//         discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest" ,
//         scope: "https://www.googleapis.com/auth/calendar" //..plus other scopes you need to add
//       })

//       gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
//       // gapi.setToken(token);
//       gapilogin();
//     });
// }
 
// //ALTERNATIVE SIGN IN - authenticate with gapi and login to firebase manually
// const gapilogin = async () => {
//     const googleAuth = gapi.auth2.getAuthInstance()
//     const googleUser = await googleAuth.signIn();
  
//     const token = googleUser.getAuthResponse().id_token;
  
//     console.log(googleUser)
  
//     // const credential = auth.GoogleAuthProvider.credential(token);
  
//     // await signInAndRetrieveDataWithCredential(credential);
  
  
//     // Alternative approach, use the Firebase login with scopes and make RESTful API calls
//     // const provider = new auth.GoogleAuthProvider()
//     // provider.addScope('https://www.googleapis.com/auth/calendar');
//     // this.afAuth.signInWithPopup(provider)
    
//   }
  
//   // function altlogout() {
//   //   this.afAuth.signOut();
//   // }

//   // ... helper function, (if needed)
//   const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();


//   export {initClient};