let url = window.location.href;
let selectedString = '';
let prevString = '';
let browserZoomLevel;
let selectionEl;

//inicializacia back4app databazy
function back4appUrl(){
    return "https://parseapi.back4app.com/classes/comments";
}

function back4appHeaders(){
    return {
        "X-Parse-Application-Id": "HpKsmV9VmYdOuDSVG0ANqbeTFafmEavoZnNphu3f",
        "X-Parse-REST-API-Key": "VNMEisJ4ePSx8V1126oVqvHe1rS9Kq1aqfAAivY6"
    };
}



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

//zapis do databazy
function addCorrection(inputText, name) {
    const newComment = {
        selected : prevString,
        inputText : inputText,
        URL : url,
        name: name,
        //tu este mozne pridat dalsie stlpce
    };
    //alert('change: "' + prevString + '" to: "' + inputText + '"');
    const reqHeaders=back4appHeaders();
    reqHeaders["Content-Type"]="application/json";

    const init={
        headers: reqHeaders,
        method: 'POST',
        body: JSON.stringify(newComment)
    };

    fetch(back4appUrl(),init)
        .then(response =>{      //fetch promise fullfilled (operation completed successfully)
            if(response.ok){    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                return response.json(); //we return a new promise with  the response data in JSON to be processed
            }else{ //if we get server error
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
            }
        })
        .then(responseJSON => { //here we process the returned response data in JSON ...
            window.alert('Komentár úspešne uložený');
        })
        .catch (error => { ////here we process all the failed promises
            window.alert(`Nastala chyba: ${error}`);
        });
}


function createTextField(fromTop) {
    if(document.getElementById("hackaton")==null) {
        let textDiv = document.createElement("div");
        let cancelButton = document.createElement("button");
        let continueButton = document.createElement("button");
        let inputTextField = document.createElement("textarea");
        let nameInput = document.createElement("textarea");
        textDiv.id = "hackaton"
        nameInput.value = "";
        nameInput.rows = 1;
        nameInput.style.width = "100%";
        nameInput.placeholder = "Meno Priezvisko";
        //inputTextField.setAttribute("type", "text");
        inputTextField.value = "";
        inputTextField.rows = 3;
        inputTextField.style.width = "100%";
        inputTextField.placeholder = "Váš komentár";
        textDiv.style.width = "15%";
        textDiv.style.right = "10%";
        textDiv.style.border = "solid black 1px";
        textDiv.style.height = "150px";
        textDiv.style.backgroundColor = "white";
        textDiv.style.borderRadius = "5px";
        textDiv.style.position = "absolute";
        //textDiv.style.backgroundColor = "yellow";
        textDiv.style.top = fromTop + "px";
        continueButton.innerHTML = "Pokračuj";
        continueButton.style.border = "solid black 1px";
        continueButton.style.borderRadius = "5px";
        continueButton.style.backgroundColor = "lightgreen";
        continueButton.onclick = function () {
            let inputText = inputTextField.value;
            let nameText = nameInput.value;
            addCorrection(inputText, nameText);
        };
        cancelButton.innerHTML = "Zruš";
        cancelButton.style.marginRight = "5px";
        cancelButton.style.borderRadius = "5px";
        cancelButton.style.border = "solid black 1px";
        cancelButton.style.backgroundColor = "lightcoral";
        cancelButton.onclick = function () {
            textDiv.removeChild(nameInput);
            textDiv.removeChild(cancelButton);
            textDiv.removeChild(inputTextField);
            textDiv.parentElement.removeChild(textDiv);
        };
        textDiv.appendChild(nameInput);
        textDiv.appendChild(inputTextField);
        textDiv.appendChild(cancelButton);
        textDiv.appendChild(continueButton);
        document.body.appendChild(textDiv);
    }
}

//vytvori znacku obsahujucu neviditelny znak Byte order mark(ufeff)
let markSelection = (function() {
    let markerTextChar = "\ufeff";

    let markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

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
                selectionEl.style.border = "white 1px";
                //selectionEl.style.borderRadius = "4px";
                selectionEl.style.justifyContent = "center";
                selectionEl.style.alignContent = "center";
                //selectionEl.style.backgroundColor = "white";
                selectionEl.style.background = "rgba(0,0,0,0)";
                selectionEl.style.outline = "none";
                //https://cdn2.iconfinder.com/data/icons/everything-but-the-kitchen-sink-2/100/common-06-512.png
                selectionEl.innerHTML = "<img src='https://cdn2.iconfinder.com/data/icons/everything-but-the-kitchen-sink-2/100/common-06-512.png' width=\"35px\" height=\"35px\">";
                selectionEl.style.fontSize = "120%";
                selectionEl.style.position = "absolute";
                selectionEl.style.margin = 0;
                selectionEl.style.padding = 0;
                doc.body.appendChild(selectionEl);
            }

            let obj = markerEl;
            let top = 0;
            do {
                top += obj.offsetTop;
            } while (obj === obj.offsetParent);
	//vypocet right marginu na zaklade zoomu prehliadaca
			browserZoomLevel = window.devicePixelRatio * 100 * 1.08 - 8;
            selectionEl.style.right = (32/browserZoomLevel*25) + "vw";
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

//pri zmene zoomu sa presunie tlacidlo na pridanie komentara
$(window).resize(function() { 
	browserZoomLevel = window.devicePixelRatio * 100 * 1.08 - 8;
	selectionEl.style.right = (32/browserZoomLevel*25) + "vw";	
});

