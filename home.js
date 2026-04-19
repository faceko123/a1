import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, collection, addDoc, getDocs, query, where,
  deleteDoc, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "quanli-3990e.firebaseapp.com",
  projectId: "quanli-3990e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser;

// CHECK LOGIN
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
  } else {
    currentUser = user;
    loadOrders();
  }
});

// CREATE
window.order = async function () {
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;

  await addDoc(collection(db, "orders"), {
    uid: currentUser.uid,
    email: currentUser.email,
    product,
    quantity
  });

  loadOrders();
};

// READ
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

// UPDATE
window.edit = async function (id, oldProduct, oldQuantity) {
  const product = prompt("Sản phẩm:", oldProduct);
  const quantity = prompt("Số lượng:", oldQuantity);

  await updateDoc(doc(db, "orders", id), {
    product,
    quantity
  });

  loadOrders();
};

// DELETE
window.remove = async function (id) {
  await deleteDoc(doc(db, "orders", id));
  loadOrders();
};

// LOGOUT
window.logout = () => {
  signOut(auth).then(() => location.href = "login.html");
};
