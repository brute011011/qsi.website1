import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

/* LOAD GALLERY */
const gallery = document.getElementById("gallery");
if (gallery) {
  getDocs(collection(db, "photos")).then(snap => {
    snap.forEach(doc => {
      const img = document.createElement("img");
      img.src = doc.data().url;
      gallery.appendChild(img);
    });
  });
}

/* LOGIN */
loginBtn?.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value);
});

/* AUTH STATE */
onAuthStateChanged(auth, user => {
  panel?.style.display = user ? "block" : "none";
});

/* UPLOAD */
uploadBtn?.addEventListener("click", async () => {
  const file = document.getElementById("file").files[0];
  if (!file) return;

  const storageRef = ref(storage, "photos/" + Date.now() + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "photos"), { url });
  alert("Yüklendi");
});

/* LOGOUT */
logoutBtn?.addEventListener("click", () => signOut(auth));