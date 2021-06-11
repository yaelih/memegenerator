'use strict';
var gKeywords = { 'happy': 12, 'comic': 1, 'smile': 5, 'crazy': 5 }

var gImgs = [
    { id: 1, url: 'img/memes/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/memes/2.jpg', keywords: [] },
    { id: 3, url: 'img/memes/3.jpg', keywords: [] },
    { id: 4, url: 'img/memes/4.jpg', keywords: [] },
    { id: 5, url: 'img/memes/5.jpg', keywords: [] },
    { id: 6, url: 'img/memes/6.jpg', keywords: [] },
    { id: 7, url: 'img/memes/7.jpg', keywords: [] },
    { id: 8, url: 'img/memes/8.jpg', keywords: [] },
    { id: 9, url: 'img/memes/9.jpg', keywords: [] },
    { id: 10, url: 'img/memes/10.jpg', keywords: [] },
    { id: 11, url: 'img/memes/11.jpg', keywords: [] },
    { id: 12, url: 'img/memes/12.jpg', keywords: [] },
    { id: 13, url: 'img/memes/13.jpg', keywords: [] },
    { id: 14, url: 'img/memes/14.jpg', keywords: [] },
    { id: 15, url: 'img/memes/15.jpg', keywords: [] },
    { id: 16, url: 'img/memes/16.jpg', keywords: [] },
    { id: 17, url: 'img/memes/17.jpg', keywords: [] },
    { id: 18, url: 'img/memes/18.jpg', keywords: [] },
];

var gElCanvas;
var gCtx;

var gMeme;
var gFillColor;
var gStrokeColor;


gElCanvas = document.querySelector('#meme-canvas');
gCtx = gElCanvas.getContext('2d');

function getCanvas(){
    return gElCanvas;
}

function renderMeme(highlight = true) {
    // console.log(gMeme.selectedLineIdx);
    var img = new Image()
    img.src = gImgs[gMeme.selectedImgId - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines)
        if (highlight) highlightLine();
    }
}

function drawText(lines) {
    gCtx.lineWidth = 1;
    lines.forEach(line => {
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fillColor;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = 'start';
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        // console.log(gCtx.measureText(line.txt))
    })
}

function createAndUpdateLine(value) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) createLine(value);
    gMeme.lines[gMeme.selectedLineIdx].txt = value;
    updateFontAlignment(gMeme.lines[gMeme.selectedLineIdx].align);
}

function increaseLineIdx() {  //TODO check if empty?
    gMeme.selectedLineIdx = gMeme.lines.length;
    createLine(' ');
    document.querySelector('[name="text"').focus();
    renderMeme();
}

function updateFontSize(diff) {
    if (!gMeme.lines[0]) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
    renderMeme();
}

function updateFontAlignment(value) {
    if (!gMeme.lines[0]) return
    var line = gMeme.lines[gMeme.selectedLineIdx];
    var x;
    var xPadding = 10;
    switch (value) {
        case 'center':
            x = gElCanvas.width / 2 - gCtx.measureText(line.txt).width / 2;
            break;
        case 'left':
            x = 0 + xPadding;
            break;
        case 'right':
            x = gElCanvas.width - gCtx.measureText(line.txt).width - xPadding;
            break;
    }
    // console.log(gCtx.measureText(line.txt))
    gMeme.lines[gMeme.selectedLineIdx].align = value;
    line.pos.x = x;
    renderMeme();
}

function updateFontFamily(value) {
    if (!gMeme.lines[0]) return
    // console.log()
    gMeme.lines[gMeme.selectedLineIdx].font = value;
    renderMeme();
}

function updatePositionY(diff) {
    if (!gMeme.lines[0]) return
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff;
    renderMeme();
}

