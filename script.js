import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "quanli-3990e.firebaseapp.com",
  projectId: "quanli-3990e",
  storageBucket: "quanli-3990e.appspot.com",
  messagingSenderId: "15839288744",
  appId: "1:15839288744:web:8841eb672050790badd19d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = function () {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Đăng ký thành công!");
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });
};

window.login = function () {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Đăng nhập thành công!");
      window.location.href = "home.html";
    })
    .catch(() => {
      alert("Sai tài khoản hoặc mật khẩu!");
    });
};
