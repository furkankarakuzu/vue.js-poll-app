import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyCwXcuCDH1lsYfYoKC_9hklTRVEYprBj-s",
    authDomain: "poll-app-40ba5.firebaseapp.com",
    databaseURL: "https://poll-app-40ba5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "poll-app-40ba5",
    storageBucket: "poll-app-40ba5.appspot.com",
    messagingSenderId: "1079516106163",
    appId: "1:1079516106163:web:2db9e84b6e19d1411a0fc6"
}

let fire = firebase.initializeApp(config)

export default fire