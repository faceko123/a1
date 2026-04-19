<!-- Firebase -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  // DÁN config của bạn vào đây
  const firebaseConfig = {
  apiKey: "AIzaSyAv2N-Z-52nxkTAKsJ3iJTt_j2f3jqY4xI",
  authDomain: "quanli-3990e.firebaseapp.com",
  projectId: "quanli-3990e",
  storageBucket: "quanli-3990e.firebasestorage.app",
  messagingSenderId: "15839288744",
  appId: "1:15839288744:web:8841eb672050790badd19d",
  measurementId: "G-15QZWTZ36L"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // ĐĂNG KÝ
  window.register = function() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  console.log(email, pass); // check input

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("OK");
    })
    .catch(err => {
      console.log(err);   // in lỗi ra
      alert(err.message); // hiện lỗi
    });
}

  // ĐĂNG NHẬP
  window.login = function() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        alert("Đăng nhập thành công!");
        window.location.href = "home.html";
      })
      .catch((error) => {
        alert("Sai tài khoản hoặc mật khẩu!");
      });
  }
</script>
