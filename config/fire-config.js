import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCabtH0VxgxHF_WIZCrhS2i2XkyEVm6e_E",
  authDomain: "qrpontovicio.firebaseapp.com",
  projectId: "qrpontovicio",
  storageBucket: "qrpontovicio.appspot.com",
  messagingSenderId: "595336016576",
  appId: "1:595336016576:web:72d85cb4f3b844211f7325"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;