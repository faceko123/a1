import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, collection, addDoc, getDocs, query, where,
  deleteDoc, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ⚠️ CONFIG PHẢI GIỐNG login.js
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
const db = getFirestore(app);

let currentUser = null;

// 👉 Ẩn trang trước khi check login (tránh nhảy lung tung)
document.body.style.display = "none";

// ================= CHECK LOGIN =================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
    document.body.style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.body.style.display = "block";
    currentUser = user;
    loadOrders();
  } else {
    setTimeout(() => {
      if (!auth.currentUser) {
        location.href = "login.html";
      }
    }, 500);
  }
});
  }
});

// ================= CREATE =================
window.order = async function () {
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;

  if (!product || !quantity) {
    alert("Nhập đầy đủ!");
    return;
  }

  await addDoc(collection(db, "orders"), {
    uid: currentUser.uid,
    email: currentUser.email,
    product: product,
    quantity: quantity
  });

  document.getElementById("product").value = "";
  document.getElementById("quantity").value = "";

  loadOrders();
};

// ================= READ =================
async function loadOrders() {
  const q = query(collection(db, "orders"), where("uid", "==", currentUser.uid));
  const snap = await getDocs(q);

  const list = document.getElementById("list");
  list.innerHTML = "";

  snap.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    const li = document.createElement("li");
    li.innerHTML = `
      ${data.product} - ${data.quantity}
      <button onclick="edit('${id}', '${data.product}', ${data.quantity})">Sửa</button>
      <button onclick="remove('${id}')">Xóa</button>
    `;
    list.appendChild(li);
  });
}

// ================= UPDATE =================
window.edit = async function (id, oldProduct, oldQuantity) {
  const product = prompt("Sản phẩm:", oldProduct);
  const quantity = prompt("Số lượng:", oldQuantity);

  if (!product || !quantity) return;

  await updateDoc(doc(db, "orders", id), {
    product: product,
    quantity: quantity
  });

  loadOrders();
};

// ================= DELETE =================
window.remove = async function (id) {
  if (!confirm("Xóa đơn này?")) return;

  await deleteDoc(doc(db, "orders", id));
  loadOrders();
};

// ================= LOGOUT =================
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
