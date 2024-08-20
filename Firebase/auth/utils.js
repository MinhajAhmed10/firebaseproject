


  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword, 
            onAuthStateChanged, 
            updatePassword, 
            signOut 
            } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore,
            doc,
            setDoc,
            getDoc,
            } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { getStorage,
            ref,
            uploadBytes,
            getDownloadURL,

            } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
     apiKey: "AIzaSyBOTcvsPZxV1LbhkKUbqT15KVxmEqu7EOw",
     authDomain: "my-first-project-186c1.firebaseapp.com",
     projectId: "my-first-project-186c1",
     storageBucket: "my-first-project-186c1.appspot.com",
     messagingSenderId: "766980340096",
     appId: "1:766980340096:web:37f2f4dc9cf6fca298e965",
    measurementId: "G-2250DLKFSV"
  };

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);




  export {auth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        onAuthStateChanged, updatePassword, signOut,
        db,
        doc,
        setDoc,
        getDoc,
        storage,
        ref,
        uploadBytes,
        getDownloadURL, 
    }