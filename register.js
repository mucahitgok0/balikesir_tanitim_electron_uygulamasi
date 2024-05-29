import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// web uygulamasının firebase yapılandırır
const firebaseConfig = {
  apiKey: "AIzaSyA6Fwfw3F3Y_u92Pz7TtIpXppupb9HOJM0",
  authDomain: "uyegirisi-6d8bb.firebaseapp.com",
  projectId: "uyegirisi-6d8bb",
  storageBucket: "uyegirisi-6d8bb.appspot.com",
  messagingSenderId: "22820827496",
  appId: "1:22820827496:web:d790a709dcd015626166dd"
};

// firebase'i başlatma kodu
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.add.addEventListener("click",function(){
  alert(5)
})