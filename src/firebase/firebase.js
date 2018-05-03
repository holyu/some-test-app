// This import loads the firebase namespace along with all its type information.
import * as firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// const expenses = [
//   {
//     description: "Gum",
//     amount: 195,
//     note: "",
//     createdAt: 0
//   },
//   {
//     description: "Rent",
//     amount: 109500,
//     note: "Rent for April",
//     createdAt: 47747474774
//   },
//   {
//     description: "Credit Card",
//     amount: 4500,
//     note: "",
//     createdAt: -57457457457
//   }
// ];

// // database
// //   .ref("expenses")
// //   .once("value")
// //   .then(snapshot => {
// //     const expenses = [];
// //     snapshot.forEach(childSnapshot => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });
// // database.ref("expenses").on(
// //   "value",
// //   snapshot => {
// //     const expenses = [];
// //     snapshot.forEach(childSnapshot => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   },
// //   e => {
// //     console.log("Error Fetching data", e);
// //   }
// // );
// //child_removed
// database.ref("expenses").on('child_removed', snapshot => {
//  console.log(snapshot.key, snapshot.val())
// });

// //child_removed
// database.ref("expenses").on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val())
//  });

// //child_added
// database.ref("expenses").on('child_added', snapshot => {
//   console.log(snapshot.key, snapshot.val())
//  });

// //database.ref('expenses').push(expenses[0]);
// // database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);
// // setTimeout(() => {
// // database
// //   .ref()
// //   .set({
// //     name: "Piotr Górski",
// //     age: 38,
// //     stressLevel: 6,
// //     job: { title: "Software developer", company: "google" },
// //     location: {
// //       city: "Katowice",
// //       Country: "Poland"
// //     }
// //   })
// //   .then(() => {
// //     console.log("Data is saved");
// //   })
// //   .catch(e => {
// //     console.log("This failed", e);
// //   });
// // }, 2000);

// // database
// //   .ref("location/city")
// //   .once("value")
// //   .then(function(snapshot) {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch(e => {
// //     console.log("Error Fetching data", e);
// //   });

// // database.ref().on("value", snapshot => {
// //   console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
// // }, e => {
// //   console.log("Error Fetching data", e);
// // });

// // const onValueChange = database.ref().on("value", snapshot => {
// //   console.log(snapshot.val());
// // }, e => {
// //   console.log("Error Fetching data", e);
// // });

// // setTimeout(() => {
// //   database.ref().off("value", onValueChange);
// // }, 3500);
// // database.ref().set('This is my data.')

// // database.ref("age").set(38);
// // database.ref("location/city").set("Bielsko Biała");

// // database
// //   .ref("attributes")
// //   .set({ height: 180, weight: 70 })
// //   .then(() => {
// //     console.log("Secund set call work");
// //   })
// //   .catch(e => {
// //     console.log("Secund call failed", e);
// //   });

// // database
// // .ref("isSingle")
// // .set(null)
// // .then(() => {
// //   console.log("Remove by set succeeded.");
// // })
// // .catch(e => {
// //   console.log("Remove by set failed", e);
// // });
// // database.ref("isSingle")
// // .remove()
// //   .then(function() {
// //     console.log("Remove succeeded.")
// //   })
// //   .catch(function(error) {
// //     console.log("Remove failed: " + error.message)
// //   });

// // database.ref().update({
// //   name: "Mike",
// //   age: 22,
// //   job: "Software developer",
// //   isSingle: null,
// //   "attributes/height": 195
// // });

// // setTimeout(() => {
// // database.ref().update({
// //   stressLevel: 9,
// //   "job/company": "Amazon",
// //   "location/city": "Kraków"
// // }).then(() => {
// //     console.log("Update succeeded.");
// //   })
// //   .catch(e => {
// //     console.log("Update failed", e);
// //   });
// // }, 5000);
