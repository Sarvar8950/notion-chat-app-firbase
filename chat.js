// Firbase configration
var firebaseConfig = {
    apiKey: "AIzaSyDYQxoFMDV5gKie-E8zg_lz6CCXHcYOvcM",
    authDomain: "notion-it-chat.firebaseapp.com",
    projectId: "notion-it-chat",
    storageBucket: "notion-it-chat.appspot.com",
    messagingSenderId: "432618414673",
    appId: "1:432618414673:web:0ec827619226dae0f0ce70"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Send Message function
function sendMessage() {
    var message = document.getElementById('message')
    var userName = JSON.parse(localStorage.getItem("user"))
    if (!message.value) {
        alert("Please Add Message")
    } else {
        firebase.firestore().collection("chat")
            .add({
                message: message.value,
                userName: userName.name,
                id: userName.id,
                time: Date.now()
            })
            .then((ref) => {
                getAllMessage()
            });
    }
}

// Fetch All message form database
function getAllMessage() {
    db.collection("chat").orderBy("time").onSnapshot(allMessage => {
        document.getElementById('chat').innerHTML = ""
        allMessage.forEach(item => {
            showAllMessage(item.data())
        })
    })
    document.getElementById('message').value = null
}

// Create message box to show in UI
function showAllMessage(item) {
    var showChat = document.getElementById('chat')
    var mainDiv = document.createElement('div')
    var userNameInLocalStorage = JSON.parse(localStorage.getItem("user")).name

    // Convert milliSeconds to time
    let seconds = Math.floor(item.time / 1000);
    let minutes = Math.floor(seconds / 60) + 30;
    let hours = Math.floor(minutes / 60) + 5;
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    // If someone does not send userName in Database it will show Anonymous
    if (item.userName == userNameInLocalStorage) {
        mainDiv.innerHTML = `
            <div class="myMessage messageBox">
                <p><small>${item.userName}</small></p>
                <p class="text">${item.message}</p>
                <p class="mytime"><small>${hours + ":" + minutes}</small></p>
            </div>
        `
    } else if (item.userName == undefined) {
        mainDiv.innerHTML = `
            <div class="userMessage messageBox">
                <p><small>Anonymous</small></p>
                <p class="text">${item.message}</p>
                <p class="othertime"><small>${hours + ":" + minutes}</small></p>
            </div>
        `
    } else {
        mainDiv.innerHTML = `
            <div class="userMessage messageBox">
                <p><small>${item.userName}</small></p>
                <p class="text">${item.message}</p>
                <p class="othertime"><small>${hours + ":" + minutes}</small></p>
            </div>
        `
    }
    showChat.append(mainDiv)

    // Auto Scroll to bottom of the chat
    showChat.scrollTop = showChat.scrollHeight;
}

window.onload = getAllMessage
