import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
       
    apiKey: "AIzaSyBHg-OpeU8Ed-E-L2qCltDHHlH_HJ_m6TQ",
    authDomain: "multivendor-bc088.firebaseapp.com",
    projectId: "multivendor-bc088",
    storageBucket: "multivendor-bc088.appspot.com",
    messagingSenderId: "252160347430",
    appId: "1:252160347430:web:1bf53e73e7b7b745ed05e7",
    measurementId: "G-5G9NXW07QF"
              
})


const db = firebaseApp.firestore()

const auth = firebase.auth()

const storage = firebaseApp.storage();

export {auth,db,storage}