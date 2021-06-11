'use strict';

var gStartPos;
var gIsDragging = false;
var gClickedObject;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

//Update the controller to handle Canvas as well 

function onInit() {
    renderGrid();
}

// Mouse / Touch handling 

function addListeners(elCanvas) {
    addMouseListeners(elCanvas);
    addTouchListeners(elCanvas); 
    // window.addEventListener('resize', () => {  //TODO check this out
    //     resizeCanvas()
    //     clearCanvas()
    // })
}

function addMouseListeners(elCanvas) {
    elCanvas.addEventListener('mousemove', onMove)
    elCanvas.addEventListener('mousedown', onDown)
    elCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(elCanvas) {
    elCanvas.addEventListener('touchmove', onMove)
    elCanvas.addEventListener('touchstart', onDown)
    elCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gClickedObject = getClickedObject(pos)
    if (!gClickedObject) return
    gIsDragging = true;
    gStartPos = pos;
    hightlightObject(gClickedObject);
    document.body.style.cursor = 'grabbing';
}


function onMove(ev) {
    if (!gIsDragging) return;
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveObject(gClickedObject, dx, dy);
    gStartPos = pos
}

function onUp() {
    gIsDragging = false;
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

//Canvas and Gallery

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

function onMoveLine(diff){
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
    document.querySelector('.gallery-main-container').classList.add('hide');
    cleanAllNavActive();
    setSelectedMemeToEditor(imgUrl);
    document.querySelector('.editor-main-container').classList.remove('hide');

    addListeners(getCanvas());
}

function onDownloadMeme() {
    renderMeme(false);
    setTimeout(downloadMeme, 500);
    // downloadMeme();
}

function onGallery(){
    document.querySelector('.editor-main-container').classList.add('hide');
    document.querySelector('[name="text"]').value ='';
    cleanAllNavActive();
    document.querySelector('header nav .gallery').classList.add('active')
    document.querySelector('.gallery-main-container').classList.remove('hide');
}

//TODO do I need it?
function removeHighlight(){
    console.log('inside remove highlight')
    renderMeme(false);
}

function cleanAllNavActive(){
    var els = document.querySelectorAll('header nav li');
    els.forEach(el => {
        el.classList.remove('active');
    })
}

//Menu and modal
function toggleMenu() {
    console.log('clicked')
    var mainMenu = document.querySelector('nav');
    // mainMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
}

function openModal(){
    var elModal = document.querySelector('.modal');

    elModal.classList.remove('hide');
}

function closeModal(){
    var elModal = document.querySelector('.modal');
    elModal.classList.add('hide');
    elModal.innerHTML='';
}