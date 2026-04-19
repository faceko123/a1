import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, collection, getDocs,
  deleteDoc, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "quanli-3990e.firebaseapp.com",
  projectId: "quanli-3990e",
};

const ADMIN_EMAIL = "admin@gmail.com"; // đổi email admin

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// CHECK ADMIN
onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Không có quyền!");
    location.href = "login.html";
  } else {
    loadAll();
  }
});

// READ ALL
async function loadAll() {
  const snap = await getDocs(collection(db, "orders"));
  const list = document.getElementById("list");
  list.innerHTML = "";

  snap.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    const li = document.createElement("li");
    li.innerHTML = `
      ${data.email} | ${data.product} - ${data.quantity}
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

  loadAll();
};

// DELETE
window.remove = async function (id) {
  await deleteDoc(doc(db, "orders", id));
  loadAll();
};

window.logout = () => {
  signOut(auth).then(() => location.href = "login.html");
};
