let CurrSelect = undefined;
let LocalText = undefined;
let textArray = undefined;
let OutPutText = undefined;
const TOBEREPLACED = /[\t]/g

onload = function() {
    let select = document.createElement("SELECT");
    let opt1 = document.createElement("option");
    opt1.appendChild(document.createTextNode("BEFUND"));
    opt1.value = "_SPLINE";
    select.appendChild(opt1);
    let opt2 = document.createElement("option");
    opt2.appendChild(document.createTextNode("PROFILLINIE"));
    opt2.value = "_LINE";
    select.appendChild(opt2);
    document.getElementById("platzfuerselect").appendChild(select);

    CurrSelect = opt1.value;

    select.onchange = function() {
        CurrSelect = select.value;
    }
}

function ConvertString(text) {
    if(text == undefined) {
        return;
    }
    let ret = [];
    LocalText = text;
    textArray = LocalText.split(/(?:\t| )+/);
    for(let i = 0; i < textArray.length; i = i + 3){
        let oneLine = textArray[i] + "," + textArray[i+1] + "," + textArray[i+2]
        ret.push(oneLine);
    }
    return ret;
}

function generateOutPut(text) {
    if(text == undefined) {
        return;
    }
    let myArray = ConvertString(text);
    let ret = "";
    select = document.getElementById("platzfuerselect");

    ret = ret + CurrSelect + "\n"

    for(entry of myArray) {
        ret = ret + entry + "\n";
    }
    return ret;
}

function displayText(text) {
    let span = document.getElementById("OutPutBox");
    let txtb = document.createElement("textarea");


    span.innerHTML = "";

    txtb.value = generateOutPut(text);
    span.appendChild(txtb);
}