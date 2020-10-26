
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCmNnzlfK3xK9OGcUHKaJf_PhREyUXcBN4",
    authDomain: "adentuproyecto.firebaseapp.com",
    databaseURL: "https://adentuproyecto.firebaseio.com",
    projectId: "adentuproyecto",
    storageBucket: "adentuproyecto.appspot.com",
    messagingSenderId: "397156987231",
    appId: "1:397156987231:web:9eb279aff2fb8d055106ea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase }