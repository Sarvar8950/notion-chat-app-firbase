// firbase configration
var firebaseConfig = {
    apiKey: "AIzaSyDYQxoFMDV5gKie-E8zg_lz6CCXHcYOvcM",
    authDomain: "notion-it-chat.firebaseapp.com",
    projectId: "notion-it-chat",
    storageBucket: "notion-it-chat.appspot.com",
    messagingSenderId: "432618414673",
    appId: "1:432618414673:web:0ec827619226dae0f0ce70"
};

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

// Login function
function login() {
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value

    firebase.firestore().collection("users")
        .add({
            Firstname: firstName,
            Lastname: lastName,
        })
        .then((ref) => {
            let name = firstName + " " + lastName
            localStorage.setItem("user", JSON.stringify({
                name: name,
                id: ref.id
            }))
            window.location.href = "./chat.html"
        });
}
