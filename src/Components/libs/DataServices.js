import { db } from "./Firebase-configure";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const FDataCollectionRef=collection(db,"FireBaseData")
class FirebaseDataServices{
    addUser=(newUser)=>{
        return addDoc(FDataCollectionRef,newUser)

    };
    updateUser=(id,updatedUser)=>{
        const userDoc=doc(db,'FireBaseData',id);
        console.log(updatedUser);
        return updateDoc(userDoc,updatedUser);
    };
    deleteUser=(id)=>{
        const userDoc=doc(db,"FireBaseData",id)
        return deleteDoc(userDoc)
    };
    getAllUser=()=>{
        return getDocs(FDataCollectionRef)
    };
    getUser=(id)=>{
        const userDoc=doc(db,"FireBaseData",id)
        return getDocs(userDoc)
    };

}
export default new FirebaseDataServices();