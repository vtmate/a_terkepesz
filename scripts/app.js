function mirror(){

    firstColumn = [card.element.shape[0][0], card.element.shape[1][0], card.element.shape[2][0]];

    newMatrix = card.element.shape;
    newMatrix[0][0] = newMatrix[0][2];
    newMatrix[1][0] = newMatrix[1][2];
    newMatrix[2][0] = newMatrix[2][2];
    newMatrix[0][2] = firstColumn[0];
    newMatrix[1][2] = firstColumn[1];
    newMatrix[2][2] = firstColumn[2];

    card.show();
}
function rotate(){
    
    firstCorner = card.element.shape[0][0];
    firstEdge = card.element.shape[0][1];
    
    newMatrix = card.element.shape;
    newMatrix[0][0] = newMatrix[2][0];
    newMatrix[2][0] = newMatrix[2][2];
    newMatrix[2][2] = newMatrix[0][2];
    newMatrix[0][2] = firstCorner;

    newMatrix[0][1] = newMatrix[1][0];
    newMatrix[1][0] = newMatrix[2][1];
    newMatrix[2][1] = newMatrix[1][2];
    newMatrix[1][2] = firstEdge;
    
    card.show();
}
function refresh(){
    location.reload();
}

const playground = document.querySelector('.playground');
const newElemHolder = document.querySelector('.newElemHolder');
const newElem = document.querySelector('.newElem');
const pointer = document.querySelector('.pointer');
const challenges = document.querySelector('.challenges');
const springPoints = document.querySelector('.springPoints');
const summerPoints = document.querySelector('.summerPoints');
const autumnPoints = document.querySelector('.autumnPoints');
const winterPoints = document.querySelector('.winterPoints');
const clockText = document.querySelector('.clockText');
const resultHolder = document.querySelector('.resultHolder');
const result = document.querySelector('.result');

const playgroundMatrix = []


//SAJÁT OSZTÁLY A CARD-NAK (NEW ELEMENT)
class Card{
    
    card = document.createElement('div');
    element;
    
    constructor(element){
        this.element = element;
        this.card.classList.add('card');
        for(var i = 0; i < 9; i++){
            const field = document.createElement('div');
            field.classList.add('field');
            this.card.append(field);
        }
        this.show(element.shape);
    }
    
    show(){
        const fields = this.card.childNodes;
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                if(this.element.shape[i][j] == 1){
                    fields[i*3 + j].classList.add(this.element.type);
                    console.log(this.element.type)
                } else {
                    fields[i*3 + j].classList.remove(this.element.type);
                }
            }
        }
    }

    clear(){
        const fields = this.card.childNodes;
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                fields[i*3 + j].classList.remove(this.element.type);
            }
        }
    }
    
    get(){
        return this.card;
    }
}

//JÁTÉK KEZDETE
var newCardIndex = Math.floor(Math.random() * elements.length);
var card = new Card(elements[newCardIndex]);
clockText.innerText = elements[newCardIndex].time;
newElem.append(card.get());
var time = -0.5;

const challengeHolders = [];
const challengeCounters = [];

//KÜLDETÉS KÁRTYÁK
function createChallenge(name, code){
    const challengeHolder = document.createElement('div');
    challengeHolder.classList.add('challengeHolder');
    challengeHolders.push(challengeHolder);
    
    const challengeImage = new Image();
    challengeImage.src = `assets/challenges/${name}.png`;
    challengeImage.classList.add('challenge');
    
    const category = document.createElement('div');
    category.classList.add('category');
    category.innerText = code;
    
    const challengeCounter = document.createElement('div');
    challengeCounter.classList.add('counter');
    challengeCounter.innerText = ' 0 pont';
    challengeCounters.push(challengeCounter);

    challengeHolder.appendChild(challengeImage);
    challengeHolder.appendChild(category);
    challengeHolder.appendChild(challengeCounter);
    challenges.appendChild(challengeHolder);
}

