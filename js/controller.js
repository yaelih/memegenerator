'use strict';

function onTextUpdate(value){
    createAndUpdateLine(value);
}

function onAdd(){
    document.querySelector('[name="text"]').value ='';
    increaseLineIdx();
}

function onUpdateFontSize(diff){
    updateFontSize(diff);
}

function onAlignFont(value) {
    updateFontAlignment(value);
}

function onUpdateFont(value){
    updateFontFamily(value);
}

function onMove(diff){
    updatePositionY(diff);
}

function onSwitchLine(){
    var text  = switchLine() || '';
    document.querySelector('[name="text"]').value = text;
}

function onDelete(){
    var text = deleteLine() || ''
    document.querySelector('[name="text"]').value = text;
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
    document.querySelector('.gallery-grid').innerHTML = strHTMLs.join('');
}

function onSelection(imgUrl){
    document.querySelector('.temp-div-gallery').classList.add('hide');
    setSelectedMemeToEditor(imgUrl);
    document.querySelector('.temp-div-editor').classList.remove('hide');
}

function onDownloadMeme(elLink) {
    downloadMeme(elLink);
}

function onGallery(){
    document.querySelector('.temp-div-editor').classList.add('hide');
    document.querySelector('[name="text"]').value ='';
    document.querySelector('.temp-div-gallery').classList.remove('hide');
}

function removeHighlight(){
    console.log('inside remove highlight')
    renderMeme(false);
}