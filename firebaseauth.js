import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyAgJclCSzKAkzRnMR_QVT8XR_RCtI-3h0M",
    authDomain: "login-form-f1dae.firebaseapp.com",
    projectId: "login-form-f1dae",
    storageBucket: "login-form-f1dae.appspot.com",
    messagingSenderId: "921877846448",
    appId: "1:921877846448:web:87c066d887665ba7965e75"
};

// Firebase'i başlatır
const app = initializeApp(firebaseConfig);

// Kullanıcıya mesaj gösterme fonksiyonu
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// İkonları gösterme fonksiyonu
function showIcons() {
    const authButtons = document.getElementById('auth-buttons');
    authButtons.innerHTML = `
        <a href="profile.html" class="btn btn-primary">
            <ion-icon name="person-circle-outline"></ion-icon> Profile
        </a>
        <a href="settings.html" class="btn btn-primary">
            <ion-icon name="settings-outline"></ion-icon> Settings
        </a>
    `;
}

// Kayıt ol butonuna tıklama olayı
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    // Kullanıcıyı e-posta ve şifre ile kaydetme
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'loginn.html';
                    showIcons();
                })
                .catch((error) => {
                    console.error("error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            }
            else {
                showMessage('unable to create User', 'signUpMessage');
            }
        });
});

// Giriş yap butonuna tıklama olayı
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    // Kullanıcıyı e-posta ve şifre ile giriş yapma
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});