function switchLine() {
    if (!gMeme.lines[0]) return
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    highlightLine();
    renderMeme();
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function deleteLine() {
    if (!gMeme.lines[0]) return null
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    renderMeme();
    var currentInputText = gMeme.lines.length > 0 ? gMeme.lines[gMeme.selectedLineIdx].txt : '';
    return currentInputText;
}

function updateStrokeColor(value) {
    if (!gMeme.lines[0]) return gStrokeColor = value;
    gStrokeColor = value;
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = value;
    renderMeme();
}

function updateFillColor(value) {
    if (!gMeme.lines[0]) return gFillColor = value;
    gFillColor = value;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = value;
    renderMeme();
}

function createLine(text) {
    var size = 40;
    var pos;
    var yPadding = 10;
    var x = gElCanvas.width / 2 - gCtx.measureText(text).width / 2;
    if (gMeme.lines.length === 0) {
        pos = { x, y: size + yPadding }
    }
    else if (gMeme.lines.length === 1) {
        pos = { x, y: gElCanvas.height - yPadding }

    }
    else {
        pos = { x, y: gElCanvas.height / 2 + size / 2 }
    }
    var line = {
        txt: text,
        size: size,
        font: 'Impact',
        align: 'center',
        fillColor: !gFillColor ? 'white' : gFillColor,
        strokeColor: !gStrokeColor ? 'black' : gStrokeColor,
        pos
    }
    gCtx.align = 'start';
    gMeme.lines.push(line);
}

function getImgs() {
    return gImgs.map(img => img.url)
}

function setSelectedMemeToEditor(imgUrl) {
    var imgIdx = getImgIdx(imgUrl);
    gMeme = {
        selectedImgId: imgIdx,
        selectedLineIdx: 0, //change to -1
        lines: []
    }
    renderMeme();
}

function getImgIdx(imgUrl) {
    var img = gImgs.find(img => {
        return img.url === imgUrl
    })
    return img.id;
}

function highlightLine() {
    if (gMeme.lines.length > 0) {
        var selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        var height = selectedLine.size;
        var width = gCtx.measureText(selectedLine.txt).width;
        var x = selectedLine.pos.x;
        var y = selectedLine.pos.y - height;

        gCtx.save();
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'gray';
        gCtx.beginPath()
        gCtx.strokeRect(x - 10, y, width + 15, height + 10)
        gCtx.restore();
    }
}

function downloadMeme() {
    const data = gElCanvas.toDataURL('image/jpeg')
    // const data = gElCanvas.toDataURL('image/png')
    var elModal = document.querySelector('.modal');
    elModal.innerHTML = `<a href="${data}" class="" onclick="closeModal()" download="my-meme">Click to download</a>`;
    console.log(elModal.innerHTML)
    openModal();
    
    // elModal.classList.remove('hide');
    // elLink.href = data
    // elLink.download = 'my-meme.png';
}



//Drag handling
function getClickedObject(clickedPos) {
    var lineObg = gMeme.lines.find( line => { 
        var width = gCtx.measureText(line.txt).width
        var height = line.size;
        var { x, y } = clickedPos;
        // console.log('pos', clickedPos, 'x', x, 'y', y)
        // console.log(line)
        // console.log('width', width, 'height', height)
        // console.log('line', line)
        // console.log(`x: ${x} >= ${line.pos.x} && ${x} <= ${line.pos.x + width}`)
        // console.log((x >= line.pos.x && x <= line.pos.x + width))
        // console.log((y >= line.pos.y - height && y <= line.pos.y))
        return ((x >= line.pos.x && x <= line.pos.x + width) && (y >= line.pos.y - height && y <= line.pos.y)) 
    })
    return lineObg;
}

function hightlightObject(clickedObject){
    var idx = gMeme.lines.findIndex(line => line === clickedObject)
    gMeme.selectedLineIdx = idx;
    renderMeme();
}

function moveObject(clickedObject, dx, dy){
    clickedObject.pos.x += dx;
    clickedObject.pos.y += dy;
    renderMeme();
}

// function getObjectById(id){
//     return gMeme.lines.find(line => line.id === id);
// }


function setObjectDrag(isDrag) {
    gCircle.isDrag = isDrag
}
function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}