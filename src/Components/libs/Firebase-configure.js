import {initializeApp} from 'firebase/app'
import {
    getFirestore
} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCeKayrXLsW1LPjItgyBqFYKUoysNQcksw",
    authDomain: "crudapp-42eff.firebaseapp.com",
    projectId: "crudapp-42eff",
    storageBucket: "crudapp-42eff.appspot.com",
    messagingSenderId: "271229419647",
    appId: "1:271229419647:web:fd56673204940e27ffbf4a"
  };

//    connect database

const app=initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app;
export const db=getFirestore(app);
