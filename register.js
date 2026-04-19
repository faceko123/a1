import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv2N-Z-52nxkTAKsJ3iJTt_j2f3jqY4xI",
  authDomain: "quanli-3990e.firebaseapp.com",
  projectId: "quanli-3990e",
  storageBucket: "quanli-3990e.appspot.com",
  messagingSenderId: "15839288744",
  appId: "1:15839288744:web:8841eb672050790badd19d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = function () {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!email || !pass) {
    alert("Vui lòng nhập đầy đủ!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Đăng ký thành công!");
      window.location.href = "login.html";
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
};
