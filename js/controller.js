'use strict';

function onTextUpdate(value){
    createAndUpdateLine(value);
}

function onAdd(){
    increaseLineIdx();
    document.querySelector('[name="text"').value ='';
}

function onUpdateFontSize(diff){
    updateFontSize(diff);
}

function onAlignFont(value) {
    updateFontAlignment(value);
}

function onMove(diff){
    updatePositionY(diff);
}

function onSwitchLine(){
    switchLine();
}

function onDelete(){
    deleteLine();
}

function onSetStrokeColor(value) {
    updateStrokeColor(value);
}

function onSetFillColor(value) {
    updateFillColor(value);
}

function renderGrid(){
    var imgs = getImgs();
    var strHTMLs = imgs.map(img => {
        return `<img src=${img} onclick="onSelection('${img}')" />`;
    })
    console.log(strHTMLs)
    document.querySelector('.gallery-grid').innerHTML = strHTMLs.join('');
}

function onSelection(imgUrl){
    document.querySelector('.temp-div-gallery').classList.add('hide');
    setSelectedMemeToEditor(imgUrl);
    document.querySelector('.temp-div-editor').classList.remove('hide');
}