const challengeNames = ['forestOnEdge', 'threeForests', 'waterNearFarm', 'fullRow', 'longestForest', 'richTown', 'equalFarmAndWater', 'waterNearMountain', 'freeNearTown', 'buildingsInRow', 'oddFullRows', 'allFieldsInRow']
const codes = ['A', 'B', 'C', 'D'];

const currentChallenges = []

for(let i = 0; i < 4; i++){
    const randomNameIndex = Math.floor(Math.random() * (12-i));
    createChallenge(challengeNames[randomNameIndex],codes[i]);
    currentChallenges.push(challengeNames[randomNameIndex]);
    challengeNames.splice(randomNameIndex, 1);
}

console.log(typeof(challengeHolders[0]));
challengeHolders[2].classList.add('notActive');
challengeHolders[3].classList.add('notActive');

var currentSeason = 'spring';
const points = [0,0,0,0];

timer = 0;

function newRound() {
    //idő léptetése
    time += elements[newCardIndex].time*10.5;
    timer += elements[newCardIndex].time;
    
    console.log('timer: ' + timer);
    pointer.style.left = time + "px";
    if (timer > 7 && currentSeason == 'spring') {
        currentSeason = 'summer';
        var point0 = window[currentChallenges[0]]();
        var point1 = window[currentChallenges[1]]();
        springPoints.innerText = point0 + point1;
        challengeHolders[0].classList.add('notActive');
        challengeHolders[2].classList.remove('notActive');
        
        points[0] += point0;
        points[1] += point1;
        challengeCounters[0].innerText = points[0] + ' pont';
        challengeCounters[1].innerText = points[1] + ' pont';
    } else if (timer > 14 && currentSeason == 'summer'){
        currentSeason = 'autumn';
        var point1 = window[currentChallenges[1]]();
        var point2 = window[currentChallenges[2]]();
        summerPoints.innerText = point1 + point2;
        challengeHolders[1].classList.add('notActive');
        challengeHolders[3].classList.remove('notActive');
        
        points[1] += point1;
        points[2] += point2;
        challengeCounters[1].innerText = points[1] + ' pont';
        challengeCounters[2].innerText = points[2] + ' pont';
    } else if (timer > 21 && currentSeason == 'autumn'){
        currentSeason = 'winter';
        var point2 = window[currentChallenges[2]]();
        var point3 = window[currentChallenges[3]]();
        autumnPoints.innerText = point2 + point3;
        challengeHolders[2].classList.add('notActive');
        challengeHolders[0].classList.remove('notActive');
        
        points[2] += point2;
        points[3] += point3;
        challengeCounters[2].innerText = points[2] + ' pont';
        challengeCounters[3].innerText = points[3] + ' pont';
    } else if(timer > 28 && currentSeason == 'winter'){
        var point3 = window[currentChallenges[3]]();
        var point0 = window[currentChallenges[0]]();
        winterPoints.innerText = point3 + point0;
        
        points[3] += point3;
        points[0] += point0;
        challengeCounters[3].innerText = points[3] + ' pont';
        challengeCounters[0].innerText = points[0] + ' pont';
        
        pointer.style.left = 18.3 + "rem";
        playground.classList.add('end');

        var resultNum = 0;
        points.forEach(point => {
            resultNum += point;
        });
        result.innerText = resultNum;
        resultHolder.classList.remove('invisible');
    }
    
    card.clear(); //card letisztítása, a korábban felhasznált elem törlés
    // elements.splice(newCardIndex, 1); //legutóbb felhasznált elem kitörlése

    //új elem kiválasztása
    newCardIndex = Math.floor(Math.random() * elements.length);
    card.element.shape = elements[newCardIndex].shape;
    card.element.type = elements[newCardIndex].type;
    clockText.innerText = elements[newCardIndex].time;
    card.show();
}

