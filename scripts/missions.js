//A különböző küldetéseket ellenőrző függvények

//AZ ERDŐ SZÉLE
function forestOnEdge(){
    var counter = 0;
    for(let i = 0; i < 11; i++){ //első és utolsó sor
        if(playgroundMatrix[0][i].classList.contains('forest')){
            counter++;    
        }
        if(playgroundMatrix[10][i].classList.contains('forest')){
            counter++;    
        }
    }
    for(let i = 1; i < 10; i++){ //első és utolsó oszlop
        if(playgroundMatrix[i][0].classList.contains('forest')){
            counter++;    
        }
        if(playgroundMatrix[i][10].classList.contains('forest')){
            counter++;    
        }
    }
    console.log(counter);
    return(counter);
}
//ÁLMOS VÖLGY
function threeForests(){
    counter = 0;
    for(let i = 0; i < 11; i++){
        var forest = 0;
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].classList.contains('forest')){
                forest++;
            }
        }
        if(forest == 3){
            counter += 4;
        }
    }
    console.log(counter);
    return(counter);
}
//KRUMPLIÖNTÖZÉS
function waterNearFarm(){
    var counter = 0; //feltételezem, hogy egy vízterületért csak egyszer kaphatok pontot
    for(let i = 0; i < 11; i++){
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].classList.contains('water')){
                if(i > 0 && playgroundMatrix[i-1][j].classList.contains('farm')) {counter += 2;}
                else if(j > 0 && playgroundMatrix[i][j-1].classList.contains('farm')) {counter += 2;}
                else if(j < 10 && playgroundMatrix[i][j+1].classList.contains('farm')) {counter += 2;}
                else if(i < 10 && playgroundMatrix[i+1][j].classList.contains('farm')) {counter += 2;}
            }
        }
    }
    console.log(counter);
    return(counter);
}
//HATÁRVIDÉK
function fullRow(){
    var counter = 0;
    for(let i = 0; i < 11; i++){
        var row = 0;
        var column = 0;
        for(let j = 0; j < 11; j++){
            row += parseInt(playgroundMatrix[i][j].getAttribute('free'));
            column += parseInt(playgroundMatrix[j][i].getAttribute('free'));
        }
        if(row == 11){counter += 6;}
        if(column == 11){counter += 6;}
    }
    console.log(counter);
    return(counter);
}
//FASOR
function longestForest(){
    counter = 0;
    for(let i = 0; i < 11; i++){
        var currentLongestRow = 0;
        var currentLongestColumn = 0;
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[j][i].classList.contains('forest')){
                currentLongestColumn++;
                if(currentLongestColumn > counter){
                    counter++;
                }
            }
            else{currentLongestColumn = 0;}
        }
    }
    console.log(counter*2);
    return(counter*2);
}
//GAZDAG VÁROS
function richTown(){
    counter = 0;
    for(let i = 0; i < 11; i++){
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].classList.contains('town')){
                const classes = []
                if(i > 0) {addToClass(Array.from(playgroundMatrix[i-1][j].classList), classes);}
                if(j > 0) {addToClass(Array.from(playgroundMatrix[i][j-1].classList), classes);}
                if(j < 10) {addToClass(Array.from(playgroundMatrix[i][j+1].classList), classes);}
                if(i < 10) {addToClass(Array.from(playgroundMatrix[i+1][j].classList), classes);}
                if(classes.length >= 3) {counter += 3}
            }
        }
    }
    console.log(counter);
    return(counter);
}
function addToClass(list, classes){
    console.log("www: " + list);
    if(list.length == 2){
        if(!classes.includes(list[1])){
            classes.push(list[1]);
        }
    }
}
//ÖNTÖZŐCSATORNA
function equalFarmAndWater(){
    counter = 0;
    for(let i = 0; i < 11; i++){
        var farm = 0;
        var water = 0;
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[j][i].classList.contains('farm')){
                farm++;
            }
            else if(playgroundMatrix[j][i].classList.contains('water')){
                water++;
            }
        }
        if(farm == water && water != 0){
            counter += 4;
        }
    }
    console.log(counter);
    return(counter);
}
//MÁGUSOK VÖLGYE
function waterNearMountain(){
    var counter = 0;
    for(let i = 0; i < 11; i++){
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].classList.contains('water')){
                if(i > 0 && playgroundMatrix[i-1][j].classList.contains('mountains')) {counter += 3;}
                else if(j > 0 && playgroundMatrix[i][j-1].classList.contains('mountains')) {counter += 3;}
                else if(j < 10 && playgroundMatrix[i][j+1].classList.contains('mountains')) {counter += 3;}
                else if(i < 10 && playgroundMatrix[i+1][j].classList.contains('mountains')) {counter += 3;}
            }
        }
    }
    console.log(counter);
    return(counter);
}
//ÜRES TELKEK
function freeNearTown(){
    var counter = 0;
    for(let i = 0; i < 11; i++){
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].getAttribute('free') == 0){
                if(i > 0 && playgroundMatrix[i-1][j].classList.contains('town')) {counter += 2;}
                else if(j > 0 && playgroundMatrix[i][j-1].classList.contains('town')) {counter += 2;}
                else if(j < 10 && playgroundMatrix[i][j+1].classList.contains('town')) {counter += 2;}
                else if(i < 10 && playgroundMatrix[i+1][j].classList.contains('town')) {counter += 2;}
            }
        }
    }
    console.log(counter);
    return(counter);
}
//SORHÁZ
function buildingsInRow(){
    counter = 0;
    var countOfMax = 0;
    for(let i = 0; i < 11; i++){
        var currentLongestRow = 0;
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[i][j].classList.contains('town')){
                currentLongestRow++;
                if(currentLongestRow == counter){
                    countOfMax++;
                }
                if(currentLongestRow > counter){
                    counter++;
                    countOfMax = 1;
                }
            }
            else{currentLongestRow = 0;}
        }
    }
    console.log();
    return(counter*2*countOfMax);
}
//PÁRATLAN SILÓK
function oddFullRows(){
    counter = 0;
    for(let i = 0; i < 11; i += 2){
        var full = true;
        for(let j = 0; j < 11; j++){
            if(playgroundMatrix[j][i].getAttribute('free') == 0){
                full = false;
                break;
            }
        }
        if(full) {counter += 10;}
    }
    console.log(counter);
    return(counter);
}
//GAZDAG VIDÉK
function allFieldsInRow(){
    counter = 0;
    for(let i = 0; i < 11; i++){
        const classes = []
        for(let j = 0; j < 11; j++){
            list = Array.from(playgroundMatrix[i][j].classList);
            if(list.length == 2){
                if(!classes.includes(list[1])){
                    classes.push(list[1]);
                }
            }
        }
        console.log(classes);
        if(classes.length == 5) {counter += 4;};
    }
    console.log(counter);
    return(counter);
}