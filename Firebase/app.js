import {auth, onAuthStateChanged, signOut,db, doc, getDoc, storage, ref, getDownloadURL } from "./auth/utils.js";

let userIcon = document.getElementById('userIcon')
let loginIcon = document.getElementById('loginIcon')
let logoutBtn = document.getElementById('logoutBtn')
let userdropdown = document.getElementById('user-dropdown')
let userPhoto = document.getElementById('userPhoto')
let username = document.getElementById('username')
let useremail = document.getElementById('useremail')

onAuthStateChanged( auth, async (user) => {
    if (user) {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      if (currentUser !== null) {
        const ImageRef = await ref(storage, `users/${uid}`);
        const profilePicUrl = await getDownloadURL(ImageRef);
        userPhoto.src = profilePicUrl;
        const docRef = await doc(db, "users", `${uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          // const userInfoGet = docSnap
          console.log(docSnap)
          // username.innerText = userInfoGet.userName;
          // useremail.innerText = userInfoGet.email;
        } else {
          console.log("No such document!");
        }
        
      console.log('User available in Firebase Authentication')
    loginIcon.classList.remove('hidden')
    loginIcon.classList.add('flex')
    userIcon.classList.remove('flex')
    userIcon.classList.add('hidden')
    }
      // ...
    } else {   
        console.log('User not available in Firebase Authentication')
      // User is signed out
      // ...
    }
  });

document.addEventListener('DOMContentLoaded', ()=>{
  userIcon.addEventListener('click', ()=>{
    window.location.href = './auth/signin/signin.html'
  })

})

  logoutBtn.addEventListener('click', ()=>{
    console.log('Logout Button is working')


    signOut(auth).then(() => {
        // Sign-out successful.
        userdropdown.style.display = 'none';
        console.log('User successfully signout')
        loginIcon.classList.add('hidden')
        loginIcon.classList.remove('flex')
        userIcon.classList.remove('hidden')
        userIcon.classList.add('flex')
      }).catch((error) => {
        // An error happened.
      });
  })