function indexesFromMatrix(matrix){
    indexes = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(matrix[i][j] == 1){
                indexes.push([i,j])
            }
        }
    }
    return indexes;
}

function mouseEnter(field){
    var actMatrix = card.element.shape;

    indexes = indexesFromMatrix(actMatrix)
    var x,y;
    goodPlace = true;
    placeable = true;
    //ellenőrzés, hogy minden field a pályán belül van-e
    indexes.forEach(e => {
        x = parseInt(field.getAttribute('i')) + e[0] - 1;
        y = parseInt(field.getAttribute('j')) + e[1] - 1;
        goodPlace = goodPlace && 0 <= x && x < 11 && 0 <= y && y < 11;
    });
    if(goodPlace){
        indexes.forEach(e => {
            x = parseInt(field.getAttribute('i')) + e[0] - 1;
            y = parseInt(field.getAttribute('j')) + e[1] - 1;
            actField = playgroundMatrix[x][y];
            actField.style.backgroundColor = 'rgb(50, 180, 30, 0.5)';
            if(actField.getAttribute('free') == 1){
                actField.querySelector('.cover').style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                placeable = false;
            }
        });
    }
}

// PLAYGROUND FELTÖLTÉSE FIELD-EKKEL, FIELD-EK ELLÁTÁSA EVENTLISTENER-EKKEL
for(var i = 0; i < 11; i++){
    row = []
    for (let j = 0; j < 11; j++) {
        const field = document.createElement('div');
        field.classList.add('field');
        row.push(field);
        playground.append(field);

        field.setAttribute('i', i);
        field.setAttribute('j', j);
        field.setAttribute('free', 0);

        const cover = document.createElement('div');
        cover.classList.add('cover');
        field.appendChild(cover);
        
        var goodPlace;
        var placeable;
        
        field.addEventListener('mouseenter', () => {
            mouseEnter(field);
        });
        
        field.addEventListener('mouseleave', () => {
            if(goodPlace){
                indexes.forEach(e => {
                    x = parseInt(field.getAttribute('i')) + e[0] - 1;
                    y = parseInt(field.getAttribute('j')) + e[1] - 1;
                    actField = playgroundMatrix[x][y];
                    actField.style.backgroundColor = '#EFE2B3';
                    if(actField.getAttribute('free') == 1){
                        actField.querySelector('.cover').style.backgroundColor = 'transparent';
                    }
                });
            }
        });

        field.addEventListener('click', () => {
            if(goodPlace && placeable){
                indexes.forEach(e => {
                    x = parseInt(field.getAttribute('i')) + e[0] - 1;
                    y = parseInt(field.getAttribute('j')) + e[1] - 1;
                    actField = playgroundMatrix[x][y];
                    actField.classList.add(`${card.element.type}`);
                    actField.setAttribute('free', 1);
                });
                newRound();
            }
            mouseEnter(field);
        })
    }
    playgroundMatrix.push(row);
}

//HEGYEK HOZZÁADÁSA
mountains = [[2,2], [4,9], [6,4], [9,10], [10,6]]
mountains.forEach(mountain => {
    playgroundMatrix[mountain[0] - 1][mountain[1] - 1].classList.add('mountains')
    playgroundMatrix[mountain[0] - 1][mountain[1] - 1].setAttribute('free', 1);
});

//ROTATE ÉS MIRROR FUNCTION-OK HÍVÁSA R, ILLETVE M BILLENTYŰNYOMÁSOKRA
let isRKeyPressed = false;
document.addEventListener("keydown", function (event) {
    if (event.code === "KeyR" && !isRKeyPressed) {
        isRKeyPressed = true;
        rotate();
    } else if (event.code === "KeyM" && !isRKeyPressed) {
        isRKeyPressed = true;
        mirror();
    }
});  
document.addEventListener("keyup", function (event) {
  if (event.code === "KeyR" || event.code === "KeyM") {
    isRKeyPressed = false;
  }
});