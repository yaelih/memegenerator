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