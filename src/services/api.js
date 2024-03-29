import * as firebase from 'firebase';

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
const storageRef = firebase.storage().ref('/meal-images');

export const fetchMeals = () => {
  return database.ref('meals').once('value').then((snap) => {
    const meals = snap.val();

    const mealsWithSort = Object.keys(meals).map(mealId => {
      return {id: mealId, ...meals[mealId]}
    });

    return mealsWithSort.sort((a, b) => b.createdAt - a.createdAt);
  })
}

export const uploadImage = (file) => {
  return storageRef.child(`${Date.now()}`).put(file).then((snap) => {
    return snap.ref.getDownloadURL().then((downloadURL) => {
      return downloadURL;
    });
  });
}

export const createNewMeal = (meal) => {
  if (meal.id) {
    return database.ref(`meals/${meal.id}`).set(meal);
  } else {
    return database.ref('meals').push(meal);
  }
}

export const removeMeal = (mealId) => {
  return database.ref(`meals/${mealId}`).remove();
}

export const fetchTags = () => {
  return database.ref('tags').once('value').then((snap) => {
    const tags = snap.val();

    return tags;
  })
}
