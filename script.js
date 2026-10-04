// get html elements
const catagory = document.getElementById("catagory");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const swapButton = document.getElementById("swapButton");
const result = document.getElementById("result");
const convertButton = document.getElementById("convertButton");
const clearButton = document.getElementById("clearButton");

// unit list
const units = {
    length:["Meter","Kilometer","Centimeter","Millimeter","Mile","Yard","Foot","Inch"],
    weight:["Kilogram","Gram","Milligram","Pound","Ounce"],
    temperature:["Celsius","Fahrenheit","Kelvin"],
    time:["Second","Minute","Hour","Day"],
    data:["Byte","Kilobyte","Megabyte","Gigabyte","Terabyte"]
};

// Load units
function loadUnits() {
    const selectedCatagory = catagory.value;
    fromUnit.innerHTML="";
    toUnit.innerHTML="";
    units[selectedCatagory].forEach(function (unit) {
        const fromOption = document.createElement("option");
        fromOption.value=unit;
        fromOption.textContent=unit;
        fromUnit.appendChild(fromOption);


        const toOption = document.createElement("option");
        toOption.value=unit;
        toOption.textContent=unit;
        toUnit.appendChild(toOption);
    });


    // set default different units
    if (fromUnit.options.length>1) {
        toUnit.selectedIndex=1;
    }
}


// length converter
function convertLength(value,from,to) {
    const meterValues={Meter:1, Kilometer:1000,Centimeter:0.01,Millimeter:0.001,Mile:1609.344, Yard: 0.9144, Foot:0.3048, Inch:0.0254};

    const valueInMeters = value*meterValues[from];
    return(valueInMeters/meterValues[to]);
}


// Weight Converter

function convertWeight(value,from,to) {
    const KilogramValues={
        Kilogram:1, Gram:0.001, Milligram:0.000001, Pound:0.45359, Ounce:0.02834
    };

    const valueInKilograms= value*KilogramValues[from];
    return(valueInKilograms/KilogramValues[to]);
}



// Temperature converter
function convertTemperature(value,from,to) {
    let celsius;

    // convert to celsius first
    if (from === "Celsius") {
        celsius = value;
    }else if (from === "Fahrenheit") {
        celsius=(value-32)*5/9;
    }else if (from === "Kelvin") {
        celsius= value-273.15;
    }


    // celsius to target
    if (to === "Celsius") {
        return celsius;
    }
    if (to === "Fahrenheit") {
        return(celsius*9/5)+32;
    }
    if (to === "Kelvin") {
        return(celsius+273.15);
    }
}


// Time Converter
function convertTime(value,from,to){
    const secondValues={
        Second:1, Minute:60, Hour:3600, Day:86400
    };

    const valueInSeconds=value*secondValues[from];
    return(valueInSeconds/secondValues[to]);
}

// Data Converter
function convertData(value,from,to) {
    const byteValues={
        Byte:1, Kilobyte:1024, Megabyte:1024*1024, Gigabyte:1024*1024*1024,Terabyte:1024*1024*1024*1024
    };

    const valueInBytes= value*byteValues[from];
    return(valueInBytes/byteValues[to]);
}


// main conversion function
function convert() {
    const value = Number(inputValue.value);

    // check
    if (inputValue.value==="") {
        result.textContent="Enter a value";
        return;
    }
    const from = fromUnit.value;
    const to = toUnit.value;
    const selectedCatagory = catagory.value;
    let convertedValue;

    // length
    if (selectedCatagory === "length") {
        convertedValue = convertLength(value,from,to);
    }

    // weight
    else if (selectedCatagory === "weight") {
        convertedValue = convertWeight(value,from,to);
    }

    // temperature
    else if (selectedCatagory === "temperature") {
        convertedValue = convertTemperature(value,from,to);
    }

    // Time
    else if (selectedCatagory === "time") {
        convertedValue = convertTime(value,from,to);
    }

    // data
    else if (selectedCatagory === "data") {
        convertedValue = convertData(value,from,to);
    }


    // result
    result.textContent= formatResult(convertedValue);
}

// format result
function formatResult(value) {
    if (!Number.isFinite(value)) {
        return "Invalid";
    }
    // decimal restiction
    return Number(value.toFixed(4));
}


// swap units
function swapUnits() {
    const currentFrom = fromUnit.value;
    const currentTo = toUnit.value;
    fromUnit.value = currentTo;
    toUnit.value = currentFrom;

    // convert automatically
    if (inputValue.value !== "") {
        convert();
    }
}


// clear
function clearConverter() {
    inputValue.value="";
    result.textContent="0";
}

// catagory change
catagory.addEventListener("change",function () {
    loadUnits();
    clearConverter();
});

// button events
convertButton.addEventListener("click",convert);
clearButton.addEventListener("click",clearConverter);
swapButton.addEventListener("click",swapUnits);

// enter key
inputValue.addEventListener("keydown",function (event) {
    if (event.key === "Enter") {
        convert();
    }
});

// start
loadUnits();