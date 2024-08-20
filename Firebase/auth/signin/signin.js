import { auth, signInWithEmailAndPassword, updatePassword } from "../utils.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInfo = {
    email: e.target[0].value,
    password: e.target[1].value,
  };

  const { email, password } = userInfo;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user Successfully Login");
      alert("user Successfully Login");
      // ...

      window.location.href = "../../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorCode, errorMessage);
    });
});


let forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const forgotUserInfo = {
    email: e.target[0].value,
    newPassword: e.target[1].value,
    confirmPassword: e.target[2].value,
  };
  console.log(e);

  if (forgotUserInfo.newPassword === forgotUserInfo.confirmPassword) {
    console.log("New Password Match");
    const user = auth.currentUser;

    updatePassword(user, forgotUserInfo.newPassword)
      .then(() => {
        // Update successful.

        console.log("New Password Updated");
        alert("New Password Updated");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        // An error ocurred
        // ...
      });
  } else {
    console.log("New Password not Match");
  }
});

let signupLocation = document.getElementById("signupLocation");
let backBtn = document.getElementById("backBtn");

signupLocation.addEventListener("click", () => {
  window.location.href = "../signup/signup.html";
});

backBtn.addEventListener("click", () => {
  window.location.href = "../../index.html";
});
