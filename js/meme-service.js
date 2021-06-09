'use strict';

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
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

gElCanvas = document.querySelector('#meme-canvas');
gCtx = gElCanvas.getContext('2d');
console.log(gMeme)

function renderMeme() {
    console.log(gMeme.selectedLineIdx);
    var img = new Image()
    img.src = gImgs[gMeme.selectedImgId - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines)
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
    })
}

function createAndUpdateLine(value) {
    if (gMeme.lines[gMeme.selectedLineIdx] === undefined) createLine(value);
    gMeme.lines[gMeme.selectedLineIdx].txt = value;
    renderMeme();
}

function increaseLineIdx() {
    gMeme.selectedLineIdx = gMeme.lines.length;
    document.querySelector('[name="text"').focus();
}

function updateFontSize(diff) {
    console.log(gMeme.lines[gMeme.selectedLineIdx].size, diff)
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
    console.log(gMeme.lines[gMeme.selectedLineIdx].size, diff)
    renderMeme();
}

function updateFontAlignment(value) {
    console.log(gMeme.lines[gMeme.selectedLineIdx].align, value)
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

function updatePositionY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff;
    renderMeme();
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderMeme();
}

function updateStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = value;
    renderMeme();
}

function updateFillColor(value) {
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
        fillColor: 'white',
        strokeColor: 'black',
        pos
    }
    gMeme.lines.push(line);
}

function getImgs() {
    return gImgs.map(img => img.url)
}

function setSelectedMemeToEditor(imgUrl) {
    var imgIdx = getImgIdx(imgUrl);
    gMeme.selectedImgId = imgIdx;
    renderMeme();
}

function getImgIdx(imgUrl) {
    console.log('imgurl',imgUrl)
    var img = gImgs.find(img => { 
        return img.url=== imgUrl
    })
    return img.id;
}