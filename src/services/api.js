import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAZZRRG6hMD4Xrg7Q5k6CBKOk3UEEZ37BQ",
  authDomain: "mar-app-de502.firebaseapp.com",
  databaseURL: "https://mar-app-de502.firebaseio.com",
  projectId: "mar-app-de502",
  storageBucket: "mar-app-de502.appspot.com",
  messagingSenderId: "78469279791",
  appId: "1:78469279791:web:353b5ccc6a3fdb2a9116da",
  measurementId: "G-4Z8ZBV0T6F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const storageRef = firebase.storage().ref();

export const fetchMeals = () => {
  return database.ref('meals').once('value').then((snap) => {
    const meals = snap.val();

    return Object.keys(meals).map(mealId => {
      return {id: mealId, ...meals[mealId]}
    });
  })
}
