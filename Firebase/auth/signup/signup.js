import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../utils.js";

let signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let password = e.target[1].value;
  let confirmPassword = e.target[2].value;

  if (password === confirmPassword) {
    console.log("Password Match");

    const userInfo = {
      email: e.target[0].value,
      password: e.target[1].value,
      userName: e.target[3].value,
      userNumber: e.target[4].value,
    };
    const { email, password, userName, userNumber } = userInfo;
    const profilePic = e.target[5].files[0];

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const uid = user.uid;
        console.log("User successfully signup into Firebase");

        const ImageRef = ref(storage, `users/${uid}`);
        await uploadBytes(ImageRef, profilePic);
        console.log("Profile picture uploaded successfully");

        const profilePicUrl = await getDownloadURL(ImageRef);
        userInfo.profilePic = profilePicUrl;

        const userInfoRef = doc(db, "users", uid);
        await setDoc(userInfoRef, userInfo)
          .then(() => {
            console.log("User data updated into Firestore");
            window.location.href = "../../index.html";
          })
          .catch((error) => {
            console.log("Error into uploading image into storage", error);
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorCode, errorMessage);
        // ..
      });
  } else {
    console.log("Password Incorrect");
    alert("Password Incorrect");
  }
});



let profilePic = document.getElementById("profilePic");

profilePic.addEventListener("change", () => {
  let displayProfilePic = document.getElementById("displayProfilePic");

  if (profilePic.files && profilePic.files[0]) {
    let reader = new FileReader();

    reader.onload = (e) => {
      displayProfilePic.src = e.target.result;
    };
    reader.readAsDataURL(profilePic.files[0]);
  }
});


let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "../../index.html";
});