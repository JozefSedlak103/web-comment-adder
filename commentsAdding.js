//The core Firebase JS SDK is always required and must be listed first
//include('https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js');
//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries
//include('https://www.gstatic.com/firebasejs/8.1.1/firebase-firestore.js');
//include('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');

//import * as firebase from "firebase/app";
//import 'firebase/firestore';


let selectedString = '';
let inputString = '';
//const firebase = window.firebase;
    //require("firebase/firestore");
//const firebase = require("firebase/app");
// Required for side-effects

/*
let firebaseConfig = {
    apiKey: "AIzaSyA8S_DJAlXAZfvKDvm5g1fC53lvxJ1Rq1Y",
    authDomain: "hackathon-2020-1a7e6.firebaseapp.com",
    databaseURL: "https://hackathon-2020-1a7e6.firebaseio.com",
    projectId: "hackathon-2020-1a7e6",
    storageBucket: "hackathon-2020-1a7e6.appspot.com",
    messagingSenderId: "619297380907",
    appId: "1:619297380907:web:f80b8b6e8bd2b9722c286e",
    measurementId: "G-FY877D66KG"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
//firebase.analytics();


 */

//ziska vybraty text
function getSelectedText() {
    let selectedText = '';
    // preto je tu viacero moznosti, lebo je mozne ze niektore z toho nemusia fungovat na niektorych strankach
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    else if (document.getSelection) {
        selectedText = document.getSelection().toString();
    }
    else if (document.selection) {
        selectedText =
            document.selection.createRange().text.toString();
    } else return '';
    return selectedText;
}
/*
function addCorrection() {
    if (selectedString!=='' && inputString!== '') {
        db.collection("selected").add({
            selected: selectedString,
            changeTo: inputString
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else {
        alert('There is no selected text or input field is empty.');
    }
}

 */

function addCorrection(inputText) {
    alert('added input string: ' + inputText);
}


function createTextField(fromTop) {
    let textDiv = document.createElement("div");
    let cancelButton = document.createElement("button");
    let continueButton = document.createElement("button");
    let inputTextField = document.createElement("INPUT");
    inputTextField.setAttribute("type", "text");
    inputTextField.value = "";
    textDiv.style.width = "10%";
    textDiv.style.right = "10%";
    textDiv.style.border = "solid black 1px";
    textDiv.style.height = "60px";
    textDiv.style.position = "absolute";
    textDiv.style.backgroundColor = "yellow";
    textDiv.style.top = fromTop + "px";

    continueButton.innerHTML = "Pokračuj";
    continueButton.onclick = function() {
        let inputText = inputTextField.value;
        addCorrection(inputText);
    };
    cancelButton.innerHTML = "Zruš";
    cancelButton.onclick = function() {
        textDiv.removeChild(cancelButton);
        textDiv.removeChild(inputTextField);
        textDiv.parentElement.removeChild(textDiv);
    };
    textDiv.appendChild(inputTextField);
    textDiv.appendChild(cancelButton);
    textDiv.appendChild(continueButton);
    document.body.appendChild(textDiv);
}

//vytvori znacku obsahujucu neviditelny znak Byte order mark(ufeff)
let markSelection = (function() {
    let markerTextChar = "\ufeff";

    let markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
    let selectionEl;

    return function(win) {
        let doc = win.document;
        let sel, range;
        if (win.getSelection) {
            sel = win.getSelection();
            range = sel.getRangeAt(0).cloneRange();
            range.collapse(false);

            markerEl = doc.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( doc.createTextNode(markerTextChar) );
            range.insertNode(markerEl);
        }

        if (markerEl) {
            if (!selectionEl) {
                selectionEl = doc.createElement("button");
                selectionEl.style.border = "solid black 1px";
                selectionEl.style.borderRadius = "4px";
                selectionEl.style.justifyContent = "center";
                selectionEl.style.alignContent = "center";
                selectionEl.style.backgroundColor = "white";
                selectionEl.innerHTML = "+";
                selectionEl.style.fontSize = "120%";
                selectionEl.style.position = "absolute";
                doc.body.appendChild(selectionEl);
            }

            let obj = markerEl;
            let top = 0;
            do {
                top += obj.offsetTop;
            } while (obj === obj.offsetParent);
            selectionEl.style.right = "8%";
            selectionEl.style.top = top + "px";
            selectionEl.onclick = function() {createTextField(top)};
        }
    };
})();


//pri zmene vybrateho textu vezme text a vytvori tlacidlo
document.onselectionchange = () => {
    let selectedText = getSelectedText();
    if (selectedText!=='') {
        markSelection(window);
    }
};

