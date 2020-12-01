let url = window.location.href;
let selectedString = '';
let prevString = '';

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

//zatial nahrade pre zapis do databazy
function addCorrection(inputText) {
    alert('change: "' + prevString + '" to: "' + inputText + '"');
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
   // if (selectedString!== '') {
    //    var selectedT = selectedString;
   // }
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
    selectedString = getSelectedText();
    if (selectedString!=='') {
        prevString = selectedString;
        markSelection(window);
    }
};

