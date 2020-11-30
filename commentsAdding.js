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


/*document.onmouseup = document.onkeyup = document.onselectionchange = function() {
    document.testform.selectedtext.value = getSelectedText();
};

 */

//interval na opakovane zistovanie ci je vybraty text (1000ms je vybratych len ako test, moze to byt rychlejsie aj pomalsie)
window.setInterval(function () {
    //alert("Test");
    if (getSelectedText()!=='') {
        //document.addEventListener('mousemove', cursorFromTop);
        let text = getSelectedText();
        document.testform.selectedtext.value = text;
        document.onmouseup = cursorFromTop;
        //alert("1");
        getSelectedText();
        clearInterval();
    }
},1000);
