'use strict';
//Create from imgs keywords
var gKeywords = { 'happy': 12, 'funny puk': 1, 'smile': 5, 'crazy': 3 }

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

// var gCurrLineIdx = 0;
var gMeme;
var gFillColor;
var gStrokeColor;


gElCanvas = document.querySelector('#meme-canvas');
gCtx = gElCanvas.getContext('2d');

function renderMeme() {
    // console.log(gMeme.selectedLineIdx);
    var img = new Image()
    img.src = gImgs[gMeme.selectedImgId - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines)
        highlightLine();
    }
}

function drawText(lines) {
    gCtx.lineWidth = 1;
    lines.forEach(line => {
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fillColor;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        // console.log(gCtx.measureText(line.txt))
    })
}

function createAndUpdateLine(value) {
    console.log(!gMeme.lines[gMeme.selectedLineIdx])

    // if (gMeme.lines[gMeme.selectedLineIdx] === undefined) createLine(value);
    if (!gMeme.lines[gMeme.selectedLineIdx]) createLine(value);
    gMeme.lines[gMeme.selectedLineIdx].txt = value;
    renderMeme();
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
    switch (value) {
        case 'center':
            x = gElCanvas.width / 2;
            break;
        case 'left':
            x = 10;
            break;
        case 'right':
            x = gElCanvas.width - gCtx.measureText(line.txt).width / 2 + 20;
            break;
    }
    // console.log(gCtx.measureText(line.txt))
    line.pos.x = x;
    gMeme.lines[gMeme.selectedLineIdx].align = value;
    renderMeme();
}

function updateFontFamily(value){
    if (!gMeme.lines[0]) return
    console.log()
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
    console.log('\before',gMeme.selectedLineIdx)
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    console.log('after',gMeme.selectedLineIdx)
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    console.log('after',gMeme.selectedLineIdx)
    renderMeme();
    var currentInputText = gMeme.lines.length > 0 ? gMeme.lines[gMeme.selectedLineIdx].txt : '';
    console.log('currText', currentInputText)
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
    if (gMeme.lines.length === 0) {
        pos = { x: gElCanvas.width / 2, y: size + 10 }
    }
    else if (gMeme.lines.length === 1) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height - size }
    }
    else {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 + size / 2 }
    }
    var line = {
        txt: text,
        size: size,
        font: 'Impact',
        align: 'center',
        fillColor: !gFillColor ? 'white': gFillColor,
        strokeColor: !gStrokeColor ? 'black' : gStrokeColor,
        pos
    }
    gMeme.lines.push(line);
}

function getImgs() {
    return gImgs.map(img => img.url)
}

function setSelectedMemeToEditor(imgUrl) {
    var imgIdx = getImgIdx(imgUrl);
    gMeme = {
        selectedImgId: imgIdx,
        selectedLineIdx: 0,
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
        var x = selectedLine.pos.x - width / 2;
        var y = selectedLine.pos.y - height;

        gCtx.save();
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'gray';
        gCtx.beginPath()
        gCtx.strokeRect(x-10, y, width + 15, height +10)
        gCtx.restore();
    }
}