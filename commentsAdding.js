//ziska vybraty text
function getSelectedText() {
    let selectedText = '';
    // preto je tu viacero moznosti, lebo je mozne ze niektore z toho nemusia fungovat na niektorych strankach
    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection().toString();
    }
    // document.selection
    else if (document.selection) {
        selectedText =
            document.selection.createRange().text.toString();
    } else return '';
    return selectedText;
}

function createTextField(fromTop) {
    let textDiv = document.createElement("div");
    let cancelButton = document.createElement("button");
    let inputTextField = document.createElement("INPUT");
    inputTextField.setAttribute("type", "text");
    textDiv.style.width = "10%";
    textDiv.style.right = "10%";
    textDiv.style.border = "solid black 1px";
    textDiv.style.height = "60px";
    textDiv.style.position = "absolute";
    textDiv.style.backgroundColor = "yellow";
    textDiv.style.top = fromTop + "px";
    cancelButton.style.left = "30px";
    cancelButton.style.top = "50px";
    cancelButton.innerHTML = "Zruš";
    cancelButton.onclick = function() {
        textDiv.removeChild(cancelButton);
        textDiv.removeChild(inputTextField);
        textDiv.parentElement.removeChild(textDiv);
    }
    textDiv.appendChild(inputTextField);
    textDiv.appendChild(cancelButton);
    document.body.appendChild(textDiv);

    //document.onselectionchange = function () {
    //    textDiv.parentNode.removeChild(textDiv);
    //}
}

var markSelection = (function() {
    var markerTextChar = "\ufeff";
    //var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    return function(win) {
        win = win || window;
        var doc = win.document;
        var sel, range;
        // Branch for IE <= 8
        //if (doc.selection && doc.selection.createRange) {
            // Clone the TextRange and collapse
            //range = doc.selection.createRange().duplicate();
            //range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            //range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            //markerEl = doc.getElementById(markerId);
       //} else
        if (win.getSelection) {
            sel = win.getSelection();
            range = sel.getRangeAt(0).cloneRange();
            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = doc.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( doc.createTextNode(markerTextChar) );
            range.insertNode(markerEl);
        }

        if (markerEl) {
            // Lazily create element to be placed next to the selection
            if (!selectionEl) {
                selectionEl = doc.createElement("button");
                selectionEl.style.border = "solid black 1px";
                selectionEl.style.backgroundColor = "white";
                selectionEl.innerHTML = "+";
                selectionEl.style.fontSize = "120%";
                selectionEl.style.right = "100px";
                selectionEl.style.position = "absolute";
                selectionEl.onclick = function() {createTextField(top)};

                doc.body.appendChild(selectionEl);
            }

            let obj = markerEl;
            let top = 0;
            do {
                top += obj.offsetTop;
            } while (obj === obj.offsetParent);
            selectionEl.style.right = "8%";
            selectionEl.style.top = top + "px";

            markerEl.parentNode.removeChild(markerEl);
        }
    };
})();


//pri zmene vybrateho textu vezme text a vytvori tlacidlo
document.onselectionchange = () => {
    let text = getSelectedText();
    //document.testform.selectedtext.value = text;
    if (text!=='') {
        markSelection(window);
    }
};

//interval na opakovane zistovanie ci je vybraty text (1000ms je vybratych len ako test, moze to byt rychlejsie aj pomalsie)
/*
window.setInterval(function () {
    //alert("Test");
    if (getSelectedText()!=='') {
        let text = getSelectedText();
        document.testform.selectedtext.value = text;
        //document.onmouseup = cursorFromTop;
        //alert("1");
        markSelection(window)
        getSelectedText();
        clearInterval(this);
    }
},2500);

 */

