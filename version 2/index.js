let CurrSelect = undefined;
let LocalText = undefined;
let textArray = undefined;
let tableArray = undefined;

class aBefund {
    constructor(spline, line, name, niv){
        this.spline = spline;
        this.line = line;
        this.name = name;
        this.niv = niv;
    }
}
let BefundArray = undefined;

onload = function() {
    
}

// =============================================================================================
function displayText(text) {
    showOutput(text);
}

function clearInput() {
    let tbIn = document.getElementById("ImputBox");
    tbIn.value = "";
}
// ==============================================================================================
function getTableArray(text) {
    LocalText = text;
    textArray = LocalText.split(/\n/);
    tableArray = [];
    for(let entry of textArray) {
        tableArray.push(entry.split(/\t/));
    }
    return tableArray;
}

function fillBefundArray(BefArray, array) {
    let currentbefund = undefined;
    let posInBefArray = undefined;

    for(let i = 0; i < array.length; i++) {
        if(array[i][4] === undefined) continue;
        if(currentbefund === undefined) { // find the befund we are currently working with
            if(array[i][4] === "") {
                continue;
            }
            currentbefund = array[i][4]; // found first befund
            //console.log(currentbefund + " in pos " + i);
            //check if befund name is in befund list
            posInBefArray = undefined;
            for(let y = 0; y < BefArray.length; y++){
                if(currentbefund === BefArray[y].name){
                    posInBefArray = y;
                    break;
                }
            }
            if(posInBefArray === undefined) {
                console.log("An error has been Encountered, the Befund " + currentbefund + " has not been found inside the Befund Array! - 001");
                alert("An error has been Encountered, the Befund " + currentbefund + " has not been found inside the Befund Array! - 001");
            }
        }
        // we have a curreent befund... 
        if(array[i][4] != "") {
            if(array[i][4] != currentbefund) {
                // new befund has been encountered...
                currentbefund = array[i][4];
                //console.log(currentbefund, i);
                //check if befund name is in befund list
                posInBefArray = undefined;
                for(let y = 0; y < BefArray.length; y++){
                    if(currentbefund === BefArray[y].name){
                        posInBefArray = y;
                        break;
                    }
                }
                if(posInBefArray === undefined) {
                console.log("An error has been Encountered, the Befund " + currentbefund + " has not been found inside the Befund Array! - 002");
                alert("An error has been Encountered, the Befund " + currentbefund + " has not been found inside the Befund Array! - 002");
                }
            }
            //same befund, stay there
        }
        if(posInBefArray === undefined){
            console.log("An Error has been Encountered, the Befund " + currentbefund + " could not been verrified inside Befund Array!")
            alert("An Error has been Encountered, the Befund " + currentbefund + " could not been verrified inside Befund Array!")
            continue;
        }
        //befund has been confirmed, now add item to the befund
        //_spline
        if(array[i][3] === ""){
            BefArray[posInBefArray].spline.push([array[i][0],array[i][1],array[i][2]]);
            continue;
        }
        if(array[i][3].toLowerCase().includes("Befundgrenze")) {
            BefArray[posInBefArray].spline.push([array[i][0],array[i][1],array[i][2]]);
            continue;
        }
        //_line
        if(array[i][3].toLowerCase().includes("profil")) {
            BefArray[posInBefArray].line.push([array[i][0],array[i][1],array[i][2]]);
            continue;
        }
        //niv
        if(array[i][3].toLowerCase().includes("niv")){
            BefArray[posInBefArray].niv.push([array[i][0],array[i][1],array[i][2]]);
            continue;
        }
    }

    return BefArray;
}


function getBefundArray(array) {
    BefundArray = [];
    for(let i = 0; i < array.length; i++) {
        if(array[i][3] === "Befundgrenze"){
            //console.log("Befund found " + i)
            let bef = new aBefund([],[],array[i][4],[]);
            //bef.spline.push([array[i][0],array[i][1],array[i][2]])
            BefundArray.push(bef);
        }    
    }
    BefundArray = fillBefundArray(BefundArray, array);



    return BefundArray;
}

function generateOutPut(text) {
    let txt = "";
    let array = getBefundArray(getTableArray(text));
    //console.log(array);
    for(let i = 0; i<array.length; i++) {
        let txtsnip = "_SPLINE\n";
        for(let entry of array[i].spline){
            txtsnip = txtsnip + entry[0] + "," + entry[1] + "," + entry[2] + "\n";
        }
        txtsnip = txtsnip + "s\n"
        txtsnip = txtsnip + "_LINE\n"
        for(let entry of array[i].line){
            txtsnip = txtsnip + entry[0] + "," + entry[1] + "," + entry[2] + "\n";
        }
        txtsnip = txtsnip + "\n"
        for(let entry of array[i].niv){
            txtsnip = txtsnip + entry[0] + "," + entry[1] + "," + entry[2] + "\n";
        }
        txt = txt + txtsnip;
    }
    //console.log(txt.split(/\r\n|\r|\n/).length - 1);
    return txt;
}

function createDIV(n) {
    let ret = document.createElement("DIV");
    ret.appendChild(document.createTextNode(n));
    return ret;
}

function showOutput(text) {
    let outPutBox = document.getElementById("OutPutBox");
    let indexBox = document.getElementById("IndexBox");
    let array = getBefundArray(getTableArray(text));
    outPutBox.innerHTML = "";
    indexBox.innerHTML = "";

    for(let i = 0; i<array.length; i++ ){
        outPutBox.appendChild(createDIV("_SPLINE"));
        indexBox.appendChild(createDIV(array[i].name));
        for(let entry of array[i].spline) {
            outPutBox.appendChild(createDIV(entry[0] + "," + entry[1] + "," + entry[2]));
            indexBox.appendChild(document.createElement("BR"))
        }

        outPutBox.appendChild(createDIV("s"));
        indexBox.appendChild(document.createElement("BR"));
        outPutBox.appendChild(createDIV("_LINE"));
        indexBox.appendChild(document.createElement("BR"));

        for(let y = 0; y < array[i].line.length; y++){         // entry of array[i].line
            outPutBox.appendChild(createDIV(array[i].line[y][0] + "," + array[i].line[y][1] + "," + array[i].line[y][2]));
            indexBox.appendChild(createDIV("Profil " + String.fromCharCode(y+65)));
        }
        outPutBox.appendChild(document.createElement("BR"));
        indexBox.appendChild(document.createElement("BR"));
        for(let entry of array[i].niv){
            outPutBox.appendChild(createDIV(entry[0] + "," + entry[1] + "," + entry[2]));
            indexBox.appendChild(createDIV("NIV"));
        }
    }
}