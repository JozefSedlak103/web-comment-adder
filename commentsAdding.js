function getSelectedText() {
    let selectedText = '';
    // preto je tu viacero moznosti, lebo je mozne ze niektore z toho nemusia fungovat na niektorych strankach
    // window.getSelection
    //var activeEl = document.activeElement;
    //var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
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
    // Toto zmenit na vytvorenie toho maleho pluska, je to len pre otestovanie funkcionality
    //document.testform.selectedtext.value = selectedText;
    return selectedText;
}

var markSelection = (function() {
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    return function(win) {
        win = win || window;
        var doc = win.document;
        var sel, range;
        // Branch for IE <= 8
        if (doc.selection && doc.selection.createRange) {
            // Clone the TextRange and collapse
            range = doc.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = doc.getElementById(markerId);
        } else if (win.getSelection) {
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
                selectionEl.style.position = "absolute";
                /*
                selectionEl = doc.createElement("div");
                selectionEl.style.border = "solid darkblue 1px";
                selectionEl.style.backgroundColor = "lightgoldenrodyellow";
                selectionEl.innerHTML = "&lt;- selection";
                selectionEl.style.position = "absolute";

                 */

                doc.body.appendChild(selectionEl);
            }

            // Find markerEl position http://www.quirksmode.org/js/findpos.html
            var obj = markerEl;
            var left = 0, top = 0;
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while (obj = obj.offsetParent);

            // Move the button into place.
            // Substitute your jQuery stuff in here
            selectionEl.style.left = left + "px";
            selectionEl.style.top = top + "px";

            markerEl.parentNode.removeChild(markerEl);
        }
    };
})();

/*
function cursorFromTop(e) {
    //let posx;
    let posy;
    if (e.pageX || e.pageY) {
        //posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        //posx = e.clientX + document.body.scrollLeft
        //    + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    alert("This is displayed");
    document.posform.posy.value = "y = " + posy;
    getPosY(posy);
}

function getPosY(posy) {
    return posy;
}
*/
//interval na opakovane zistovanie ci je vybraty text (1000ms je vybratych len ako test, moze to byt rychlejsie aj pomalsie)

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

