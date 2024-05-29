const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";//giriş yapma formunu gizler
    signUpForm.style.display="block";//kayıt olma formunu gösterir
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";//giriş yapma formunu gösterir
    signUpForm.style.display="none";//kayıt olma formunu gizler
})